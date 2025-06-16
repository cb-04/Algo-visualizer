import React, { useState } from 'react';
import '../styles/GraphVisualizer.css';

let nodeIdCounter = 1;

export default function GraphVisualizer() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const handleCanvasClick = (e) => {
    // Prevent creating node if clicking on existing node or label
    if (e.target.classList.contains('node') || e.target.classList.contains('weight-label')) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newNode = {
      id: nodeIdCounter++,
      x,
      y
    };

    setNodes([...nodes, newNode]);
  };

  const handleNodeClick = (e, nodeId) => {
    e.stopPropagation(); // Prevent canvas click

    if (e.shiftKey) {
      // Delete node and its edges
      setNodes(nodes.filter(node => node.id !== nodeId));
      setEdges(edges.filter(edge => edge.from !== nodeId && edge.to !== nodeId));
      if (selectedNode === nodeId) {
        setSelectedNode(null);
      }
    } else {
      // Select nodes for edge creation
  if (selectedNode === null) {
    setSelectedNode(nodeId);
  } else {
    if (selectedNode !== nodeId) {
      const weightInput = prompt('Enter weight for the edge (can be negative):');
      const parsedWeight = parseFloat(weightInput);

      if (!isNaN(parsedWeight)) {
        setEdges([...edges, { from: selectedNode, to: nodeId, weight: parsedWeight }]);
      } else {
        alert('Invalid weight. Edge not created.');
      }
    }
    setSelectedNode(null);
  }
    }
  };

  return (
    <div className="graph-canvas" onClick={handleCanvasClick}>
      {/* Edges */}
      {edges.map((edge, index) => {
        const from = nodes.find(n => n.id === edge.from);
        const to = nodes.find(n => n.id === edge.to);
        if (!from || !to) return null;

        const x1 = from.x + 15, y1 = from.y + 15;
        const x2 = to.x + 15, y2 = to.y + 15;
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        const length = Math.hypot(x2 - x1, y2 - y1);
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

        return (
          <React.Fragment key={index}>
            <div
              className="edge"
              style={{
                left: `${x1}px`,
                top: `${y1}px`,
                width: `${length}px`,
                transform: `rotate(${angle}deg)`
              }}
            />
            <div
              className="weight-label"
              style={{
                left: `${midX}px`,
                top: `${midY}px`
              }}
            >
              {edge.weight}
            </div>
          </React.Fragment>
        );
      })}

      {/* Nodes */}
      {nodes.map((node) => (
        <div
          key={node.id}
          className={`node ${selectedNode === node.id ? 'selected' : ''}`}
          onClick={(e) => handleNodeClick(e, node.id)} // 🧠 Fix is here
          style={{
            left: `${node.x}px`,
            top: `${node.y}px`
          }}
        >
          {node.id}
        </div>
      ))}
    </div>
  );
}
