import React, { useState, useEffect } from 'react';
import '../styles/SortingVisualizer.css';

export default function SortingVisualizer() {
  const [array, setArray] = useState([]);

  const generateArray = () => {
    const newArray = Array.from({ length: 50 }, () =>
      Math.floor(Math.random() * 300) + 20
    );
    setArray(newArray);
  };

  useEffect(() => {
    generateArray(); // generate on mount
  }, []);

  const bubbleSort = () => {
    // Sorting logic will come later
    alert('Bubble Sort to be implemented soon!');
  };

  return (
    <div className="sorting-container">
      <div className="controls">
        <button onClick={generateArray}>Generate New Array</button>
        <button onClick={bubbleSort}>Bubble Sort</button>
      </div>

      <div className="blocks-container">
        {array.map((value, idx) => (
          <div key={idx} className="block">
            {value}
          </div>
        ))}
      </div>

    </div>
  );
}
