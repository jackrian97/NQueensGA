function createBoard(nQueens) {
    const board = document.createElement('div');
    board.id = 'board';
    board.style.gridTemplateColumns = `repeat(${nQueens}, 50px)`;
    board.style.gridTemplateRows = `repeat(${nQueens}, 50px)`;
    return board;
}

function displaySolution(solution, nQueens) {
    const board = createBoard(nQueens);
    solution.forEach((queenRow, col) => {
        for (let row = 0; row < nQueens; row++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
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
        <p>Tiempo de ejecución: ${result.time.toFixed(2)} ms</p>
    `;
}

function isSafe(board, row, col, nQueens) {
    // Check the left side of this row
    for (let i = 0; i < col; i++) {
        if (board[row][i]) {
            return false;
        }
    }

    // Check upper diagonal on left side
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j]) {
            return false;
        }
    }

    // Check lower diagonal on left side
    for (let i = row, j = col; j >= 0 && i < nQueens; i++, j--) {
        if (board[i][j]) {
            return false;
        }
    }

    return true;
}

function solveNQueensUtil(board, col, nQueens, result) {
    // If all queens are placed then return true
    if (col >= nQueens) {
        return true;
    }

    // Consider this column and try placing this queen in all rows one by one
    for (let i = 0; i < nQueens; i++) {
        // Check if the queen can be placed on board[i][col]
        if (isSafe(board, i, col, nQueens)) {
            // Place this queen in board[i][col]
            board[i][col] = 1;

            // Recur to place the rest of the queens
            if (solveNQueensUtil(board, col + 1, nQueens, result)) {
                return true;
            }

            // If placing queen in board[i][col] doesn't lead to a solution, then remove the queen from board[i][col]
            board[i][col] = 0;
        }
    }

    // If the queen can't be placed in any row in this column, then return false
    return false;
}

function backtracking(nQueens) {
    const board = Array.from({ length: nQueens }, () => Array(nQueens).fill(0)); // Initialize empty board

    const start = performance.now(); // Start measuring time
    const result = { solution: null, time: 0 };

    if (solveNQueensUtil(board, 0, nQueens, result)) {
        result.time = performance.now() - start; // Calculate time taken
        result.solution = board.map(row => row.indexOf(1)); // Convert board to solution format
    }

    return result;
}

function solveNQueens() {
    const nQueens = parseInt(document.getElementById('nQueens').value);
    const result = backtracking(nQueens);
    displaySolution(result.solution, nQueens);
    displayDetails(result);
}

window.solveNQueens = solveNQueens;
