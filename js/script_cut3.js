import {geneticAlgorithm} from './genetic.js';

function createBoard(nQueens) {
    const board = document.createElement('div');
    board.id = 'board';
    board.style.gridTemplateColumns = `repeat(${nQueens}, 50px)`;
    board.style.gridTemplateRows = `repeat(${nQueens}, 50px)`;
    return board;
}

function displaySolution(solution, nQueens) {
    const board = createBoard(nQueens);
    // Display queens on board where queenRow is the row of the queen in the column and col is the column
    solution.forEach((queenRow, col) => {
        for (let row = 0; row < nQueens; row++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            // alternate between white and black cells
            cell.classList.add((col + row) % 2 === 0 ? 'white' : 'black');
            if (row === queenRow) {
                cell.textContent = '♛';
            }
            board.appendChild(cell);
        }
    });
    const solutionDiv = document.getElementById('solution');
    solutionDiv.innerHTML = ''; // Clear previous solution
    solutionDiv.appendChild(board);
}

function displayDetails(result) {
    const detailsDiv = document.getElementById('details');
    detailsDiv.innerHTML = `
        <p>Fitness de la solución: ${result.fitness}</p>
        <p>Generación: ${result.generation}</p>
        <p>Tiempo de ejecución: ${result.time.toFixed(2)} ms</p>
    `;
}

function solveNQueens() {
    const populationSize = parseInt(document.getElementById('populationSize').value);
    const nQueens = parseInt(document.getElementById('nQueens').value);
    const generations = parseInt(document.getElementById('generations').value);
    const elitismCount = parseInt(document.getElementById('elitismCount').value);
    const mutationRate = parseFloat(document.getElementById('mutationRate').value);

    const result = geneticAlgorithm(populationSize, nQueens, generations, elitismCount, mutationRate);
    
    displaySolution(result.solution, nQueens);
    displayDetails(result);
}

window.solveNQueens = solveNQueens;