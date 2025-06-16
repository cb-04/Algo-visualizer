import React, { useState } from 'react';
import '../styles/GraphVisualizer.css';

let nodeIdCounter = 1;

export default function GraphVisualizer() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const handleCanvasClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newNode = {
      id: nodeIdCounter++,
      x,
      y
    };

    setNodes([...nodes, newNode]);
  };

  const handleNodeClick = (nodeId) => {
    if (selectedNode === null) {
      setSelectedNode(nodeId);
    } else {
      if (selectedNode !== nodeId) {
        setEdges([...edges, { from: selectedNode, to: nodeId }]);
      }
      setSelectedNode(null);
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
        const length = Math.hypot(x2 - x1, y2 - y1);
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

        return (
          <div
            key={index}
            className="edge"
            style={{
              left: `${x1}px`,
              top: `${y1}px`,
              width: `${length}px`,
              transform: `rotate(${angle}deg)`
            }}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node) => (
        <div
          key={node.id}
          className={`node ${selectedNode === node.id ? 'selected' : ''}`}
          style={{ left: node.x, top: node.y }}
          onClick={(e) => {
            e.stopPropagation(); // prevent canvas click
            handleNodeClick(node.id);
          }}
        >
          {node.id}
        </div>
      ))}
    </div>
  );
}
