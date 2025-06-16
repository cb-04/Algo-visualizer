// algorithms/mergeSort.js
const delay = (ms) => new Promise(res => setTimeout(res, ms));

export default async function mergeSort(arr, setArray, setActiveIndices, setSortedIndices, setMergeHighlights) {
  const array = [...arr];

  async function merge(start, mid, end) {
    let left = array.slice(start, mid + 1);
    let right = array.slice(mid + 1, end + 1);

    let i = 0, j = 0, k = start;

    // Highlight splits
    const highlights = [];
    for (let idx = start; idx <= mid; idx++) highlights.push({ index: idx, type: 'left' });
    for (let idx = mid + 1; idx <= end; idx++) highlights.push({ index: idx, type: 'right' });
    setMergeHighlights(highlights);
    await delay(400);

    while (i < left.length && j < right.length) {
      setActiveIndices({ first: k, second: null });
      await delay(300);

      if (left[i] <= right[j]) {
        array[k] = left[i++];
      } else {
        array[k] = right[j++];
      }
      setArray([...array]);
      await delay(300);
      k++;
    }

    while (i < left.length) {
      array[k++] = left[i++];
      setArray([...array]);
      await delay(300);
    }

    while (j < right.length) {
      array[k++] = right[j++];
      setArray([...array]);
      await delay(300);
    }

    setMergeHighlights([]); // Clear highlights after merge
    await delay(200);
  }

  async function mergeSortHelper(start, end) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    await mergeSortHelper(start, mid);
    await mergeSortHelper(mid + 1, end);
    await merge(start, mid, end);
  }

  await mergeSortHelper(0, array.length - 1);
  setSortedIndices(array.map((_, i) => i));
  setActiveIndices({ first: null, second: null });
}
