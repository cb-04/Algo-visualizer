export default function dfs(nodes, edges, startId, isDirected = true) {
  const visited = [];
  const visitedSet = new Set();

  const adjacencyList = {};
  nodes.forEach(node => {
    adjacencyList[node.id] = [];
  });

  edges.forEach(edge => {
    adjacencyList[edge.from].push(edge.to);
    if (!isDirected) {
      adjacencyList[edge.to].push(edge.from); // Only add reverse if undirected
    }
  });

  function dfsHelper(nodeId) {
    visited.push(nodeId);
    visitedSet.add(nodeId);

    for (let neighbor of adjacencyList[nodeId]) {
      if (!visitedSet.has(neighbor)) {
        dfsHelper(neighbor);
      }
    }
  }

  dfsHelper(startId);
  return visited;
}
