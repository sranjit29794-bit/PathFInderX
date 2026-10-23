import { PRESETS, type Graph } from "../src/lib/graph";
import {
  runAlgorithm,
  runBFS,
  runDijkstra,
  runDFS,
  AlgorithmError,
} from "../src/lib/algorithms";

let passedCount = 0;
let failedCount = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`\x1b[32m✔ PASS\x1b[0m: ${testName}`);
    passedCount++;
  } else {
    console.error(`\x1b[31m✖ FAIL\x1b[0m: ${testName} ${detail ? `(${detail})` : ""}`);
    failedCount++;
  }
}

console.log("\n========================================================");
console.log("   PATHFINDER ALGORITHM ENGINE TEST SUITE");
console.log("========================================================\n");

// ---------------------------------------------------------------------------
// TEST 1: Weighted Preset Execution & Divergent Paths
// ---------------------------------------------------------------------------
const weightedGraph = PRESETS.weighted.graph;
const sourceId = "node-A";
const goalId = "node-M";

const bfsResult = runBFS(weightedGraph, sourceId, goalId);
const dijkstraResult = runDijkstra(weightedGraph, sourceId, goalId);

assert(
  bfsResult.found && bfsResult.path !== null,
  "BFS finds a valid path on weighted preset",
);
assert(
  dijkstraResult.found && dijkstraResult.path !== null,
  "Dijkstra finds a valid path on weighted preset",
);

const bfsHops = bfsResult.path ? bfsResult.path.length - 1 : Infinity;
const dijkHops = dijkstraResult.path ? dijkstraResult.path.length - 1 : Infinity;

assert(
  bfsHops <= dijkHops,
  "BFS path has fewest edges (hops)",
  `BFS hops: ${bfsHops}, Dijkstra hops: ${dijkHops}`,
);

assert(
  dijkstraResult.pathWeight !== null &&
    bfsResult.pathWeight !== null &&
    dijkstraResult.pathWeight <= bfsResult.pathWeight,
  "Dijkstra path weight <= BFS path weight",
  `Dijkstra weight: ${dijkstraResult.pathWeight}, BFS weight: ${bfsResult.pathWeight}`,
);

assert(
  dijkstraResult.pathWeight !== null &&
    bfsResult.pathWeight !== null &&
    dijkstraResult.pathWeight < bfsResult.pathWeight,
  "Dijkstra path weight is strictly less than BFS path weight on weighted preset",
  `Dijkstra: ${dijkstraResult.pathWeight} < BFS: ${bfsResult.pathWeight}`,
);

assert(
  bfsResult.path?.join("→") !== dijkstraResult.path?.join("→"),
  "BFS and Dijkstra produce strictly different paths",
  `BFS: ${bfsResult.path?.join("→")}, Dijkstra: ${dijkstraResult.path?.join("→")}`,
);

// ---------------------------------------------------------------------------
// TEST 2: Input Graph Immutability (BFS, Dijkstra, DFS)
// ---------------------------------------------------------------------------
const originalSnapshot = JSON.stringify(weightedGraph);
runBFS(weightedGraph, sourceId, goalId);
runDijkstra(weightedGraph, sourceId, goalId);
runDFS(weightedGraph, sourceId, goalId);
const afterSnapshot = JSON.stringify(weightedGraph);

assert(
  originalSnapshot === afterSnapshot,
  "Input graph is completely unchanged (no mutations by BFS, Dijkstra, or DFS)",
);

// ---------------------------------------------------------------------------
// TEST 3: Edge Case - Unreachable Goal
// ---------------------------------------------------------------------------
const disconnectedGraph: Graph = {
  nodes: [
    { id: "node-1", label: "1", x: 100, y: 100 },
    { id: "node-2", label: "2", x: 200, y: 100 },
    { id: "node-3", label: "3", x: 300, y: 100 },
  ],
  edges: [{ id: "e-1-2", a: "node-1", b: "node-2", w: 3 }],
};

const bfsUnreachable = runBFS(disconnectedGraph, "node-1", "node-3");
assert(
  !bfsUnreachable.found &&
    bfsUnreachable.path === null &&
    bfsUnreachable.pathWeight === null,
  "BFS handles unreachable goal correctly (found=false, path=null)",
);

const dijkstraUnreachable = runDijkstra(disconnectedGraph, "node-1", "node-3");
assert(
  !dijkstraUnreachable.found &&
    dijkstraUnreachable.path === null &&
    dijkstraUnreachable.pathWeight === null,
  "Dijkstra handles unreachable goal correctly (found=false, path=null)",
);

const dfsUnreachable = runDFS(disconnectedGraph, "node-1", "node-3");
assert(
  !dfsUnreachable.found &&
    dfsUnreachable.path === null &&
    dfsUnreachable.pathWeight === null,
  "DFS handles unreachable goal correctly (found=false, path=null)",
);

// ---------------------------------------------------------------------------
// TEST 4: Edge Case - Source === Goal
// ---------------------------------------------------------------------------
const bfsSame = runBFS(disconnectedGraph, "node-1", "node-1");
assert(
  bfsSame.found &&
    bfsSame.path?.length === 1 &&
    bfsSame.path[0] === "node-1" &&
    bfsSame.pathWeight === 0 &&
    bfsSame.steps.length === 1,
  "BFS handles source === goal as 1-step success with cost 0",
);

const dijkstraSame = runDijkstra(disconnectedGraph, "node-1", "node-1");
assert(
  dijkstraSame.found &&
    dijkstraSame.path?.length === 1 &&
    dijkstraSame.path[0] === "node-1" &&
    dijkstraSame.pathWeight === 0 &&
    dijkstraSame.steps.length === 1,
  "Dijkstra handles source === goal as 1-step success with cost 0",
);

const dfsSame = runDFS(disconnectedGraph, "node-1", "node-1");
assert(
  dfsSame.found &&
    dfsSame.path?.length === 1 &&
    dfsSame.path[0] === "node-1" &&
    dfsSame.pathWeight === 0 &&
    dfsSame.steps.length === 1,
  "DFS handles source === goal as 1-step success with cost 0",
);

// ---------------------------------------------------------------------------
// TEST 5: Simple 2-Node Graph
// ---------------------------------------------------------------------------
const twoNodeGraph: Graph = {
  nodes: [
    { id: "node-X", label: "X", x: 100, y: 200 },
    { id: "node-Y", label: "Y", x: 300, y: 200 },
  ],
  edges: [{ id: "e-X-Y", a: "node-X", b: "node-Y", w: 7 }],
};

const bfs2 = runBFS(twoNodeGraph, "node-X", "node-Y");
assert(
  bfs2.found &&
    bfs2.path?.length === 2 &&
    bfs2.path[0] === "node-X" &&
    bfs2.path[1] === "node-Y" &&
    bfs2.pathWeight === 7,
  "BFS runs cleanly on 2-node graph with path weight 7",
);

const dijkstra2 = runDijkstra(twoNodeGraph, "node-X", "node-Y");
assert(
  dijkstra2.found &&
    dijkstra2.path?.length === 2 &&
    dijkstra2.path[0] === "node-X" &&
    dijkstra2.path[1] === "node-Y" &&
    dijkstra2.pathWeight === 7,
  "Dijkstra runs cleanly on 2-node graph with path weight 7",
);

const dfs2 = runDFS(twoNodeGraph, "node-X", "node-Y");
assert(
  dfs2.found &&
    dfs2.path?.length === 2 &&
    dfs2.path[0] === "node-X" &&
    dfs2.path[1] === "node-Y" &&
    dfs2.pathWeight === 7,
  "DFS runs cleanly on 2-node graph with path weight 7",
);

// ---------------------------------------------------------------------------
// TEST 6: Error Handling for Missing Nodes
// ---------------------------------------------------------------------------
let bfsThrew = false;
try {
  runBFS(twoNodeGraph, "node-X", "node-NONEXISTENT");
} catch (err) {
  bfsThrew = err instanceof AlgorithmError;
}
assert(bfsThrew, "BFS throws typed AlgorithmError when goal node is missing");

let dijkstraThrew = false;
try {
  runDijkstra(twoNodeGraph, "node-NONEXISTENT", "node-Y");
} catch (err) {
  dijkstraThrew = err instanceof AlgorithmError;
}
assert(
  dijkstraThrew,
  "Dijkstra throws typed AlgorithmError when source node is missing",
);

let dfsThrew = false;
try {
  runDFS(twoNodeGraph, "node-X", "node-NONEXISTENT");
} catch (err) {
  dfsThrew = err instanceof AlgorithmError;
}
assert(dfsThrew, "DFS throws typed AlgorithmError when goal node is missing");

// ---------------------------------------------------------------------------
// TEST 7: Step Snapshots Deep Copy Integrity
// ---------------------------------------------------------------------------
const stepsTest = bfsResult.steps;
assert(
  stepsTest.length >= 2,
  "Algorithm generates intermediate step snapshots",
);

const step0 = stepsTest[0];
const step1 = stepsTest[1];
const step0NodeStatesBefore = { ...step0.nodeStates };
// Mutate step 1 to ensure step 0 is independent
step1.nodeStates["node-A"] = "discovered";
assert(
  step0.nodeStates["node-A"] === step0NodeStatesBefore["node-A"],
  "Step snapshots are deep copies and independent",
);

// ---------------------------------------------------------------------------
// TEST 8: DFS on Weighted Preset & Stack Structure
// ---------------------------------------------------------------------------
const dfsResult = runDFS(weightedGraph, sourceId, goalId);

assert(
  dfsResult.found && dfsResult.path !== null && dfsResult.path.length > 0,
  "DFS finds a path on the weighted preset",
  `DFS path: ${dfsResult.path?.join("→")}`,
);

assert(
  dfsResult.pathWeight !== null && dfsResult.pathWeight > 0,
  "DFS calculates real pathWeight sum for discovered path",
  `DFS path weight: ${dfsResult.pathWeight}`,
);

assert(
  dfsResult.steps.every((s) => s.structure.kind === "stack"),
  "DFS steps all declare structure.kind = 'stack'",
);

assert(
  dfsResult.pseudocode.length === 8,
  "DFS provides 8-line pseudocode",
  `Pseudocode lines count: ${dfsResult.pseudocode.length}`,
);

assert(
  dfsResult.timeComplexity === "O(V + E)" && dfsResult.spaceComplexity === "O(V)",
  "DFS reports O(V + E) time and O(V) space complexity",
);

// Verify deterministic alphabetical exploration:
// On node-A, neighbors are B and C. Reverse label pushes C then B onto stack.
// Thus, B is popped first (alphabetical order).
const firstPopped = dfsResult.steps.find((s) => s.line === 2 && s.current !== null);
assert(
  firstPopped?.current === "node-A",
  "DFS starts with source node A popped first",
);
const secondPopped = dfsResult.steps.find(
  (s, idx) => idx > (firstPopped ? dfsResult.steps.indexOf(firstPopped) : 0) && s.line === 2 && s.current !== null,
);
assert(
  secondPopped?.current === "node-B",
  "DFS pops node B before node C due to reverse label pushing (deterministic alphabetical traversal)",
  `Actual second popped: ${secondPopped?.current}`,
);

// ---------------------------------------------------------------------------
// TEST 9: Algorithm Registry & Dispatcher
// ---------------------------------------------------------------------------
const dispatchedBFS = runAlgorithm("bfs", twoNodeGraph, "node-X", "node-Y");
assert(
  dispatchedBFS.algorithm === "bfs" && dispatchedBFS.found,
  "runAlgorithm dispatches to BFS correctly",
);

const dispatchedDijkstra = runAlgorithm(
  "dijkstra",
  twoNodeGraph,
  "node-X",
  "node-Y",
);
assert(
  dispatchedDijkstra.algorithm === "dijkstra" && dispatchedDijkstra.found,
  "runAlgorithm dispatches to Dijkstra correctly",
);

const dispatchedDFS = runAlgorithm("dfs", twoNodeGraph, "node-X", "node-Y");
assert(
  dispatchedDFS.algorithm === "dfs" && dispatchedDFS.found,
  "runAlgorithm dispatches to DFS correctly",
);

let unimplThrew = false;
try {
  runAlgorithm("astar", twoNodeGraph, "node-X", "node-Y");
} catch (err) {
  unimplThrew = err instanceof AlgorithmError;
}
assert(
  unimplThrew,
  "runAlgorithm throws typed AlgorithmError for unenabled algorithms (A*)",
);

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------
console.log("\n--------------------------------------------------------");
console.log(`TOTAL: ${passedCount + failedCount} | PASSED: ${passedCount} | FAILED: ${failedCount}`);
console.log("--------------------------------------------------------\n");

if (failedCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
