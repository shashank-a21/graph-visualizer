import { useState, useRef, useEffect } from "react";
import { bfsFullGraph } from "../algorithms/bfs";
import { dfsFullGraph } from "../algorithms/dfs";
import { dijkstra } from "../algorithms/dijkstra";

export default function GraphCanvas() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [newEdgeWeight, setNewEdgeWeight] = useState(1);

  const [visitedOrder, setVisitedOrder] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [stackOrQueue, setStackOrQueue] = useState([]);
  const [visitedSoFar, setVisitedSoFar] = useState([]);
  const [distances, setDistances] = useState({});
  const [parents, setParents] = useState({});
  const [algorithm, setAlgorithm] = useState("bfs");
  const [speed, setSpeed] = useState(800);

  const intervalRef = useRef(null);
  const [shortestPath, setShortestPath] = useState([]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const resetVisualization = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setVisitedOrder([]);
    setVisitedSoFar([]);
    setStackOrQueue([]);
    setCurrentStep(-1);
    setDistances({});
    setParents({});
    setShortestPath([]);
  };

  const clearGraph = () => {
    resetVisualization();
    setNodes([]);
    setEdges([]);
    setSelectedNode(null);
  };

  const handleCanvasClick = (e) => {
    if (e.target !== e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newId =
      nodes.length > 0
        ? Math.max(...nodes.map((n) => n.id)) + 1
        : 0;

    setNodes([...nodes, { id: newId, x, y }]);
  };

  const handleNodeClick = (nodeId) => {
    if (selectedNode === null) {
      setSelectedNode(nodeId);
    } else if (selectedNode !== nodeId) {
      const newEdge = {
        from: selectedNode,
        to: nodeId,
        weight: newEdgeWeight,
      };
      setEdges([...edges, newEdge]);
      setSelectedNode(null);
    }
  };

  const startVisualization = () => {
    resetVisualization();
    if (nodes.length === 0) return;

    let steps = [];

    if (algorithm === "bfs") {
      steps = bfsFullGraph(nodes, edges);
      animateMultiComponent(steps);
    } else if (algorithm === "dfs") {
      steps = dfsFullGraph(nodes, edges);
      animateMultiComponent(steps);
    } else if (algorithm === "dijkstra") {
      if (selectedNode === null) {
        alert("Select starting node first");
        return;
      }
      const result = dijkstra(selectedNode, nodes, edges);
      steps = result.steps;
      animateDijkstra(steps, result.dist, result.prev);
    }
  };

  const animateMultiComponent = (steps) => {
    setVisitedOrder(steps);
    setVisitedSoFar([]);

    let stepIndex = 0;
    let componentIndex = -1;
    let lastComponentStart = null;

    intervalRef.current = setInterval(() => {
      if (stepIndex >= steps.length) {
  clearInterval(intervalRef.current);
  intervalRef.current = null;

  setDistances(finalDist);
  setParents(finalPrev);

  // 🔥 Build shortest path from selectedNode
  const path = [];
  let current = selectedNode;

  while (current !== undefined && current !== null) {
    path.unshift(current);
    current = finalPrev[current];
  }

  setShortestPath(path);
  return;
}

      const step = steps[stepIndex];

      if (step.componentStart !== lastComponentStart) {
        componentIndex++;
        lastComponentStart = step.componentStart;
        setVisitedSoFar((prev) => [...prev, []]);
      }

      setCurrentStep(stepIndex);
      setStackOrQueue(step.stack || step.queue || []);

      setVisitedSoFar((prev) => {
        const updated = [...prev];
        updated[componentIndex] = [
          ...(updated[componentIndex] || []),
          step.current,
        ];
        return updated;
      });

      stepIndex++;
    }, speed);
  };

const animateDijkstra = (steps, finalDist, finalPrev) => {
  setVisitedOrder(steps);
  setDistances({});
  setParents({});
  setShortestPath([]);   // clear previous path

  let stepIndex = 0;

  intervalRef.current = setInterval(() => {
    if (stepIndex >= steps.length) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;

      // Set final results
      setDistances(finalDist);
      setParents(finalPrev);

      // 🔥 Find a valid target (farthest reachable node)
      let target = null;
      let maxDist = -1;

      for (let node in finalDist) {
        if (
          finalDist[node] !== Infinity &&
          finalDist[node] > maxDist
        ) {
          maxDist = finalDist[node];
          target = Number(node);
        }
      }

      // 🔥 Reconstruct shortest path
      const path = [];
      let current = target;

      while (current !== undefined && current !== null) {
        path.unshift(current);
        current = finalPrev[current];
      }

      setShortestPath(path);
      return;
    }

    const step = steps[stepIndex];

    setCurrentStep(stepIndex);
    setStackOrQueue(step.pq || []);
    setDistances(step.dist || {});
    setParents(step.prev || {});

    stepIndex++;
  }, speed);
};

  const currentNode =
    currentStep >= 0 && currentStep < visitedOrder.length
      ? visitedOrder[currentStep].current
      : null;

  const getNodeStyle = (nodeId) => {
    const isVisited = visitedSoFar.flat().includes(nodeId);
    const isCurrent = currentNode === nodeId;
    if (shortestPath.includes(nodeId)) {
  return "bg-blue-600 text-white ring-4 ring-blue-300";
}
    const isInFrontier = stackOrQueue.some((item) =>
      typeof item === "number"
        ? item === nodeId
        : item.node === nodeId
    );

    if (isCurrent)
      return "bg-green-600 text-white ring-4 ring-green-300";
    if (isVisited)
      return "bg-emerald-700 text-white";
    if (isInFrontier)
      return "bg-yellow-500 text-black border-4 border-orange-400";
    if (selectedNode === nodeId)
      return "bg-red-600 text-white ring-2 ring-red-300";

    return "bg-yellow-400 text-black hover:bg-yellow-300";
  };

  return (
    <div
      className="flex-1 bg-gray-950 relative cursor-pointer overflow-hidden"
      onClick={handleCanvasClick}
    >
      {/* Info Panels Container */}
<div className="absolute bottom-6 left-6 flex flex-col gap-4">
  
  {/* Visited / Distances */}
  <div className="bg-gray-800/90 backdrop-blur-sm p-4 rounded-xl text-sm border border-gray-700 min-w-[220px] max-h-[200px] overflow-y-auto">
    <div className="font-bold mb-2">
      {algorithm === "dijkstra" ? "Distances" : "Visited"}
    </div>

    {algorithm === "dijkstra" ? (
      Object.entries(distances).map(([id, dist]) => (
        <div key={id} className="flex justify-between">
          <span>Node {id}:</span>
          <span>{dist === Infinity ? "∞" : dist}</span>
        </div>
      ))
    ) : visitedSoFar.length === 0 ? (
      <div className="text-gray-400">—</div>
    ) : (
      visitedSoFar.map((comp, i) => (
        <div key={i}>{comp.join(" → ")}</div>
      ))
    )}
  </div>

  {/* Stack / Queue */}
  <div className="bg-gray-800/90 backdrop-blur-sm p-4 rounded-xl text-sm border border-gray-700 min-w-[220px] max-h-[200px] overflow-y-auto">
    <div className="font-bold mb-2">
      {algorithm === "dfs"
        ? "Stack"
        : algorithm === "dijkstra"
        ? "Priority Queue"
        : "Queue"}
    </div>

    <div className="text-gray-200">
      {stackOrQueue.length === 0
        ? "Empty"
        : algorithm === "dijkstra"
        ? stackOrQueue
            .map((item) => `(${item.dist}, ${item.node})`)
            .join("  ")
        : stackOrQueue.join(" ← ")}
    </div>
  </div>

</div>

      {/* Edges with weights */}
<svg className="absolute inset-0 w-full h-full pointer-events-none">
  {edges.map((edge, i) => {
    const from = nodes.find((n) => n.id === edge.from);
    const to = nodes.find((n) => n.id === edge.to);
    if (!from || !to) return null;

    return (
      <g key={i}>
        <line
          x1={from.x}
          y1={from.y}
          x2={to.x}
          y2={to.y}
          stroke={
  shortestPath.includes(edge.from) &&
  shortestPath.includes(edge.to)
    ? "#3b82f6"
    : "#64748b"
}
          strokeWidth="2"
        />
        <text
          x={(from.x + to.x) / 2}
          y={(from.y + to.y) / 2 - 8}
          fill="#94a3b8"
          fontSize="12"
          textAnchor="middle"
        >
          {edge.weight}
        </text>
      </g>
    );
  })}
</svg>
      {/* Nodes */}
      {nodes.map((node) => (
        <div
          key={node.id}
          onClick={(e) => {
            e.stopPropagation();
            handleNodeClick(node.id);
          }}
          className={`absolute w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg transition-all duration-150 ${getNodeStyle(
            node.id
          )}`}
          style={{
            left: `${node.x - 24}px`,
            top: `${node.y - 24}px`,
          }}
        >
          {node.id}
        </div>
      ))}

      {/* Controls */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-3 bg-gray-900/80 p-4 rounded-xl border border-gray-700">
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          className="bg-gray-800 text-white px-3 py-2 rounded border border-gray-600"
        >
          <option value="bfs">BFS</option>
          <option value="dfs">DFS</option>
          <option value="dijkstra">Dijkstra</option>
        </select>

        <button
          onClick={startVisualization}
          className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 rounded-lg"
        >
          Run
        </button>

        <button
          onClick={clearGraph}
          className="bg-red-600 hover:bg-red-700 px-5 py-2.5 rounded-lg"
        >
          Clear Graph
        </button>

        <div className="text-sm">
          <label>Speed: {speed} ms</label>
          <input
            type="range"
            min="200"
            max="2000"
            step="200"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}