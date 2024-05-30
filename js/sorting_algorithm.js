


// Generate a random array of size 'size'
export function generateRandomArray(size) {
    // Create a set to store unique values
    let set = new Set();
    // While the set size is less than the required size, add a random number to the set
    while(set.size < size) {
        set.add(Math.floor(Math.random() * size));
    }
    // Convert the set to an array and return it
    return Array.from(set);
}


// Algorithm for insertion sort
export function insertionSort(arr) {
    // Iterate from 1 because the first element is already sorted
    for (let i = 1; i < arr.length; i++) {
        // number to be compared
        let key = arr[i];
        // index of the previous element
        let j = i - 1;
        // Compare the key with the previous elements and swap them if the key is smaller
        while (j >= 0 && arr[j] > key) {
            // Move the elements to the right
            arr[j + 1] = arr[j];
            // Move to the previous element
            j = j - 1;
        }
        // Insert the key in its correct position
        arr[j + 1] = key;
    }
}