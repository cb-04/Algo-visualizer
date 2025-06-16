// algorithms/selectionSort.js
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default async function selectionSort(arr, setArray, setActiveIndices, setSortedIndices) {
  const array = [...arr];
  const n = array.length;
  const sorted = [];

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    setActiveIndices({ first: i, second: minIdx });
    await delay(300);

    for (let j = i + 1; j < n; j++) {
      setActiveIndices({ first: i, second: j });
      await delay(300);
      if (array[j] < array[minIdx]) {
        minIdx = j;
        setActiveIndices({ first: i, second: minIdx });
        await delay(300);
      }
    }

    // Swap the found minimum element with the first element
    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      setArray([...array]);
      await delay(300);
    }

    sorted.push(i);
    setSortedIndices([...sorted]);
  }

  setSortedIndices(array.map((_, idx) => idx)); // All sorted
  setActiveIndices({ first: null, second: null });
}
