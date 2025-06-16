// algorithms/insertionSort.js
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default async function insertionSort(arr, setArray, setActiveIndices, setSortedIndices) {
  const array = [...arr];
  const sorted = [];

  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    setActiveIndices({ first: i, second: j });
    await delay(300);

    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;

      setArray([...array]);
      setActiveIndices({ first: j + 1, second: j });
      await delay(300);
    }

    array[j + 1] = key;
    setArray([...array]);
    sorted.push(i); // Just a rough way to show it's being placed

    await delay(300);
  }

  // Final pass to mark all sorted
  setSortedIndices(array.map((_, idx) => idx));
  setActiveIndices({ first: null, second: null });
}
