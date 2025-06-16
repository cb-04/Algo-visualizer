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
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [isDirected, setIsDirected] = useState(true);
  const [distances, setDistances] = useState({});

  const handleCanvasClick = (e) => {
    if (e.target.closest('.controls') || e.target.closest('.instructions')) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newNode = { id: nodeIdCounter++, x, y };
    setNodes([...nodes, newNode]);
  };

  const handleNodeClick = (e, nodeId) => {
    e.stopPropagation();
    if (e.shiftKey) {
      setNodes(nodes.filter(node => node.id !== nodeId));
      setEdges(edges.filter(edge => edge.from !== nodeId && edge.to !== nodeId));
      if (selectedNode === nodeId) setSelectedNode(null);
    } else {
      if (selectedNode === null) {
        setSelectedNode(nodeId);
      } else if (selectedNode !== nodeId) {
        const weightInput = prompt('Enter weight for the edge (can be negative):');
        const parsedWeight = parseFloat(weightInput);
        if (!isNaN(parsedWeight)) {
          const newEdges = [{ from: selectedNode, to: nodeId, weight: parsedWeight, directed: isDirected }];
          if (!isDirected) newEdges.push({ from: nodeId, to: selectedNode, weight: parsedWeight, directed: isDirected });
          setEdges([...edges, ...newEdges]);
        } else {
          alert('Invalid weight. Edge not created.');
        }
        setSelectedNode(null);
      }
    }
  };

  const animateTraversal = async (order) => {
    for (let i = 0; i < order.length; i++) {
      setVisitedNodes(prev => [...prev, order[i]]);
      await new Promise(res => setTimeout(res, 500));
    }
  };

  const runDFS = async () => {
    if (startNodeId === null) return alert('Please select a start node!');
    setVisitedNodes([]);
    const order = dfs(nodes, edges, startNodeId, isDirected);
    await animateTraversal(order);
  };

  const runBFS = async () => {
    if (startNodeId === null) return alert('Please select a start node!');
    setVisitedNodes([]);
    const order = bfs(nodes, edges, startNodeId, isDirected);
    await animateTraversal(order);
  };

  const runDijkstra = async () => {
    if (startNodeId === null) return alert('Please select a start node!');
    setVisitedNodes([]);
    const { distances, visitedOrder } = dijkstra(nodes, edges, startNodeId, isDirected);
    setDistances(distances);
    await animateTraversal(visitedOrder);
  };

  const runBellmanFord = async () => {
    if (startNodeId === null) return alert('Please select a start node!');
    setVisitedNodes([]);
    const result = bellmanFord(nodes, edges, startNodeId, isDirected);
    if (result.hasNegativeCycle) {
      alert('Graph contains a negative weight cycle.');
    } else {
      setDistances(result.distances);
      const order = Object.keys(result.distances).map(id => parseInt(id));
      await animateTraversal(order);
    }
  };

  return (
    <div className="graph-canvas">
      <div className="controls">
        <div className="how-to">
          <h3> How to use:</h3>
          <ul>
            <li> Click anywhere on the screen to create a node.</li>
            <li> Click two nodes in succession to create an edge (enter weight when prompted).</li>
            <li> <strong>Shift + Click</strong> on a node to delete it.</li>
          </ul>
        </div>
        <h3>Choose Start Node:</h3>
        <select value={startNodeId ?? ''} onChange={(e) => setStartNodeId(parseInt(e.target.value))}>
          <option value="">Select Start Node</option>
          {nodes.map((node) => (
            <option key={node.id} value={node.id}>Node {node.id}</option>
          ))}
        </select>

        <div className="edge-toggle-container">
          <button className={`edge-toggle-button ${isDirected ? 'active' : ''}`} onClick={() => setIsDirected(true)}>Directed</button>
          <button className={`edge-toggle-button ${!isDirected ? 'active' : ''}`} onClick={() => setIsDirected(false)}>Undirected</button>
        </div>

        <div className="algo-buttons">
          <button onClick={runDFS}>Run DFS</button>
          <button onClick={runBFS}>Run BFS</button>
          <button onClick={runDijkstra}>Run Dijkstra</button>
          <button onClick={runBellmanFord}>Run Bellman-Ford</button>
        </div>
      </div>

      <div className="canvas-area" onClick={handleCanvasClick}>
        <svg className="graph-edges" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto" markerUnits="strokeWidth">
              <polygon points="0 0, 10 3.5, 0 7" fill="white" />
            </marker>
          </defs>
          {edges.map((edge, index) => {
            const from = nodes.find(n => n.id === edge.from);
            const to = nodes.find(n => n.id === edge.to);
            if (!from || !to) return null;

            const x1 = from.x + 15;
            const y1 = from.y + 15;
            const x2 = to.x + 15;
            const y2 = to.y + 15;
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;

            const dx = x2 - x1;
            const dy = y2 - y1;
            const distance = Math.hypot(dx, dy);
            const nodeRadius = 15;

            const shortenRatio = (distance - nodeRadius) / distance;
            const shortenedX2 = x1 + dx * shortenRatio;
            const shortenedY2 = y1 + dy * shortenRatio;

            const shortenStartRatio = nodeRadius / distance;
            const shortenedX1 = x1 + dx * shortenStartRatio;
            const shortenedY1 = y1 + dy * shortenStartRatio;

            return (
              <React.Fragment key={index}>
                <line
                  x1={shortenedX1}
                  y1={shortenedY1}
                  x2={shortenedX2}
                  y2={shortenedY2}
                  stroke="white"
                  strokeWidth="2"
                  markerEnd={edge.directed ? 'url(#arrowhead)' : ''}
                />
                <text
                  x={midX}
                  y={midY - 5}
                  fill="white"
                  fontSize="12"
                  textAnchor="middle"
                >
                  {edge.weight}
                </text>
              </React.Fragment>
            );
          })}
        </svg>

        {nodes.map((node) => (
          <div
            key={node.id}
            className={`node ${selectedNode === node.id ? 'selected' : ''} ${visitedNodes.includes(node.id) ? 'visited' : ''}`}
            onClick={(e) => handleNodeClick(e, node.id)}
            style={{ left: `${node.x}px`, top: `${node.y}px`, zIndex: 1 }}
          >
            {node.id}
            <div className="distance-label">
              {distances[node.id] !== undefined ? `(${distances[node.id]})` : ''}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
