
function buildAdjList(nodes, edges) {
  const adj = new Map();
  nodes.forEach(node => adj.set(node.id, []));

  edges.forEach(edge => {
    adj.get(edge.from).push(edge.to);
    adj.get(edge.to).push(edge.from); // undirected
  });

  return adj;
}

export function dfsFullGraph(nodes, edges) {
  if (nodes.length === 0) return [];

  const adj = buildAdjList(nodes, edges);
  const visited = new Set();
  const steps = [];

  // Sort nodes by id to make component discovery deterministic
  const allNodeIds = nodes.map(n => n.id).sort((a, b) => a - b);

  for (const start of allNodeIds) {
    if (visited.has(start)) continue;

    const stack = [start];
    visited.add(start);

    // Record start of new component
    steps.push({
      current: start,
      stack: [...stack],
      componentStart: start
    });

    while (stack.length > 0) {
      const current = stack.pop(); // DFS uses pop (LIFO)

      // We already "visit" when pushing, but record every pop as processing
      steps.push({
        current,
        stack: [...stack],
        // no new componentStart here
      });

      // Explore neighbors in reverse order (to simulate typical left-to-right)
      const neighbors = adj.get(current) || [];
      for (let i = neighbors.length - 1; i >= 0; i--) {
        const neigh = neighbors[i];
        if (!visited.has(neigh)) {
          visited.add(neigh);
          stack.push(neigh);
          // Record the push step (optional but makes animation nicer)
          steps.push({
            current: neigh,           // show the newly discovered node
            stack: [...stack],
          });
        }
      }
    }
  }

  return steps;
}