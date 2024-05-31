// Generate a random array of size 'size'
export function generateRandomArray(size) {
    let set = new Set();
    while (set.size < size) {
        set.add(Math.floor(Math.random() * size));
    }
    return Array.from(set);
}

// Bubble Sort
export function bubbleSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

// Insertion Sort
export function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
    return arr;
}

// Quick Sort
export function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[Math.floor(arr.length / 2)];
    const left = [];
    const right = [];
    for (let i = 0; i < arr.length; i++) {
        if (i === Math.floor(arr.length / 2)) continue;
        arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
}

// Selection Sort
export function selectionSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        let minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    return arr;
}

// Sort array in descending order
export function descendingSort(arr) {
    return arr.sort((a, b) => b - a);
}

// Measure execution time of a function
export function timeOfExecution(func, arr) {
    const start = performance.now();
    func([...arr]);  // Ensure the function does not mutate the original array
    const end = performance.now();
    return end - start;
}

// Measure execution times for all algorithms in different scenarios
export function allAlgorithmTimes(arr) {
    const algorithms = [bubbleSort, insertionSort, quickSort, selectionSort];
    const times = {};

    algorithms.forEach(algorithm => {
        const algoName = algorithm.name;

        // Situation 1: Unsorted to Ascending
        const arrCopy1 = [...arr];
        const time1 = timeOfExecution(algorithm, arrCopy1);
        times[`${algoName}_unsorted_to_ascending`] = time1;
        console.log(`${algoName} - Unsorted to Ascending: ${time1} ms`);

        // Situation 2: Ascending to Descending
        const arrCopy2 = [...arrCopy1];
        const time2 = timeOfExecution(descendingSort, arrCopy2);
        times[`${algoName}_ascending_to_descending`] = time2;
        console.log(`${algoName} - Ascending to Descending: ${time2} ms`);

        // Situation 3: Descending to Ascending
        const arrCopy3 = [...arrCopy2];
        const time3 = timeOfExecution(algorithm, arrCopy3);
        times[`${algoName}_descending_to_ascending`] = time3;
        console.log(`${algoName} - Descending to Ascending: ${time3} ms`);
    });

    return times;
}
