export default async function bubbleSort(array, setArray, setActive, setSorted) {
  const arr = [...array];
  const sleep = (ms) => new Promise(res => setTimeout(res, ms));
  
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      setActive({ first: j, second: j + 1 });
      await sleep(300);
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        setArray([...arr]);
        await sleep(300);
      }
    }
    setSorted(prev => [...prev, arr.length - i - 1]);
  }

  setActive({ first: null, second: null });
}
