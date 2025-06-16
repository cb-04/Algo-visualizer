import React, { useState } from 'react';
import '../styles/GraphVisualizer.css';
import dfs from '../algorithms/dfs';
import bfs from '../algorithms/bfs';
import dijkstra from '../algorithms/dijkstra';
import bellmanFord from '../algorithms/bellmanFord';

let nodeIdCounter = 1;

export default function GraphVisualizer() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [startNodeId, setStartNodeId] = useState(null);

  const handleCanvasClick = (e) => {
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
    e.stopPropagation();

    if (e.shiftKey) {
      setNodes(nodes.filter(node => node.id !== nodeId));
      setEdges(edges.filter(edge => edge.from !== nodeId && edge.to !== nodeId));
      if (selectedNode === nodeId) {
        setSelectedNode(null);
      }
    } else {
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

  const runDFS = () => {
    if (startNodeId === null) return alert('Please select a start node!');
    const visited = dfs(nodes, edges, startNodeId);
    alert(`DFS Order: ${visited.join(' → ')}`);
  };

  const runBFS = () => {
    if (startNodeId === null) return alert('Please select a start node!');
    const visited = bfs(nodes, edges, startNodeId);
    alert(`BFS Order: ${visited.join(' → ')}`);
  };

  const runDijkstra = () => {
    if (startNodeId === null) return alert('Please select a start node!');
    const { distances } = dijkstra(nodes, edges, startNodeId);
    alert(`Distances:\n${JSON.stringify(distances, null, 2)}`);
  };

  const runBellmanFord = () => {
    if (startNodeId === null) return alert('Please select a start node!');
    const result = bellmanFord(nodes, edges, startNodeId);
    if (result.hasNegativeCycle) {
      alert('Graph contains a negative weight cycle.');
    } else {
      alert(`Distances:\n${JSON.stringify(result.distances, null, 2)}`);
    }
  };

  return (
    <div className="graph-canvas" onClick={handleCanvasClick}>
      {/* Controls */}
      <div className="controls">
        <h3>Choose Start Node:</h3>
        <select
          value={startNodeId ?? ''}
          onChange={(e) => setStartNodeId(parseInt(e.target.value))}
        >
          <option value="">Select Start Node</option>
          {nodes.map((node) => (
            <option key={node.id} value={node.id}>
              Node {node.id}
            </option>
          ))}
        </select>

        <div className="algo-buttons">
          <button onClick={runDFS}>Run DFS</button>
          <button onClick={runBFS}>Run BFS</button>
          <button onClick={runDijkstra}>Run Dijkstra</button>
          <button onClick={runBellmanFord}>Run Bellman-Ford</button>
        </div>
      </div>

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
          onClick={(e) => handleNodeClick(e, node.id)}
          style={{
            left: `${node.x}px`,
            top: `${node.y}px`
          }}
        >
          {node.id}
        </div>
      ))}

      <div className="instructions">
        <h3> How to use:</h3>
        <ul>
          <li> Click anywhere on the screen to create a node.</li>
          <li> Click two nodes in succession to create an edge (enter weight when prompted).</li>
          <li> <strong>Shift + Click</strong> on a node to delete it.</li>
        </ul>
      </div>
    </div>
  );
}
