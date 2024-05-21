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
