import Controls from "./components/Controls";
import GraphCanvas from "./components/GraphCanvas";

export default function App() {
  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      
      <header className="p-4 text-xl font-bold text-center border-b border-gray-700">
        Smart Graph Visualizer 🚀
      </header>

      <div className="flex flex-1">
        <Controls />
        <GraphCanvas />
      </div>

    </div>
  );
}