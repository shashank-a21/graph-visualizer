# 🚀 Graph Algorithm Visualizer

An interactive **Graph Algorithm Visualizer** built using **React (Vite) and Tailwind CSS** that demonstrates Breadth-First Search (BFS) traversal with real-time animation, queue visualization, and connected component detection.

This project focuses on combining core data structures and algorithms with modern frontend architecture to create an educational visualization tool.

---

## 🌟 Features

### 🔵 Dynamic Graph Creation
- Click on the canvas to create nodes
- Connect nodes by selecting two nodes
- Graph stored internally using an adjacency list

### ▶️ Single Source BFS
- Executes Breadth-First Search from node `0`
- Step-by-step animated traversal
- Currently visiting node highlighted
- Live queue visualization

### 🌐 Full Graph BFS (Disconnected Graph Support)
- Traverses all connected components
- Automatically detects new components
- Displays visited nodes grouped by component

### ⚡ Adjustable Animation Speed
- Real-time speed control
- Smooth, state-driven animation updates

---

## 🧠 Algorithms Implemented

### 1️⃣ Breadth-First Search (BFS)

- Uses Queue (FIFO)
- Level-by-level traversal
- Guarantees shortest path in unweighted graphs
- Time Complexity: **O(V + E)**

### 2️⃣ Full Graph BFS

- Iterates over all nodes
- Runs BFS on unvisited nodes
- Detects connected components automatically
- Time Complexity: **O(V + E)**

---

## 🏗️ Project Architecture

```
src/
 ├── components/
 │   ├── GraphCanvas.jsx   → UI & Animation Logic
 │   └── Controls.jsx      → Interaction Controls
 ├── algorithms/
 │   └── bfs.js            → Pure Graph Logic
 ├── App.jsx
 └── main.jsx
```

### 🔹 Algorithm Layer
- Contains pure traversal logic
- Independent from UI
- Easily extendable (DFS, Dijkstra)

### 🔹 UI Layer
- Handles animation using `setInterval`
- State-driven rendering via React
- Defensive checks to prevent runtime crashes

---

## ⚙️ How It Works

1. Graph is stored using an **Adjacency List**.
2. BFS generates traversal steps.
3. Steps are stored in React state.
4. `setInterval` animates each step.
5. UI re-renders dynamically based on the current step.

---

## 🛠️ Tech Stack

- React (Vite)
- Tailwind CSS
- JavaScript (ES6+)
- SVG for edge rendering
- Git & GitHub for version control

---

## 🚀 Run Locally

```bash
git clone https://github.com/shashank-a21/graph-visualizer.git
cd graph-visualizer
npm install
npm run dev
```

Open in browser:

```
http://localhost:5173
```

---

## 📚 Concepts Demonstrated

- Graph Data Structures
- Adjacency List Representation
- Breadth-First Search
- Connected Component Detection
- Queue Implementation
- React State Management
- Controlled Animation
- Defensive Programming

---

## 🔮 Future Enhancements

- Depth-First Search (DFS)
- Dijkstra’s Algorithm (Weighted Graphs)
- Start Node Selection
- Directed Graph Support
- Drag-and-Drop Nodes
- Deployment with Live Demo

---

## 👨‍💻 Author

**Shashank Anand**