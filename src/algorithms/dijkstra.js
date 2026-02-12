class MinPriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(node, dist) {
    this.items.push({ node, dist });
    this.items.sort((a, b) => a.dist - b.dist); // naive but works for small N
  }

  dequeue() {
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }

  // For visualization: return copy of current content
  getContent() {
    return [...this.items];
  }

  // Optional: decrease key (but we don't implement full decrease-key here)
}

export function dijkstra(startId, nodes, edges) {
  if (nodes.length === 0) return { steps: [], dist: {}, prev: {} };

  // Build adjacency list with weights: Map<node, [{to, weight}]>
  const adj = new Map();
  nodes.forEach(n => adj.set(n.id, []));

  edges.forEach(e => {
    adj.get(e.from).push({ to: e.to, weight: e.weight || 1 });
    adj.get(e.to).push({ to: e.from, weight: e.weight || 1 }); // undirected
  });

  const dist = {};
  const prev = {};
  const visited = new Set(); // settled nodes
  const pq = new MinPriorityQueue();

  // Initialize
  nodes.forEach(node => {
    dist[node.id] = Infinity;
    prev[node.id] = null;
  });
  dist[startId] = 0;
  pq.enqueue(startId, 0);

  const steps = [];

  while (!pq.isEmpty()) {
    const { node: current, dist: currentDist } = pq.dequeue();

    // Skip if already settled with better distance
    if (visited.has(current)) continue;
    visited.add(current);

    // Record this step (node settled / extracted)
    steps.push({
      current,
      pq: pq.getContent().map(item => ({ node: item.node, dist: item.dist })),
      dist: { ...dist },
      prev: { ...prev }
    });

    // Relax neighbors
    const neighbors = adj.get(current) || [];
    for (const { to, weight } of neighbors) {
      if (visited.has(to)) continue;

      const newDist = currentDist + weight;
      if (newDist < dist[to]) {
        dist[to] = newDist;
        prev[to] = current;

        // In real Dijkstra we'd decrease-key, here we just insert duplicate
        pq.enqueue(to, newDist);

        // Record relaxation step (optional but nice for animation)
        steps.push({
          current: to, // highlight the relaxed neighbor
          pq: pq.getContent().map(item => ({ node: item.node, dist: item.dist })),
          dist: { ...dist },
          prev: { ...prev }
        });
      }
    }
  }

  return {
    steps,
    dist,   // final distances
    prev    // final previous nodes (for path reconstruction if you want)
  };
}