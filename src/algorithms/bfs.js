export function bfs(startNode, nodes, edges) {

  const adjList = {};

  nodes.forEach(node => {
    adjList[node.id] = [];
  });

  edges.forEach(edge => {
    adjList[edge.from].push(edge.to);
    adjList[edge.to].push(edge.from);
  });

  const visited = new Set();
  const queue = [];
  const steps = [];

  queue.push(startNode);
  visited.add(startNode);

  while (queue.length > 0) {

    const current = queue.shift();

    steps.push({
      current,
      queue: [...queue]
    });

    adjList[current].forEach(neighbor => {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    });
  }

  return steps;
}
export function bfsFullGraph(nodes, edges) {

  const adjList = {};

  nodes.forEach(node => {
    adjList[node.id] = [];
  });

  edges.forEach(edge => {
    adjList[edge.from].push(edge.to);
    adjList[edge.to].push(edge.from);
  });

  const visited = new Set();
  const steps = [];

  for (let node of nodes) {

    if (!visited.has(node.id)) {

      const queue = [];
      queue.push(node.id);
      visited.add(node.id);

      while (queue.length > 0) {

        const current = queue.shift();

        steps.push({
          current,
          queue: [...queue],
          componentStart: node.id
        });

        adjList[current].forEach(neighbor => {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
          }
        });
      }
    }
  }

  return steps;
}