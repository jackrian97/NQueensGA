import { allAlgorithmTimes, generateRandomArray } from './sorting_algorithm.js';

function solveAlgorithm() {
    const baseNumber = parseInt(document.getElementById('baseNumber').value);
    const powerCount = parseInt(document.getElementById('powerCount').value);
    const sizes = [];
    const times = {
        bubbleSort: {
            unsorted_to_ascending: [],
            ascending_to_descending: [],
            descending_to_ascending: []
        },
        insertionSort: {
            unsorted_to_ascending: [],
            ascending_to_descending: [],
            descending_to_ascending: []
        },
        quickSort: {
            unsorted_to_ascending: [],
            ascending_to_descending: [],
            descending_to_ascending: []
        },
        selectionSort: {
            unsorted_to_ascending: [],
            ascending_to_descending: [],
            descending_to_ascending: []
        }
    };

    // Generar tamaños de arreglos basados en potencias de 10
    for (let i = 1; i <= powerCount; i++) {
        sizes.push(baseNumber * Math.pow(10, i));
    }

    sizes.forEach(size => {
        const arr = generateRandomArray(size);
        const timesForSize = allAlgorithmTimes([...arr]);

        for (let algo in times) {
            times[algo].unsorted_to_ascending.push(timesForSize[`${algo}_unsorted_to_ascending`]);
            times[algo].ascending_to_descending.push(timesForSize[`${algo}_ascending_to_descending`]);
            times[algo].descending_to_ascending.push(timesForSize[`${algo}_descending_to_ascending`]);
        }
    });

    document.getElementById('results').innerHTML = ''; // Clear previous results

    drawChart(sizes, times, 'unsorted_to_ascending', 'Orden Ascendente');
    drawChart(sizes, times, 'ascending_to_descending', 'Orden Descendente');
    drawChart(sizes, times, 'descending_to_ascending', 'Orden Ascendente con Arreglo Descendente');
}

function drawChart(sizes, times, situation, title) {
    const canvasContainer = document.createElement('div');
    canvasContainer.style.width = '660px';
    canvasContainer.style.height = '330px';
    canvasContainer.style.marginBottom = '20px';
    document.getElementById('results').appendChild(canvasContainer);

    const ctx = document.createElement('canvas');
    ctx.id = `chart_${situation}`;
    ctx.width = 660;  // Anchura del canvas
    ctx.height = 330; // Altura del canvas
    canvasContainer.appendChild(ctx);

    const datasets = [];
    for (let algo in times) {
        datasets.push({
            label: `${algo.charAt(0).toUpperCase() + algo.slice(1).replace(/Sort/, ' Sort')}`,
            data: times[algo][situation],
            borderColor: getColor(algo),
            fill: false
        });
    }

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: sizes,
            datasets: datasets
        },
        options: {
            scales: {
                x: {
                    type: 'logarithmic',
                    title: {
                        display: true,
                        text: 'Tamaño del Arreglo'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Tiempo (ms)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw.toFixed(2)} ms`;
                        }
                    }
                }
            }
        }
    });
}


function getColor(algo) {
    const colors = {
        bubbleSort: 'purple',
        insertionSort: 'lime',
        quickSort: 'orange',
        selectionSort: 'red'
    };
    return colors[algo];
}

window.solveAlgorithm = solveAlgorithm;
