export default function dijkstra(nodes, edges, startId) {
  const distances = {};
  const visitedOrder = [];
  const unvisited = new Set(nodes.map(n => n.id));

  nodes.forEach(n => distances[n.id] = Infinity);
  distances[startId] = 0;

  while (unvisited.size > 0) {
    let currentNode = null;
    let smallestDistance = Infinity;

    for (let nodeId of unvisited) {
      if (distances[nodeId] < smallestDistance) {
        smallestDistance = distances[nodeId];
        currentNode = nodeId;
      }
    }

    if (currentNode === null) break;

    visitedOrder.push(currentNode);
    unvisited.delete(currentNode);

    edges
      .filter(edge => edge.from === currentNode)
      .forEach(edge => {
        const alt = distances[currentNode] + edge.weight;
        if (alt < distances[edge.to]) {
          distances[edge.to] = alt;
        }
      });
  }

  return { distances, visitedOrder };
}
