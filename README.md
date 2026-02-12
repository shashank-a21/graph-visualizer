# 🚀 Graph Algorithm Visualizer

An interactive **Graph Algorithm Visualizer** built using **React (Vite)** and **Tailwind CSS** that demonstrates core graph algorithms with real-time animation and dynamic visualization.

This project combines fundamental **Data Structures & Algorithms** with modern frontend architecture to create a powerful educational and visualization tool.

---

## 🌟 Features

### 🔵 Dynamic Graph Creation
- Click on the canvas to create nodes
- Connect nodes by selecting two nodes
- Adjustable **edge weights**
- Graph stored internally using an adjacency list
- Full graph reset functionality

---

## 🔎 Algorithms Implemented

### 1️⃣ Breadth-First Search (BFS)
- Multi-component traversal
- Automatic detection of disconnected components
- Live **Queue visualization**
- Step-by-step animated traversal
- Time Complexity: **O(V + E)**

---

### 2️⃣ Depth-First Search (DFS)
- Multi-component traversal
- Live **Stack visualization**
- Recursive implementation
- Animated full graph traversal
- Time Complexity: **O(V + E)**

---

### 3️⃣ Dijkstra’s Algorithm (Weighted Graph)
- Supports weighted edges
- Live **Priority Queue visualization**
- Real-time distance updates
- Parent tracking for path reconstruction
- Automatic shortest path highlighting (nodes + edges)
- Time Complexity: **O((V + E) log V)**

---

## 🎨 Visualization Features

- Current node highlighting
- Stack / Queue / Priority Queue display panel
- Component-wise visited grouping
- Distance table for Dijkstra
- Adjustable animation speed
- Shortest path highlighting
- Sidebar-based control panel
- Full graph reset functionality

---

## 🏗️ Project Architecture

```
src/
 ├── components/
 │   ├── GraphCanvas.jsx   → Rendering & Animation Logic
 │   └── Controls.jsx      → Sidebar Controls
 ├── algorithms/
 │   ├── bfs.js
 │   ├── dfs.js
 │   └── dijkstra.js
 ├── App.jsx               → Central State Management
 └── main.jsx
```

### Architecture Flow

Controls → App → GraphCanvas

- `Controls` manages user interaction
- `App` holds global state (algorithm, speed, signals)
- `GraphCanvas` handles rendering and animation
- Algorithm files contain pure logic independent from UI

---

## ⚙️ How It Works

1. Graph is stored using an **Adjacency List**.
2. Selected algorithm generates traversal steps.
3. Steps are stored in React state.
4. `setInterval` animates each step.
5. UI re-renders dynamically based on the current step.
6. For Dijkstra, shortest path is reconstructed and highlighted after completion.

---

## 🛠️ Tech Stack

- React (Vite)
- Tailwind CSS
- JavaScript (ES6+)
- SVG for edge rendering
- Git & GitHub

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
- BFS & DFS Traversal
- Connected Component Detection
- Dijkstra’s Shortest Path Algorithm
- Priority Queue Handling
- React State Management
- Controlled Animation Systems
- UI / Logic Separation

---

## 🔮 Future Enhancements

- Directed / Undirected graph toggle
- Manual step-by-step mode
- Drag-and-drop nodes
- Edge editing
- Graph import/export
- Deployment with live demo

---

## 👨‍💻 Author

**Shashank Anand**