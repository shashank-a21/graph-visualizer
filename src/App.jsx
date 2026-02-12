import { useState } from "react";
import GraphCanvas from "./components/GraphCanvas";
import Controls from "./components/Controls";

export default function App() {
  const [algorithm, setAlgorithm] = useState("bfs");
  const [speed, setSpeed] = useState(800);
  const [runSignal, setRunSignal] = useState(0);
  const [resetSignal, setResetSignal] = useState(0);
  const [edgeWeight, setEdgeWeight] = useState(1);

  const handleRun = () => {
    setRunSignal(prev => prev + 1);
  };

  const handleReset = () => {
    setResetSignal(prev => prev + 1);
  };

  return (
    <div className="flex h-screen bg-gray-950 text-white">
      <Controls
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        onRun={handleRun}
        onReset={handleReset}
        speed={speed}
        setSpeed={setSpeed}
        edgeWeight={edgeWeight}
        setEdgeWeight={setEdgeWeight}
      />
      <GraphCanvas
        algorithm={algorithm}
        speed={speed}
        runSignal={runSignal}
        resetSignal={resetSignal}
        newEdgeWeight={edgeWeight}
      />
    </div>
  );
}