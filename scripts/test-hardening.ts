import assert from "node:assert";
import {
  type Graph,
  addEdge,
  removeNode,
  setWeight,
  PRESETS,
} from "../src/lib/graph";
import { runAlgorithm, AlgorithmError } from "../src/lib/algorithms";

console.log("\n========================================================");
console.log("   PATHFINDER PHASE 5A HARDENING TEST SUITE");
console.log("========================================================\n");

let passed = 0;
let failed = 0;

function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`✔ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`✖ FAIL: ${name}`);
    console.error(err);
    failed++;
  }
}

// 1. Graph with 0 nodes
test("0-node graph: runAlgorithm throws typed AlgorithmError", () => {
  const emptyGraph: Graph = { nodes: [], edges: [] };
  assert.throws(
    () => runAlgorithm("bfs", emptyGraph, "A", "B"),
    (err: unknown) => err instanceof AlgorithmError,
  );
});

// 2. Graph with 1 node
test("1-node graph: source === goal returns single-step cost 0", () => {
  const singleNodeGraph: Graph = {
    nodes: [{ id: "node-1", label: "A", x: 100, y: 100 }],
    edges: [],
  };
  const bfs = runAlgorithm("bfs", singleNodeGraph, "node-1", "node-1");
  assert.strictEqual(bfs.found, true);
  assert.strictEqual(bfs.pathWeight, 0);
  assert.deepStrictEqual(bfs.path, ["node-1"]);
  assert.strictEqual(bfs.steps.length, 1);

  const dijkstra = runAlgorithm("dijkstra", singleNodeGraph, "node-1", "node-1");
  assert.strictEqual(dijkstra.found, true);
  assert.strictEqual(dijkstra.pathWeight, 0);
  assert.deepStrictEqual(dijkstra.path, ["node-1"]);
  assert.strictEqual(dijkstra.steps.length, 1);
});

test("1-node graph: missing goal throws AlgorithmError", () => {
  const singleNodeGraph: Graph = {
    nodes: [{ id: "node-1", label: "A", x: 100, y: 100 }],
    edges: [],
  };
  assert.throws(
    () => runAlgorithm("bfs", singleNodeGraph, "node-1", "node-missing"),
    (err: unknown) => err instanceof AlgorithmError,
  );
});

// 3. Unreachable goal
test("Unreachable goal: found=false, path=null", () => {
  const disconnectedGraph: Graph = {
    nodes: [
      { id: "A", label: "A", x: 0, y: 0 },
      { id: "B", label: "B", x: 100, y: 100 },
    ],
    edges: [],
  };
  const bfs = runAlgorithm("bfs", disconnectedGraph, "A", "B");
  assert.strictEqual(bfs.found, false);
  assert.strictEqual(bfs.path, null);
  assert.strictEqual(bfs.pathWeight, null);

  const dijkstra = runAlgorithm("dijkstra", disconnectedGraph, "A", "B");
  assert.strictEqual(dijkstra.found, false);
  assert.strictEqual(dijkstra.path, null);
  assert.strictEqual(dijkstra.pathWeight, null);
});

// 4. Duplicate edge attempt
test("Duplicate edge attempt is rejected", () => {
  const baseGraph: Graph = {
    nodes: [
      { id: "A", label: "A", x: 0, y: 0 },
      { id: "B", label: "B", x: 100, y: 100 },
    ],
    edges: [{ id: "e1", a: "A", b: "B", w: 5 }],
  };
  const afterAtoB = addEdge(baseGraph, "A", "B", 10);
  assert.strictEqual(afterAtoB.edges.length, 1);
  assert.strictEqual(afterAtoB.edges[0].w, 5);

  const afterBtoA = addEdge(baseGraph, "B", "A", 10);
  assert.strictEqual(afterBtoA.edges.length, 1);
  assert.strictEqual(afterBtoA.edges[0].w, 5);
});

// 5. Self-loop attempt
test("Self-loop attempt is rejected", () => {
  const baseGraph: Graph = {
    nodes: [{ id: "A", label: "A", x: 0, y: 0 }],
    edges: [],
  };
  const afterSelfLoop = addEdge(baseGraph, "A", "A", 3);
  assert.strictEqual(afterSelfLoop.edges.length, 0);
});

// 6. Weight validation: 0, negative, NaN rejected (keeps previous value)
test("Weight set to 0, negative, or NaN is rejected", () => {
  const baseGraph: Graph = {
    nodes: [
      { id: "A", label: "A", x: 0, y: 0 },
      { id: "B", label: "B", x: 100, y: 100 },
    ],
    edges: [{ id: "e1", a: "A", b: "B", w: 7 }],
  };

  const zeroW = setWeight(baseGraph, "e1", 0);
  assert.strictEqual(zeroW.edges[0].w, 7);

  const negW = setWeight(baseGraph, "e1", -4);
  assert.strictEqual(negW.edges[0].w, 7);

  const nanW = setWeight(baseGraph, "e1", NaN);
  assert.strictEqual(nanW.edges[0].w, 7);

  const validW = setWeight(baseGraph, "e1", 12);
  assert.strictEqual(validW.edges[0].w, 12);
});

// 7. Node deletion removes incident edges
test("removeNode removes node and all incident edges cleanly", () => {
  const baseGraph: Graph = {
    nodes: [
      { id: "A", label: "A", x: 0, y: 0 },
      { id: "B", label: "B", x: 100, y: 100 },
      { id: "C", label: "C", x: 200, y: 200 },
    ],
    edges: [
      { id: "e1", a: "A", b: "B", w: 2 },
      { id: "e2", a: "B", b: "C", w: 3 },
    ],
  };

  const afterDeleteB = removeNode(baseGraph, "B");
  assert.strictEqual(afterDeleteB.nodes.length, 2);
  assert.strictEqual(afterDeleteB.edges.length, 0); // both e1 and e2 connected to B are removed
});

// 8. Preset immutability
test("PRESETS are never mutated by any algorithm run", () => {
  const originalWeightedJSON = JSON.stringify(PRESETS.weighted.graph);
  runAlgorithm("bfs", PRESETS.weighted.graph, PRESETS.weighted.sourceId, PRESETS.weighted.goalId);
  runAlgorithm("dijkstra", PRESETS.weighted.graph, PRESETS.weighted.sourceId, PRESETS.weighted.goalId);
  assert.strictEqual(JSON.stringify(PRESETS.weighted.graph), originalWeightedJSON);
});

console.log("\n--------------------------------------------------------");
console.log(`TOTAL: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
console.log("--------------------------------------------------------\n");

if (failed > 0) {
  process.exit(1);
}
