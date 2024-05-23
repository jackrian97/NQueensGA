function initializePopulation(size, n){
  let population = [];// group of possible solutions
  for(let i=0; i<size; i++){
    //generate to array of random numbers between 0 to n with length n
    let individual = Array.from({length: n}, () => Math.floor(Math.random() * n));
    population.push(individual);
  }
  return population; 
}

function calculateFitness(individual){
  const n = individual.length;
  let collisions = 0;// number of queens that are attacking each other
  for(let i=0; i<n; i++){
    for(let j=i+1; j<n; j++){
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
}

function selection(population, fitness) {
  const selected = [];// individuals selected for the next generation
  let tempPopulation = [...population]; // copy of the population
  for (let i = 0; i < population.length / 2; i++) {
    const selectedIndividual = rankSelection(tempPopulation, fitness);
    selected.push(selectedIndividual);
    // remove the selected individual from the temporary population
    tempPopulation = tempPopulation.filter(ind => ind !== selectedIndividual);
  }
  return selected;// returns the selected individuals for the next generation
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

// Parameters
const populationSize = 10;
const nQueens = 4;
const generations = 100;
const elitismCount = 2;
const mutationRate = 0.1;
//algorithm generation works
let population = initializePopulation(populationSize, nQueens);
console.log("Población inicial:", population.map(ind => ({ individual: ind, fitness: calculateFitness(ind) })));
for (let generation = 0; generation < generations; generation++) {
  const selected = selection(population, calculateFitness);
  const newPopulation = reproduce(selected, populationSize, mutationRate);
  population = replacement(population, newPopulation, calculateFitness, elitismCount);
}

console.log("Población final:", population.map(ind => ({ individual: ind, fitness: calculateFitness(ind) })));