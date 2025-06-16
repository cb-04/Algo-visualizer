export default function bellmanFord(nodes, edges, startId, isDirected = true) {
  const distances = {};
  nodes.forEach(n => distances[n.id] = Infinity);
  distances[startId] = 0;

  // Relax edges |V| - 1 times
  for (let i = 0; i < nodes.length - 1; i++) {
    edges.forEach(edge => {
      if (distances[edge.from] !== Infinity && distances[edge.from] + edge.weight < distances[edge.to]) {
        distances[edge.to] = distances[edge.from] + edge.weight;
      }

      // If undirected, relax the reverse edge too
      if (!isDirected && distances[edge.to] !== Infinity && distances[edge.to] + edge.weight < distances[edge.from]) {
        distances[edge.from] = distances[edge.to] + edge.weight;
      }
    });
  }

  // Check for negative weight cycles
  let hasNegativeCycle = false;
  edges.forEach(edge => {
    if (distances[edge.from] !== Infinity && distances[edge.from] + edge.weight < distances[edge.to]) {
      hasNegativeCycle = true;
    }

    if (!isDirected && distances[edge.to] !== Infinity && distances[edge.to] + edge.weight < distances[edge.from]) {
      hasNegativeCycle = true;
    }
  });

  return { distances, hasNegativeCycle };
}
