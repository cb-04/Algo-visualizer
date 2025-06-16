import React, { useState } from 'react';
import '../styles/SortingVisualizer.css';
import bubbleSort from '../algorithms/bubbleSort';

export default function SortingVisualizer() {
  const [array, setArray] = useState([5, 2, 9, 1, 6, 3]);
  const [activeIndices, setActiveIndices] = useState({ first: null, second: null });
  const [sortedIndices, setSortedIndices] = useState([]);

  const handleSort = async () => {
    setSortedIndices([]); // reset in case of re-runs
    await bubbleSort(array, setArray, setActiveIndices, setSortedIndices);
  };

  const generateNewArray = () => {
    const newArr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    setArray(newArr);
    setSortedIndices([]);
    setActiveIndices({ first: null, second: null });
  };

  return (
    <div className="sorting-container">
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

      <div className="controls">
        <button onClick={generateNewArray}>Generate New Array</button>
        <button onClick={handleSort}>Run Bubble Sort</button>
      </div>
    </div>
  );
}
