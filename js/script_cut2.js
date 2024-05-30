import {generateRandomArray, insertionSort} from './sorting_algorithm.js';

function solveAlgorithm() {
    const vectorSize = parseInt(document.getElementById('vectorSize').value);
    let result = generateRandomArray(vectorSize);
    console.log('Initial array:', result);

}



window.solveAlgorithm = solveAlgorithm;