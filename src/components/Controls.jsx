export default function Controls({
  algorithm,
  setAlgorithm,
  onRun,
  onReset,
  speed,
  setSpeed,
  edgeWeight,
  setEdgeWeight
}) {
  return (
    <div className="w-64 bg-gray-900 p-5 border-r border-gray-700 flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-white">
        Algorithms
      </h2>

      <select
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
        className="bg-gray-800 text-white p-2 rounded border border-gray-600"
      >
        <option value="bfs">BFS</option>
        <option value="dfs">DFS</option>
        <option value="dijkstra">Dijkstra</option>
      </select>

      <div className="flex flex-col text-sm">
  <label>Edge Weight</label>
  <input
    type="number"
    min="1"
    value={edgeWeight}
    onChange={(e) => setEdgeWeight(Number(e.target.value))}
    className="bg-gray-800 border border-gray-600 rounded p-1"
  />
</div>

      <button
        onClick={onRun}
        className="bg-indigo-600 p-2 rounded hover:bg-indigo-700"
      >
        Run
      </button>

      <button
        onClick={onReset}
        className="bg-red-600 p-2 rounded hover:bg-red-700"
      >
        Reset
      </button>

      <div>
        <label>Speed: {speed} ms</label>
        <input
          type="range"
          min="200"
          max="2000"
          step="200"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
      </div>
    </div>
  );
}