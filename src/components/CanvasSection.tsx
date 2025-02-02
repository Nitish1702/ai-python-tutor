"use client";
import { RootState } from "@/store/store";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function CanvasSection() {
  const [canvasCode, setCanvasCode] = useState(""); // State to hold the canvas code
  const [loading, setLoading] = useState(false);
  const [topicChanged, setTopicChanged] = useState(false); // Flag to trigger re-fetching when topic changes
//   const [isDarkMode, setIsDarkMode] = useState(true); // State for dark mode toggle

  const iframeRef = useRef<HTMLIFrameElement | null>(null); // Reference for the iframe element
  const topic = useSelector((state: RootState) => state.topic.selectedTopic);
  const isDarkMode = useSelector((state: RootState) => state.dashboard.isDarkMode);

  // Function to update canvas code by asking AI to generate code for the canvas visualization
  async function fetchCanvasCode() {
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `create a html canvas code to visualize demonstration of ${topic}

for example: for (An operating system (OS) is a system software that manages computer hardware and software resources and provides common services for computer programs. It's the fundamental software that makes a computer usable. Think of it as the intermediary between you (the user) and the computer's hardware.

Here's a breakdown of its key functions:

Hardware Management: The OS controls and manages all the computer's hardware components, including:

Processor (CPU): Scheduling tasks and allocating processing time.
Memory (RAM): Allocating and managing RAM for running programs.
Storage Devices (Hard drives, SSDs): Managing file systems, organizing data, and handling storage access.
Input/Output Devices (Keyboard, mouse, printer, etc.): Handling input and output operations.
Software Management: The OS provides an environment for running applications and handles their interactions with hardware:

Process Management: Creating, scheduling, and terminating processes (running programs).
Memory Management: Allocating and deallocating memory to processes.
File Management: Creating, deleting, and managing files and directories.
Security: Providing security features like user accounts, passwords, and access control.
User Interface (UI): The OS provides a way for users to interact with the computer:

Command-line interface (CLI): A text-based interface where users type commands.
Graphical user interface (GUI): A visual interface with windows, icons, and menus.
Examples of Operating Systems:

Microsoft Windows: Widely used on personal computers.
macOS: Apple's operating system for Macintosh computers.
Linux: A family of open-source operating systems used on a wide range of devices, from servers to embedded systems. Many popular distributions exist, such as Ubuntu, Fedora, and Debian.
Android: A mobile operating system based on Linux.
iOS: Apple's mobile operating system for iPhones and iPads.
Chrome OS: Google's operating system designed for Chromebooks.
The choice of operating system depends on factors like the type of computer, intended use, and user preference. Each OS has its own strengths and weaknesses, and the best OS for one person might not be the best for another.) the demonstration will be like-
 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Operating System Architecture Visualization</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 20px;
    }
    canvas {
      border: 1px solid black;
      background-color: #f0f0f0;
    }
  </style>
</head>
<body>
  <h1>Operating System Architecture Visualization</h1>
  <canvas id="osCanvas" width="800" height="600"></canvas>

  <script>
    // Define the OS Components as nodes
    const osComponents = {
      hardware: { name: "Hardware", x: 150, y: 100, width: 120, height: 80 },
      cpu: { name: "CPU", x: 150, y: 250, width: 120, height: 80 },
      memory: { name: "Memory (RAM)", x: 300, y: 250, width: 140, height: 80 },
      storage: { name: "Storage", x: 500, y: 250, width: 120, height: 80 },
      inputOutput: { name: "Input/Output", x: 150, y: 400, width: 160, height: 80 },
      software: { name: "Software Management", x: 300, y: 400, width: 180, height: 80 },
      ui: { name: "User Interface", x: 500, y: 400, width: 160, height: 80 },
    };

    // Create canvas and context
    const canvas = document.getElementById("osCanvas");
    const ctx = canvas.getContext("2d");

    // Set animation speed
    const animationSpeed = 0.05;

    // Function to draw a rectangle with text
    const drawRect = (x, y, width, height, text) => {
      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.fillStyle = "#4CAF50";
      ctx.fill();
      ctx.strokeStyle = "#333";
      ctx.stroke();

      ctx.fillStyle = "white";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, x + width / 2, y + height / 2);
    };

    // Function to draw lines (connections between components)
    const drawLine = (fromX, fromY, toX, toY) => {
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.strokeStyle = "#333";
      ctx.stroke();
    };

    // Draw OS components and their connections
    const drawOS = () => {
      // Draw components (rectangles)
      drawRect(osComponents.hardware.x, osComponents.hardware.y, osComponents.hardware.width, osComponents.hardware.height, osComponents.hardware.name);
      drawRect(osComponents.cpu.x, osComponents.cpu.y, osComponents.cpu.width, osComponents.cpu.height, osComponents.cpu.name);
      drawRect(osComponents.memory.x, osComponents.memory.y, osComponents.memory.width, osComponents.memory.height, osComponents.memory.name);
      drawRect(osComponents.storage.x, osComponents.storage.y, osComponents.storage.width, osComponents.storage.height, osComponents.storage.name);
      drawRect(osComponents.inputOutput.x, osComponents.inputOutput.y, osComponents.inputOutput.width, osComponents.inputOutput.height, osComponents.inputOutput.name);
      drawRect(osComponents.software.x, osComponents.software.y, osComponents.software.width, osComponents.software.height, osComponents.software.name);
      drawRect(osComponents.ui.x, osComponents.ui.y, osComponents.ui.width, osComponents.ui.height, osComponents.ui.name);

      // Draw connections (lines between components)
      drawLine(osComponents.hardware.x + osComponents.hardware.width / 2, osComponents.hardware.y + osComponents.hardware.height, osComponents.cpu.x + osComponents.cpu.width / 2, osComponents.cpu.y);
      drawLine(osComponents.hardware.x + osComponents.hardware.width / 2, osComponents.hardware.y + osComponents.hardware.height, osComponents.memory.x + osComponents.memory.width / 2, osComponents.memory.y);
      drawLine(osComponents.hardware.x + osComponents.hardware.width / 2, osComponents.hardware.y + osComponents.hardware.height, osComponents.storage.x + osComponents.storage.width / 2, osComponents.storage.y);
      drawLine(osComponents.hardware.x + osComponents.hardware.width / 2, osComponents.hardware.y + osComponents.hardware.height, osComponents.inputOutput.x + osComponents.inputOutput.width / 2, osComponents.inputOutput.y);

      drawLine(osComponents.cpu.x + osComponents.cpu.width / 2, osComponents.cpu.y + osComponents.cpu.height, osComponents.software.x + osComponents.software.width / 2, osComponents.software.y);
      drawLine(osComponents.memory.x + osComponents.memory.width / 2, osComponents.memory.y + osComponents.memory.height, osComponents.software.x + osComponents.software.width / 2, osComponents.software.y);
      drawLine(osComponents.storage.x + osComponents.storage.width / 2, osComponents.storage.y + osComponents.storage.height, osComponents.software.x + osComponents.software.width / 2, osComponents.software.y);

      drawLine(osComponents.software.x + osComponents.software.width / 2, osComponents.software.y + osComponents.software.height, osComponents.ui.x + osComponents.ui.width / 2, osComponents.ui.y);
    };

    // Main function to animate the OS visualization
    function animateOS() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

      drawOS(); // Draw the OS components and connections

      requestAnimationFrame(animateOS); // Keep animating the OS visualization
    }

    // Start the animation
    animateOS();

  </script>
</body>
</html>

example2- for( Stacks and queues are fundamental data structures in computer science, both used to store and manage collections of elements, but differing significantly in how those elements are accessed. Think of them as ways of organizing a line of people.

Stack:

Analogy: Imagine a stack of plates. You can only add a new plate to the top (push) and remove a plate from the top (pop). The last plate you added is the first one you remove (Last-In, First-Out, or LIFO).
Operations:
Push: Adds an element to the top of the stack.
Pop: Removes and returns the element at the top of the stack.
Peek (or Top): Returns the element at the top of the stack without removing it.
IsEmpty: Checks if the stack is empty.
Use Cases:
Function calls: Managing function calls in a program (the call stack). When a function calls another, the current state is pushed onto the stack. When the called function finishes, its state is popped, and execution resumes where it left off.
Undo/Redo functionality: Each action is pushed onto a stack. Undo pops the last action. Redo pushes it back.
Expression evaluation: Evaluating arithmetic expressions using postfix notation (reverse Polish notation).
Backtracking algorithms: Exploring different possibilities in a search algorithm, keeping track of the path taken.
Queue:

Analogy: Imagine a queue at a store. People join the queue at the back (enqueue) and leave from the front (dequeue). The first person to join is the first person to leave (First-In, First-Out, or FIFO).
Operations:
Enqueue: Adds an element to the rear (back) of the queue.
Dequeue: Removes and returns the element at the front of the queue.
Peek (or Front): Returns the element at the front of the queue without removing it.
IsEmpty: Checks if the queue is empty.
Use Cases:
Breadth-first search (BFS): Exploring a graph level by level.
Task scheduling: Managing tasks in a printer queue or operating system process scheduler.
Buffering: Storing data temporarily before processing.
Handling requests: Managing requests in a web server.
Key Differences Summarized:

| Feature | Stack | Queue | |---------------|---------------------------------------|------------------------------------------| | Access Order | LIFO (Last-In, First-Out) | FIFO (First-In, First-Out) | | Add Operation | Push | Enqueue | | Remove Operation| Pop | Dequeue | | Primary Use | Function calls, undo/redo, expression evaluation | BFS, task scheduling, buffering |

Both stacks and queues are abstract data types, meaning their implementation can vary (e.g., using arrays, linked lists). The key is their defined behavior regarding how elements are added and removed.
) demonstration will be like
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Stack & Queue Visualization</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 20px;
    }
    canvas {
      border: 1px solid black;
      background-color: #f0f0f0;
    }
    .controls {
      margin: 10px;
    }
    button {
      padding: 10px;
      margin: 5px;
      background-color: #4CAF50;
      color: white;
      border: none;
      cursor: pointer;
    }
    button:hover {
      background-color: #45a049;
    }
  </style>
</head>
<body>
  <h1>Stacks and Queues Visualization</h1>
  <canvas id="stackQueueCanvas" width="800" height="400"></canvas>
  <div class="controls">
    <button onclick="pushStack()">Push to Stack</button>
    <button onclick="popStack()">Pop from Stack</button>
    <button onclick="enqueueQueue()">Enqueue to Queue</button>
    <button onclick="dequeueQueue()">Dequeue from Queue</button>
  </div>

  <script>
    // Canvas setup
    const canvas = document.getElementById("stackQueueCanvas");
    const ctx = canvas.getContext("2d");

    // Stack and Queue data structures
    const stack = [];
    const queue = [];
    let stackY = 50;  // Y position for stack elements
    let queueY = 250; // Y position for queue elements

    // Function to draw stack and queue elements
    function drawStackAndQueue() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

      // Draw Stack
      ctx.fillStyle = "blue";
      for (let i = 0; i < stack.length; i++) {
        ctx.fillRect(100, stackY - i * 40, 60, 30);
        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(stack[i], 130, stackY - i * 40 + 15);
        ctx.fillStyle = "blue";
      }

      // Draw Queue
      ctx.fillStyle = "green";
      for (let i = 0; i < queue.length; i++) {
        ctx.fillRect(500, queueY + i * 40, 60, 30);
        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(queue[i], 530, queueY + i * 40 + 15);
        ctx.fillStyle = "green";
      }
    }

    // Functions to manipulate Stack
    function pushStack() {
      stack.push(\`Item \${stack.length + 1}\`);
      drawStackAndQueue();
    }

    function popStack() {
      if (stack.length > 0) {
        stack.pop();
        drawStackAndQueue();
      }
    }

    // Functions to manipulate Queue
    function enqueueQueue() {
      queue.push(\`Item \${queue.length + 1}\`);
      drawStackAndQueue();
    }

    function dequeueQueue() {
      if (queue.length > 0) {
        queue.shift();
        drawStackAndQueue();
      }
    }

    // Initial drawing
    drawStackAndQueue();
  </script>
</body>
</html>


example-3: for (The A* (A-star) algorithm is a graph traversal and path search algorithm, best known for its use in many fields requiring pathfinding, such as video games, robotics, and GPS navigation. It's a best-first search algorithm that finds a least-cost path from a given starting node to a given goal node. Its efficiency comes from using a heuristic function to guide its search.

Here's a breakdown of how A* works:

Key Components:

Graph: A* operates on a graph, where nodes represent locations (e.g., squares on a map) and edges represent connections between them (e.g., paths between squares). Each edge has a cost associated with traversing it (e.g., distance, time).

Start Node: The initial location.

Goal Node: The desired destination.

g(n): The cost of the path from the start node to the current node (n). This is the actual cost already incurred.

h(n): The heuristic function. This estimates the cost of the cheapest path from the current node (n) to the goal node. It's crucial that this heuristic is admissible (never overestimates the actual cost) and consistent (the estimated cost from A to B plus the estimated cost from B to C is always greater than or equal to the estimated cost from A to C directly). Common heuristics include Manhattan distance and Euclidean distance.

f(n): The total estimated cost of the path through node n to the goal. This is calculated as: f(n) = g(n) + h(n). A* selects the node with the lowest f(n) value to explore next.

Algorithm Steps:

Initialization:

Place the start node in the open set (a set of nodes to be evaluated).
Set the g(start) to 0 and f(start) to h(start).
Iteration: While the open set is not empty:

Find the node in the open set with the lowest f(n) value. Let's call this node current.
If current is the goal node, reconstruct the path by backtracking from the goal node to the start node using the parent pointers (explained below) and return the path.
Remove current from the open set and add it to the closed set (a set of nodes already evaluated).
For each neighbor of current:
Calculate g(neighbor) = g(current) + cost(current, neighbor).
If neighbor is already in the closed set, ignore it.
If neighbor is not in the open set, add it to the open set. Set its parent to current. Calculate f(neighbor) = g(neighbor) + h(neighbor).
If neighbor is already in the open set, check if the new path to neighbor (via current) is shorter than the existing path. If it is, update g(neighbor), f(neighbor), and set its parent to current.
No Path Found: If the open set becomes empty without finding the goal node, there is no path from the start node to the goal node.

Parent Pointers: During the algorithm, each node keeps track of its parent node—the node from which it was reached. This allows for easy path reconstruction once the goal node is found. You simply follow the parent pointers back from the goal to the start.

Example (Simplified):

Imagine a grid-based map. The heuristic h(n) might be the Manhattan distance (the sum of the horizontal and vertical distances) to the goal. A* would explore nodes closest to the goal first, guided by the heuristic, but it would still ensure it finds the least-cost path by considering the actual costs (g(n)) along the way.

Advantages of A:*

Optimal: If the heuristic is admissible and consistent, A* is guaranteed to find the optimal (least-cost) path.
Complete: If a path exists, A* will find it (unless the search space is infinite).
Efficient: Its use of a heuristic makes it significantly faster than uninformed search algorithms like Breadth-First Search.
Disadvantages of A:*

Memory intensive: The open set can grow large, especially in complex graphs.
Heuristic design: The effectiveness of A* heavily depends on the quality of the heuristic function. A poorly chosen heuristic can lead to inefficient searches.
A* is a powerful and widely used algorithm because of its balance between optimality, completeness, and efficiency. Its success depends on choosing a good heuristic that accurately reflects the cost to the goal.) the demonstration will be:
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>A* Algorithm Visualization</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 20px;
    }
    canvas {
      border: 1px solid black;
      background-color: #f0f0f0;
    }
    button {
      padding: 10px;
      margin: 5px;
      background-color: #4CAF50;
      color: white;
      border: none;
      cursor: pointer;
    }
    button:hover {
      background-color: #45a049;
    }
  </style>
</head>
<body>
  <h1>A* Algorithm Visualization</h1>
  <canvas id="aStarCanvas" width="600" height="600"></canvas>
  <div>
    <button onclick="startAStar()">Start A* Algorithm</button>
  </div>

  <script>
    const canvas = document.getElementById('aStarCanvas');
    const ctx = canvas.getContext('2d');
    
    const gridSize = 20; // Grid size (20x20 grid)
    const cols = canvas.width / gridSize;
    const rows = canvas.height / gridSize;
    
    // Node class to represent each cell
    class Node {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.g = Infinity; // Cost from start node
        this.h = Infinity; // Heuristic cost to goal node
        this.f = Infinity; // Total cost f = g + h
        this.neighbors = [];
        this.wall = Math.random() < 0.3; // Random walls (30% of the grid)
        this.parent = null;
      }

      addNeighbors(grid) {
        const { x, y } = this;
        if (x > 0) this.neighbors.push(grid[y][x - 1]);
        if (x < cols - 1) this.neighbors.push(grid[y][x + 1]);
        if (y > 0) this.neighbors.push(grid[y - 1][x]);
        if (y < rows - 1) this.neighbors.push(grid[y + 1][x]);
      }
    }

    // Initialize grid with nodes
    const grid = [];
    for (let y = 0; y < rows; y++) {
      const row = [];
      for (let x = 0; x < cols; x++) {
        row.push(new Node(x, y));
      }
      grid.push(row);
    }

    // Setting neighbors for each node
    grid.forEach(row => row.forEach(node => node.addNeighbors(grid)));

    let openSet = [];
    let closedSet = [];
    let startNode, endNode;
    let path = [];
    let step = 0;

    // Initialize start and end nodes
    function initializeStartEnd() {
      startNode = grid[1][1]; // Start at (1, 1)
      endNode = grid[cols - 2][rows - 2]; // End at (cols-2, rows-2)
      startNode.g = 0;
      startNode.h = heuristic(startNode, endNode);
      startNode.f = startNode.g + startNode.h;
      openSet.push(startNode);
    }

    // Heuristic function (Manhattan distance)
    function heuristic(a, b) {
      return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    // A* Algorithm visualization step-by-step
    function startAStar() {
      initializeStartEnd();
      openSet = [startNode]; // Start from the initial node
      closedSet = [];
      path = [];
      step = 0;
      animate();
    }

    // Visualize the grid and algorithm
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid and walls
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const node = grid[y][x];
          if (node.wall) {
            ctx.fillStyle = '#000';
            ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
          }
          if (node === startNode) {
            ctx.fillStyle = '#00FF00';
            ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
          } else if (node === endNode) {
            ctx.fillStyle = '#FF0000';
            ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
          } else if (closedSet.includes(node)) {
            ctx.fillStyle = '#FF6347'; // Closed set (visited nodes)
            ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
          } else if (openSet.includes(node)) {
            ctx.fillStyle = '#FFFF00'; // Open set (nodes to be evaluated)
            ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
          } else if (path.includes(node)) {
            ctx.fillStyle = '#00FFFF'; // Path (solution)
            ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
          }
          ctx.strokeStyle = '#888';
          ctx.strokeRect(x * gridSize, y * gridSize, gridSize, gridSize);
        }
      }
    }

    // A* algorithm logic (one step per frame)
    function animate() {
      if (openSet.length > 0) {
        // Pick the node with the lowest f value
        let current = openSet.reduce((prev, curr) => prev.f < curr.f ? prev : curr);

        // Check if we've reached the end node
        if (current === endNode) {
          // Reconstruct path
          let temp = current;
          while (temp.parent) {
            path.push(temp);
            temp = temp.parent;
          }
          path.reverse();
          draw();
          return;
        }

        // Move current node from openSet to closedSet
        openSet = openSet.filter(node => node !== current);
        closedSet.push(current);

        // Check neighbors
        current.neighbors.forEach(neighbor => {
          if (!closedSet.includes(neighbor) && !neighbor.wall) {
            let tentativeG = current.g + 1;

            if (!openSet.includes(neighbor)) {
              openSet.push(neighbor);
            } else if (tentativeG >= neighbor.g) {
              return;
            }

            // This is the best path so far
            neighbor.parent = current;
            neighbor.g = tentativeG;
            neighbor.h = heuristic(neighbor, endNode);
            neighbor.f = neighbor.g + neighbor.h;
          }
        });

        step++;
        draw();
        requestAnimationFrame(animate); // Continue the animation loop
      } else {
        // No path found
        console.log('No path found');
      }
    }
  </script>
</body>
</html>






**be aware of the canvas size and render accordingly**`,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch canvas code");
      }

      const data = await res.json();
      console.log(data);

      // Stripping out the code block markers (```html) and setting the raw HTML response
      const htmlContent = data.reply
        .replace(/```html[\s\S]*?<body>/g, "") // Remove the starting code block marker
        .replace(/```/g, "") // Remove the closing code block marker
        .replace(/<\/body>[\s\S]*$/g, "") // Remove everything after </body> (inclusive)
        .trim(); // Remove any leading/trailing spaces/newlines
      // Remove any leading/trailing spaces/newlines

      console.log(htmlContent);
      setCanvasCode(htmlContent); // Store the HTML code without code block markers
    } catch (error) {
      console.error("Error fetching canvas code:", error);
    } finally {
      setLoading(false);
    }
  }

  // Fetch canvas code whenever the topic or the AI message changes
  useEffect(() => {
    if (topic) {
      setTopicChanged(true); // Indicate that topic has changed
    }
  }, [topic]);

  // Trigger canvas code fetching after the topic changes
  useEffect(() => {
    if (topicChanged) {
      fetchCanvasCode();
      setTopicChanged(false); // Reset flag after fetching
    }
  }, [topicChanged]);

  useEffect(() => {
    if (iframeRef.current && canvasCode) {
      const iframeDocument = iframeRef.current.contentDocument;
      if (iframeDocument) {
        iframeDocument.open();
        iframeDocument.write(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Canvas Visualization</title>
            <style>
              body { font-family: sans-serif; margin: 0; padding: 0; background: #f4f4f4; }
              canvas { display: block; margin: 0 auto; }
            </style>
          </head>
          <body>
            ${canvasCode} <!-- Dynamically injected canvas and script -->
          </body>
          </html>
        `);
        iframeDocument.close(); // Close the document to render the content
      }
    }
  }, [canvasCode]);

  return (
    <div className={`w-full p-4 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Visualization</h2>
        {/* Night Mode Toggle */}
        {/* <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2 z-50 rounded-full focus:outline-none ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          {isDarkMode ? "🌙" : "🌞"}
        </button> */}
      </div>

      {loading ? (
        <p className={`${isDarkMode ? "text-white" : "text-black"}`}>Loading canvas...</p>
      ) : (
        <div>
          <iframe
            ref={iframeRef}
            title="Canvas Visualization"
            width="100%" // Make iframe responsive
            height="80vh" // Adjust height for better fit
            sandbox="allow-scripts allow-same-origin" // Sandbox with restricted permissions
            style={{ border: "none", background: "grey" }}
            className="w-full h-[80vh] md:h-[90vh] lg:h-[80vh]" // Responsive iframe height
          />
        </div>
      )}
    </div>
  );
}
