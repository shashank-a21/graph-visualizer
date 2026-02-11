export default function Controls() {
  return (
    <div className="w-64 bg-gray-800 p-4 border-r border-gray-700">
      <h2 className="text-lg font-semibold mb-4">Algorithms</h2>

      <button className="w-full bg-blue-600 p-2 mb-2 rounded hover:bg-blue-700">
        Run BFS
      </button>

      <button className="w-full bg-green-600 p-2 mb-2 rounded hover:bg-green-700">
        Run DFS
      </button>

      <button className="w-full bg-purple-600 p-2 mb-2 rounded hover:bg-purple-700">
        Run Dijkstra
      </button>

      <button className="w-full bg-red-600 p-2 mt-4 rounded hover:bg-red-700">
        Reset
      </button>
    </div>
  );
}