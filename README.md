# NQueensGA
In this project we implement a solution to the N queens problem in a table of variables between 4-N

# table of contents
- [initial population](#initial-population)
- [fitness function](#fitness-function)
- [selection](#selection)
- [crossover and mutation](#crossover-and-mutation)
- [replacement](#replacement)
- [genetic algorithm](#genetic-algorithm)

# initial population
The initial population is generated randomly, the size of the population is defined by the user, the population is a list of lists, where each list represents a possible solution to the problem, the size of the list is the number of queens in the problem, and the value of each element in the list is the column where the queen is located, for example, the list [1, 3, 0, 2] represents a solution to the problem with 4 queens, where the queen 0 is in the column 1, the queen 1 is in the column 3, the queen 2 is in the column 0 and the queen 3 is in the column 2.

```javascript
function initializePopulation(size, n){
  let population = [];// group of possible solutions
  for(let i = 0; i < size; i++){
    //generate to array of random numbers between 0 to n with length n
    let individual = Array.from({length: n}, () => Math.floor(Math.random() * n));
    population.push(individual);
  }
  return population; 
}
```

# fitness function
The fitness function is the function that evaluates how good is a solution to the problem, in this case, the fitness function is the number of pairs of queens that are attacking (collision) each other, the function validate attack in rows and diagonals. if not conflict return 0, else return n collisions.

```javascript
function calculateFitness(individual){
  const n = individual.length;
  let collisions = 0;// number of queens that are attacking each other
  for(let i = 0; i < n; i++){
    for(let j = i + 1; j < n; j++){
      //check if two queens are attacking in the same row or diagonally
      if(individual[i] == individual[j] || Math.abs(individual[i] - individual[j]) == Math.abs(i - j)){
        collisions++;
      }
    }
  }
  return collisions;
}
```

# selection
The selection process is the process of selecting the best individuals in the population to be parents of the next generation, in this project we use the rank selection method, the rank selection method is a selection method that selects the best individuals in the population based on their fitness, the best individuals have a higher probability of being selected as parents, in addition, selected individuals are eliminated from the ranking so that they cannot participate in the selection again and in this way the selection is more diverse and robust.

```javascript
function rankSelection(population, fitness) {
  //assignment of rank to each individual according to their fitness
  const ranked = population.map((individual, index) => ({ ind: individual, rank: index + 1 }))
                           .sort((a, b) => fitness(a.ind) - fitness(b.ind));
  //calculates the total sum of ranks of individuals ranked
  const totalRank = ranked.reduce((acc, obj) => acc + obj.rank, 0);
  //randomly selects an individual based on their rank
  const pick = Math.random() * totalRank;
  //selects the individual whose cumulative rank is greater than or equal to the random number
  let cumulativeRank = 0;
  for (const obj of ranked) {
    cumulativeRank += obj.rank;
    if (cumulativeRank >= pick) {
      return obj.ind;//returns the selected individual
    }
  }
  //Defensive programming: return the last individual if the loop doesn't return any
  return ranked[ranked.length - 1].ind;
}

function selection(population, fitness) {
  const selected = [];// Selected individuals
  const populationCopy = [...population];// Make a copy to avoid modifying the original population
  while (selected.length < population.length / 2) {// Select half of the population
    const selectedIndividual = rankSelection(populationCopy, fitness);
    selected.push(selectedIndividual);
    // Remove the selected individual from the population
    const index = populationCopy.findIndex(ind => ind === selectedIndividual);
    if (index !== -1) {
      populationCopy.splice(index, 1);
    }
  }
  return selected;
}
```

# crossover and mutation
The crossover process is the process of generating new individuals from the selected individuals, in this project we use the one-point crossover method, the one-point crossover method is a crossover method that selects a random point in the individual and generates two new individuals by combining the first part of one individual with the second part of the other individual. before the crossover process, we apply the mutation process, the mutation process is the process of changing the value of a random gene in the individual, in this project we use the random mutation method, the random mutation method is a mutation method that selects a random gene in the individual and changes its value to a random value.

```javascript
function crossover(parent1, parent2) {
  const n = parent1.length;
  const crossoverPoint = Math.floor(Math.random() * n);
  //creates two children by combining the genes of the parents
  const child1 = parent1.slice(0, crossoverPoint).concat(parent2.slice(crossoverPoint));
  const child2 = parent2.slice(0, crossoverPoint).concat(parent1.slice(crossoverPoint));
  
  return [child1, child2];
}

function mutation (individual, mutationRate) {
  const n = individual.length;
  //mutates the individual by changing the value of a gene with a probability of mutationRate
  return individual.map((gen, index) => Math.random() < mutationRate ? Math.floor(Math.random() * n) : gen);
}

function reproduce(selected, populationSize, mutationRate) {
  const newPopulation = [];
  
  while (newPopulation.length < populationSize) {
    const parent1 = selected[Math.floor(Math.random() * selected.length)];
    const parent2 = selected[Math.floor(Math.random() * selected.length)];
    //crossover of the parents to produce children
    const [child1, child2] = crossover(parent1, parent2);
    //mutation of the children
    mutation(child1, mutationRate);
    mutation(child2, mutationRate);

    newPopulation.push(child1);
    if (newPopulation.length < populationSize) {
      newPopulation.push(child2);
    }
  }
  
  return newPopulation;
}
```

# replacement
The replacement process is the process of replacing the old population with the new population, in this project we use the elitism method, the elitism method is a replacement method that selects the best individuals in the old population and the best individuals in the new population to form the new population, in this way the best individuals are preserved and the new population is more robust.

```javascript
function replacement(population, newPopulation, fitness, elitismCount) {
  const combined = population.concat(newPopulation);//combines the old and new population
  combined.sort((a, b) => fitness(a) - fitness(b));//sorts the combined population based on their fitness
  //returns the best individuals from the combined population
  return combined.slice(0, population.length - elitismCount).concat(combined.slice(-elitismCount));
}
```

# genetic algorithm
The genetic algorithm is the algorithm that combines the selection, crossover, mutation, and replacement processes to solve the problem, in this project we use the genetic algorithm to solve the N queens problem, the genetic algorithm receives the number of queens in the problem, the size of the population, the mutation rate, and the number of generations, the genetic algorithm generates an initial population, evaluates the fitness of the population, selects the best individuals, generates new individuals, replaces the old population with the new population, and repeats the process for the number of generations, finally, the genetic algorithm returns the best individual found.

```javascript
function geneticAlgorithm(populationSize, nQueens, generations, elitismCount, mutationRate) {
  //initialize the population
  let population = initializePopulation(populationSize, nQueens);
  for (let generation = 0; generation < generations; generation++) {
    //sort the population based on their fitness
    population = population.sort((a, b) => calculateFitness(a) - calculateFitness(b));
    
    // Check if the best individual is a solution
    const bestIndividual = population[0];
    const bestFitness = calculateFitness(bestIndividual);
    // If the best individual is a solution, return it
    if (bestFitness === 0) {
      return { solution: bestIndividual, fitness: bestFitness, generation };
    }
    // Select the best individuals from the population
    const selected = selection(population, calculateFitness);

    // Perform crossover and mutation
    const newPopulation = [];
    // Reproduce the selected individuals to create a new population
    while (newPopulation.length < populationSize - elitismCount) {
      const parent1 = selected[Math.floor(Math.random() * selected.length)];
      const parent2 = selected[Math.floor(Math.random() * selected.length)];
      const [child1, child2] = crossover(parent1, parent2);
      newPopulation.push(mutation(child1, mutationRate));
      // Add the second child only if the population size allows it
      if (newPopulation.length < populationSize - elitismCount) {
        newPopulation.push(mutation(child2, mutationRate));
      }
    }

    // Add elite individuals to the new population
    newPopulation.push(...population.slice(0, elitismCount));

    population = newPopulation;
  }

  // If no solution was found within the given generations, return the best found solution
  population = population.sort((a, b) => calculateFitness(a) - calculateFitness(b));
  const bestIndividual = population[0];
  const bestFitness = calculateFitness(bestIndividual);
  return { solution: bestIndividual, fitness: bestFitness, generation: generations };
}
```

