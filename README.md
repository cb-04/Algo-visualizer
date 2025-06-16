# Sorting & Graph Algorithms Visualizer

Welcome to the **Sorting & Graph Algorithms Visualizer** – an interactive, intuitive, and animated web app built with **React**. Designed for learners and enthusiasts alike, this visualizer lets you explore classic sorting and graph traversal algorithms in a hands-on, animated way.

---

##  Features

###  Sorting Visualizer

* **Blocks with Numbers:** Rounded, animated number blocks.
* **Supported Algorithms:**

  * Bubble Sort
  * Insertion Sort
  * Selection Sort
  * Merge Sort (with animated splitting & merging )
* **Panel UI:**

  * Regenerate Array
  * Sort Buttons
* **Dynamic Animations:**

  * Step-by-step swapping & merging
  * Color-coded transitions

<p align="center">
  <img src="src/Sorting%20ScreenShot.png" width="700" height="400" />
  <br />
  <em>Figure 1: Sorting visualizer (Merge Sort)</em>
</p>


###  Graph Visualizer

* **Node Creation:** Click anywhere to place a node.
* **Edge Drawing:** Click two nodes and enter a weight. Supports negative weights!
* **Directed/Undirected Toggle**
* **Node Deletion:** Shift + Click to delete nodes
* **Start Node Selection:** From a dropdown menu
* **Supported Algorithms:**

  * Depth-First Search (DFS)
  * Breadth-First Search (BFS)
  * Dijkstra’s Algorithm
  * Bellman-Ford Algorithm (with negative cycle detection)
* **Animated Traversals:**

  * Highlighted visited nodes
  * Distance labels for Dijkstra and Bellman-Ford
 
 <p align="center">
  <img src="src/Graph%20ScreenShot.png" width="700" height="400" />
  <br />
  <em>Figure 2: Graph algo visualizer</em>
</p>

---

##  Tech Stack

* **React** (Frontend)
* **CSS Modules**
* **Functional Components & Hooks** (useState, useEffect)

---

##  Project Structure (Simplified)

```
├── components
│   ├── GraphVisualizer.jsx
│   ├── SortingVisualizer.jsx
├── algorithms
│   ├── dfs.js
│   ├── bfs.js
│   ├── dijkstra.js
│   ├── bellmanFord.js
│   ├── bubbleSort.js
│   ├── insertionSort.js
│   ├── selectionSort.js
│   └── mergeSort.js
├── pages
│   ├── GraphPage.jsx
│   └── SortingPage.jsx
├── styles
│   ├── GraphVisualizer.css
│   └── SortingVisualizer.css
```

---

##  Try It Out

1. Clone this repo
2. Run:

   ```bash
   npm install
   npm start
   ```
3. Open `localhost:3000` in your browser
4. Play with sorting and graph building!


---

> "An algorithm must be seen to be believed." – Donald Knuth

