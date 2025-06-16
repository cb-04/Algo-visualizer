import React, { useState, useEffect } from 'react';
import '../styles/GraphVisualizer.css';

const NUM_ROWS = 20;
const NUM_COLS = 40;
const START_NODE_ROW = 5;
const START_NODE_COL = 5;
const END_NODE_ROW = 15;
const END_NODE_COL = 35;

const GraphVisualizer = () => {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const initialGrid = createGrid();
    setGrid(initialGrid);
  }, []);

  const createGrid = () => {
    const newGrid = [];
    for (let row = 0; row < NUM_ROWS; row++) {
      const currentRow = [];
      for (let col = 0; col < NUM_COLS; col++) {
        currentRow.push(createNode(row, col));
      }
      newGrid.push(currentRow);
    }
    return newGrid;
  };

  const createNode = (row, col) => {
    return {
      row,
      col,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isEnd: row === END_NODE_ROW && col === END_NODE_COL,
      isWall: false,
    };
  };

  return (
    <div className="grid">
      {grid.map((row, rowIdx) => (
        <div key={rowIdx} className="grid-row">
          {row.map((node, nodeIdx) => {
            const { isStart, isEnd, isWall } = node;
            let className = 'node';
            if (isStart) className += ' start';
            else if (isEnd) className += ' end';
            else if (isWall) className += ' wall';

            return <div key={nodeIdx} className={className}></div>;
          })}
        </div>
      ))}
    </div>
  );
};

export default GraphVisualizer;
