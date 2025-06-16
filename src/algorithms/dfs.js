export default function dfs(nodes, edges, startId) {
  const visited = [];
  const visitedSet = new Set();

  const adjacencyList = {};
  nodes.forEach(node => {
    adjacencyList[node.id] = [];
  });

  edges.forEach(edge => {
    adjacencyList[edge.from].push(edge.to);
    adjacencyList[edge.to].push(edge.from); // Make it undirected
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
