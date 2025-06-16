export default function bellmanFord(nodes, edges, startId) {
  const distances = {};
  nodes.forEach(n => distances[n.id] = Infinity);
  distances[startId] = 0;

  for (let i = 0; i < nodes.length - 1; i++) {
    edges.forEach(edge => {
      if (distances[edge.from] + edge.weight < distances[edge.to]) {
        distances[edge.to] = distances[edge.from] + edge.weight;
      }
    });
  }

  let hasNegativeCycle = false;
  edges.forEach(edge => {
    if (distances[edge.from] + edge.weight < distances[edge.to]) {
      hasNegativeCycle = true;
    }
  });

  return { distances, hasNegativeCycle };
}
