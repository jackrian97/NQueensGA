# NQueensGA
In this project we implement a solution to the N queens problem in a table of variables between 4-N

# table of contents
- [initial population](#initial-population)

# initial population
The initial population is generated randomly, the size of the population is defined by the user, the population is a list of lists, where each list represents a possible solution to the problem, the size of the list is the number of queens in the problem, and the value of each element in the list is the column where the queen is located, for example, the list [1, 3, 0, 2] represents a solution to the problem with 4 queens, where the queen 0 is in the column 1, the queen 1 is in the column 3, the queen 2 is in the column 0 and the queen 3 is in the column 2.

```javascript
function initializePopulation(size, n){
  let population = [];// group of possible solutions
  for(let i=0; i<size; i++){
    //generate to array of random numbers between 0 to n with length n
    let individual = Array.from({length: n}, () => Math.floor(Math.random() * n));
    population.push(individual);
  }
  return population; 
}
```
