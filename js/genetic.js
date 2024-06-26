function initializePopulation(size, n){
  let population = [];// group of possible solutions
  for(let i = 0; i < size; i++){
    //generate to array of random numbers between 0 to n with length n
    let individual = Array.from({length: n}, () => Math.floor(Math.random() * n));
    population.push(individual);
  }
  return population; 
}

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

function replacement(population, newPopulation, fitness, elitismCount) {
  const combined = population.concat(newPopulation);//combines the old and new population
  combined.sort((a, b) => fitness(a) - fitness(b));//sorts the combined population based on their fitness
  //returns the best individuals from the combined population
  return combined.slice(0, population.length - elitismCount).concat(combined.slice(-elitismCount));
}


export function geneticAlgorithm(populationSize, nQueens, generations, elitismCount, mutationRate) {
  //initialize the population
  let startTime = performance.now();//start time of the algorithm
  let population = initializePopulation(populationSize, nQueens);
  for (let generation = 0; generation < generations; generation++) {
    //sort the population based on their fitness
    population = population.sort((a, b) => calculateFitness(a) - calculateFitness(b));
    
    // Check if the best individual is a solution
    const bestIndividual = population[0];
    const bestFitness = calculateFitness(bestIndividual);
    // If the best individual is a solution, return it
    if (bestFitness === 0) {
      return { solution: bestIndividual, fitness: bestFitness, generation, time: performance.now() - startTime};
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
  let endTime = performance.now();//end time of the algorithm
  return { solution: bestIndividual, fitness: bestFitness, generation: generations, time: endTime - startTime};
}
