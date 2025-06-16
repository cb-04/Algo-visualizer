export default function dijkstra(nodes, edges, startId, isDirected = true) {
  const distances = {};
  const visitedOrder = [];
  const visited = new Set();

  // Initialize distances to infinity
  nodes.forEach(n => distances[n.id] = Infinity);
  distances[startId] = 0;

  while (visited.size < nodes.length) {
    // Pick unvisited node with the smallest distance
    let currentNode = null;
    let smallestDistance = Infinity;

    for (let node of nodes) {
      if (!visited.has(node.id) && distances[node.id] < smallestDistance) {
        smallestDistance = distances[node.id];
        currentNode = node.id;
      }
    }

    if (currentNode === null) break;

    visitedOrder.push(currentNode);
    visited.add(currentNode);

    // Update neighbors (respecting directed or undirected setting)
    for (let edge of edges) {
      const isForward = edge.from === currentNode;
      const isReverse = !isDirected && edge.to === currentNode;

      if (isForward || isReverse) {
        const neighbor = isForward ? edge.to : edge.from;
        const alt = distances[currentNode] + edge.weight;
        if (alt < distances[neighbor]) {
          distances[neighbor] = alt;
        }
      }
    }
  }

  return { distances, visitedOrder };
}
