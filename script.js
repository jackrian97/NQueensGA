function initializePopulation(size, n){
  let population = [];// group of possible solutions
  for(let i=0; i<size; i++){
    //generate to array of random numbers between 0 to n with length n
    let individual = Array.from({length: n}, () => Math.floor(Math.random() * n));
    population.push(individual);
  }
  return population; 
}
