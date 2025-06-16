import React, { useState } from 'react';
import '../styles/SortingVisualizer.css';

import bubbleSort from '../algorithms/bubbleSort';
// import insertionSort from '../algorithms/insertionSort'; // add as you build
// import selectionSort from '../algorithms/selectionSort';
// import mergeSort from '../algorithms/mergeSort';

export default function SortingVisualizer() {
  const [array, setArray] = useState([5, 2, 9, 1, 6, 3]);
  const [activeIndices, setActiveIndices] = useState({ first: null, second: null });
  const [sortedIndices, setSortedIndices] = useState([]);

  const generateNewArray = () => {
    const newArr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    setArray(newArr);
    setSortedIndices([]);
    setActiveIndices({ first: null, second: null });
  };

  const handleBubbleSort = async () => {
    setSortedIndices([]);
    await bubbleSort(array, setArray, setActiveIndices, setSortedIndices);
  };

  // Add similar handlers for insertionSort, selectionSort, mergeSort etc.

  return (
    <div className="sorting-visualizer-container">
      <div className="blocks-section">
        <h2>Sorting Visualizer</h2>
        <div className="blocks-container">
          {array.map((value, idx) => {
            let className = "block";
            if (idx === activeIndices.first || idx === activeIndices.second) {
              className += " active";
            }
            if (sortedIndices.includes(idx)) {
              className += " sorted";
            }
            return (
              <div key={idx} className={className}>
                {value}
              </div>
            );
          })}
        </div>
      </div>

      <div className="side-panel">
        <h3>Algorithms</h3>
        <button onClick={generateNewArray}>Generate New Array</button>
        <button onClick={handleBubbleSort}>Bubble Sort</button>
        <button disabled>Insertion Sort</button>
        <button disabled>Selection Sort</button>
        <button disabled>Merge Sort</button>
      </div>
    </div>
  );
}
