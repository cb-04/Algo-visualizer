export default function bfs(nodes, edges, startId, isDirected = true) {
  const visited = [];
  const visitedSet = new Set();
  const queue = [startId];
  visitedSet.add(startId);

  const adjacencyList = {};
  nodes.forEach(node => {
    adjacencyList[node.id] = [];
  });

  edges.forEach(edge => {
    adjacencyList[edge.from].push(edge.to);
    if (!isDirected) {
      adjacencyList[edge.to].push(edge.from); // Add reverse edge only if undirected
    }
  });

  while (queue.length > 0) {
    const current = queue.shift();
    visited.push(current);
    for (let neighbor of adjacencyList[current]) {
      if (!visitedSet.has(neighbor)) {
        queue.push(neighbor);
        visitedSet.add(neighbor);
      }
    }
  }

  return visited;
}

