export default function dijkstra(nodes, edges, startId) {
  const distances = {};
  const visitedOrder = [];
  const visited = new Set();

  nodes.forEach(n => distances[n.id] = Infinity);
  distances[startId] = 0;

  while (visited.size < nodes.length) {
    // Pick unvisited node with smallest distance
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

    // Update neighbors
    for (let edge of edges) {
      if (edge.from === currentNode) {
        const neighbor = edge.to;
        const alt = distances[currentNode] + edge.weight;
        if (alt < distances[neighbor]) {
          distances[neighbor] = alt;
        }
      }
    }
  }

  return { distances, visitedOrder };
}
