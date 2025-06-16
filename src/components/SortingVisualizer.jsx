import React, { useState, useEffect } from 'react';
import bubbleSort from '../algorithms/bubbleSort';
import insertionSort from '../algorithms/insertionSort';
import selectionSort from '../algorithms/selectionSort';
import mergeSort from '../algorithms/mergeSort';
import '../styles/SortingVisualizer.css';

const generateRandomArray = (size) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * 100));

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [activeIndices, setActiveIndices] = useState({});
  const [sortedIndices, setSortedIndices] = useState([]);
  const [mergeHighlights, setMergeHighlights] = useState([]);
  const [currentAlgorithm, setCurrentAlgorithm] = useState(null);

  useEffect(() => {
    regenerateArray();
  }, []);

  const regenerateArray = () => {
    setArray(generateRandomArray(20));
    setSortedIndices([]);
    setActiveIndices({});
    setMergeHighlights([]);
    setCurrentAlgorithm(null);
  };

  const handleBubbleSort = async () => {
    setCurrentAlgorithm('bubble');
    setSortedIndices([]);
    await bubbleSort(array, setArray, setActiveIndices, setSortedIndices);
    setCurrentAlgorithm(null);
  };

  const handleInsertionSort = async () => {
    setCurrentAlgorithm('insertion');
    setSortedIndices([]);
    await insertionSort(array, setArray, setActiveIndices, setSortedIndices);
    setCurrentAlgorithm(null);
  };

  const handleSelectionSort = async () => {
    setCurrentAlgorithm('selection');
    setSortedIndices([]);
    await selectionSort(array, setArray, setActiveIndices, setSortedIndices);
    setCurrentAlgorithm(null);
  };

  const handleMergeSort = async () => {
    setCurrentAlgorithm('merge');
    setSortedIndices([]);
    setMergeHighlights([]);
    await mergeSort(array, setArray, setActiveIndices, setSortedIndices, setMergeHighlights);
    setCurrentAlgorithm(null);
  };

  return (
    <div className="sorting-visualizer-container">
      <div className="sorting-panel">
        <button onClick={regenerateArray}>Regenerate</button>
        <button onClick={handleInsertionSort}>Insertion Sort</button>
        <button onClick={handleSelectionSort}>Selection Sort</button>
        <button onClick={handleBubbleSort}>Bubble Sort</button>
        <button onClick={handleMergeSort}>Merge Sort</button>
      </div>

      <div className="sorting-area">
        {array.map((value, idx) => {
          const highlight = mergeHighlights.find(h => h.index === idx);
          const isLeft = highlight?.type === 'left';
          const isRight = highlight?.type === 'right';

          return (
            <div
              key={idx}
              className={`block 
                ${sortedIndices.includes(idx) ? 'sorted' : ''} 
                ${currentAlgorithm === 'merge' && isLeft ? 'left-half' : ''} 
                ${currentAlgorithm === 'merge' && isRight ? 'right-half' : ''} 
                ${activeIndices.first === idx || activeIndices.second === idx ? 'active' : ''}`}
            >
              {value}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SortingVisualizer;
