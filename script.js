let values = [];
let numBars = 10;
let isSorting = false; // Flag to control sorting
let barContainer;

function setup() {
    barContainer = document.getElementById('bar-container');
    generateArray(numBars);
}

function generateArray(num) {
    values = new Array(num);
    for (let i = 0; i < values.length; i++) {
        values[i] = Math.floor(Math.random() * 400) + 10;
    }
    renderBars();
}

function renderBars() {
    barContainer.innerHTML = '';
    for (let i = 0; i < values.length; i++) {
        const bar = document.createElement('div');
        bar.style.height = `${values[i]}px`;
        bar.style.width = `${barContainer.offsetWidth / values.length - 2}px`;
        bar.classList.add('bar');
        barContainer.appendChild(bar);
    }
}

function setNumberOfBars(num) {
    numBars = num;
    generateArray(numBars);
}

function startSorting() {
    const algorithm = document.getElementById('algorithm-select').value;
    isSorting = true; // Start sorting
    switch (algorithm) {
        case 'bubble':
            bubbleSort(values);
            break;
        case 'merge':
            mergeSort(values, 0, values.length - 1);
            break;
        case 'quick':
            quickSort(values, 0, values.length - 1);
            break;
        case 'insertion':
            insertionSort(values);
            break;
        case 'heap':
            heapSort(values);
            break;
        case 'selection':
            selectionSort(values);
            break;
    }
}

function stopSorting() {
    isSorting = false; // Stop sorting
}

async function bubbleSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        if (!isSorting) return; // Exit if sorting is stopped
        for (let j = 0; j < len - 1 - i; j++) {
            if (!isSorting) return; // Exit if sorting is stopped
            if (arr[j] > arr[j + 1]) {
                await swap(arr, j, j + 1);
            }
        }
        await markSorted(len - 1 - i);
    }
}

async function mergeSort(arr, start, end) {
    if (!isSorting) return; // Exit if sorting is stopped
    if (start >= end) return;
    let mid = Math.floor((start + end) / 2);
    await mergeSort(arr, start, mid);
    await mergeSort(arr, mid + 1, end);
    await merge(arr, start, mid, end);
    for (let i = start; i <= end; i++) {
        await markSorted(i);
    }
}

async function merge(arr, start, mid, end) {
    if (!isSorting) return; // Exit if sorting is stopped

    let left = arr.slice(start, mid + 1);
    let right = arr.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
        if (!isSorting) return; // Exit if sorting is stopped
        if (left[i] <= right[j]) {
            arr[k] = left[i];
            i++;
        } else {
            arr[k] = right[j];
            j++;
        }
        k++;
        await sleep(50); // Add delay for visualization
        renderBars();
    }

    while (i < left.length) {
        if (!isSorting) return; // Exit if sorting is stopped
        arr[k] = left[i];
        i++;
        k++;
        await sleep(50); // Add delay for visualization
        renderBars();
    }

    while (j < right.length) {
        if (!isSorting) return; // Exit if sorting is stopped
        arr[k] = right[j];
        j++;
        k++;
        await sleep(50); // Add delay for visualization
        renderBars();
    }
}

async function quickSort(arr, left, right) {
    if (!isSorting) return; // Exit if sorting is stopped
    if (left < right) {
        let pivotIndex = await partition(arr, left, right);
        await quickSort(arr, left, pivotIndex - 1);
        await quickSort(arr, pivotIndex + 1, right);
        if (left == 0 && right == arr.length - 1) {
            for (let i = 0; i < arr.length; i++) {
                await markSorted(i);
            }
        }
    }
}

async function partition(arr, left, right) {
    if (!isSorting) return; // Exit if sorting is stopped
    let pivotValue = arr[right];
    let pivotIndex = left;
    for (let i = left; i < right; i++) {
        if (!isSorting) return; // Exit if sorting is stopped
        if (arr[i] < pivotValue) {
            await swap(arr, i, pivotIndex);
            pivotIndex++;
        }
    }
    await swap(arr, right, pivotIndex);
    return pivotIndex;
}

async function insertionSort(arr) {
    if (!isSorting) return; // Exit if sorting is stopped
    let len = arr.length;
    for (let i = 1; i < len; i++) {
        if (!isSorting) return; // Exit if sorting is stopped
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            if (!isSorting) return; // Exit if sorting is stopped
            arr[j + 1] = arr[j];
            j--;
            await sleep(50); // Add delay for visualization
            renderBars();
        }
        arr[j + 1] = key;
        await markSorted(i);
    }
}

async function heapSort(arr) {
    if (!isSorting) return; // Exit if sorting is stopped
    let len = arr.length;

    // Build max heap
    for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
        await heapify(arr, len, i);
    }

    // Extract elements from heap one by one
    for (let i = len - 1; i > 0; i--) {
        if (!isSorting) return; // Exit if sorting is stopped
        await swap(arr, 0, i); // Move current root to end
        await heapify(arr, i, 0); // Max heapify the reduced heap
        await markSorted(i);
    }
    await markSorted(0);
}

async function heapify(arr, n, i) {
    if (!isSorting) return; // Exit if sorting is stopped
    let largest = i; // Initialize largest as root
    let left = 2 * i + 1; // Left child
    let right = 2 * i + 2; // Right child

    // If left child is larger than root
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    // If right child is larger than largest so far
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    // If largest is not root
    if (largest !== i) {
        await swap(arr, i, largest);
        await heapify(arr, n, largest);
    }
}

async function selectionSort(arr) {
    if (!isSorting) return; // Exit if sorting is stopped
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        if (!isSorting) return; // Exit if sorting is stopped
        let minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (!isSorting) return; // Exit if sorting is stopped
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            await swap(arr, i, minIndex);
        }
        await markSorted(i);
    }
    await markSorted(len - 1);
}

async function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    renderBars();
    await sleep(50); // Add delay for visualization
}

async function markSorted(index) {
    const bars = document.getElementsByClassName('bar');
    bars[index].classList.add('sorted');
    await sleep(50); // Add delay for visualization
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Initial setup
window.onload = setup;
