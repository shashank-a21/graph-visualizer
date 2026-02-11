import { useState } from "react";
import { bfs, bfsFullGraph } from "../algorithms/bfs";

export default function GraphCanvas() {

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const [visitedOrder, setVisitedOrder] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [queueState, setQueueState] = useState([]);
  const [visitedSoFar, setVisitedSoFar] = useState([]);
  const [currentComponent, setCurrentComponent] = useState(-1);
  const [speed, setSpeed] = useState(800);

  const handleCanvasClick = (e) => {
    if (e.target !== e.currentTarget) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newNode = {
      id: nodes.length,
      x,
      y
    };

    setNodes([...nodes, newNode]);
  };

  const handleNodeClick = (nodeId) => {
    if (selectedNode === null) {
      setSelectedNode(nodeId);
    } else if (selectedNode !== nodeId) {
      const newEdge = { from: selectedNode, to: nodeId };
      setEdges([...edges, newEdge]);
      setSelectedNode(null);
    }
  };

  const runBFS = () => {
  if (nodes.length === 0) return;

  setVisitedSoFar([]);
  setQueueState([]);
  setCurrentStep(-1);

  const steps = bfs(0, nodes, edges);
  setVisitedOrder(steps);

  let stepIndex = 0;

  const interval = setInterval(() => {

    if (stepIndex >= steps.length) {
      clearInterval(interval);
      return;
    }

    const step = steps[stepIndex];

    if (!step) {
      clearInterval(interval);
      return;
    }

    setCurrentStep(stepIndex);
    setQueueState(step.queue || []);

    setVisitedSoFar(prev => [
      ...prev,
      step.current
    ]);

    stepIndex++;

  }, speed);
};

    const runFullBFS = () => {

  if (nodes.length === 0) return;

  setVisitedSoFar([]);
  setQueueState([]);
  setCurrentStep(-1);

  const steps = bfsFullGraph(nodes, edges);
  setVisitedOrder(steps);

  let stepIndex = 0;
  let componentIndex = -1;
  let lastComponentStart = null;

  const interval = setInterval(() => {

    if (stepIndex >= steps.length) {
      clearInterval(interval);
      return;
    }

    const step = steps[stepIndex];

    // If new component starts
    if (step.componentStart !== lastComponentStart) {
      componentIndex++;
      lastComponentStart = step.componentStart;

      setVisitedSoFar(prev => [
        ...prev,
        []
      ]);
    }

    setQueueState(step.queue || []);
    setCurrentStep(stepIndex);

    setVisitedSoFar(prev => {
      const updated = [...prev];
      updated[componentIndex] = [
        ...updated[componentIndex],
        step.current
      ];
      return updated;
    });

    stepIndex++;

  }, speed);
};

  const currentVisitedNode =
  visitedOrder[currentStep]?.current;

  return (
    <div
      className="flex-1 bg-gray-950 relative cursor-pointer"
      onClick={handleCanvasClick}
    >

      {/* Draw Edges */}
      <svg className="absolute w-full h-full pointer-events-none">
        {edges.map((edge, index) => {
          const fromNode = nodes.find(n => n.id === edge.from);
          const toNode = nodes.find(n => n.id === edge.to);

          if (!fromNode || !toNode) return null;

          return (
            <line
              key={index}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="white"
              strokeWidth="2"
            />
          );
        })}
      </svg>

      {/* Draw Nodes */}
      {nodes.map((node) => (
        <div
          key={node.id}
          onClick={() => handleNodeClick(node.id)}
          className={`absolute w-10 h-10 rounded-full flex items-center justify-center font-bold cursor-pointer
            ${
                currentVisitedNode === node.id
                ? "bg-green-500 text-white"
                : selectedNode === node.id
                ? "bg-red-500"
                : "bg-yellow-400 text-black"
            }
            `}
          style={{
            left: node.x - 20,
            top: node.y - 20
          }}
        >
          {node.id}
        </div>
      ))}

      {/* Run Button */}
      <button
        onClick={runBFS}
        className="absolute bottom-5 right-5 bg-blue-600 px-4 py-2 rounded"
      >
        Run BFS
      </button>

        <button
    onClick={runFullBFS}
    className="absolute bottom-5 right-32 bg-purple-600 px-4 py-2 rounded"
    >
    Run Full BFS
    </button>

      {/* Speed Control */}
      <div className="absolute bottom-20 right-5 bg-gray-800 p-3 rounded text-sm">
        <label>Speed (ms)</label>
        <input
          type="range"
          min="200"
          max="2000"
          step="200"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-full"
        />
        <div>{speed} ms</div>
      </div>

      {/* Visited Display */}
    <div className="absolute bottom-32 left-5 bg-gray-800 p-3 rounded text-sm">
  <div className="font-bold mb-1">Visited:</div>

  {visitedSoFar.length === 0 ? (
    <div>None</div>
  ) : (
    visitedSoFar.map((component, index) => (
      <div key={index}>
        {component.join(" → ")}
      </div>
    ))
  )}
</div>

      {/* Queue Display */}
      <div className="absolute bottom-5 left-5 bg-gray-800 p-3 rounded text-sm">
        <div className="font-bold mb-1">Queue:</div>
        <div>{queueState.join(" , ") || "Empty"}</div>
      </div>

    </div>
  );
}