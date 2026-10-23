import { type Graph } from "@/lib/graph";
import { type Step, ALGORITHMS, type AlgorithmId, runAlgorithm } from "@/lib/algorithms";

export interface HowItWorksStep {
  title: string;
  text: string;
}

export interface AlgorithmLearnContent {
  id: AlgorithmId;
  name: string;
  tagline: string;
  kind: "Unweighted" | "Weighted";
  strategy: string;
  structureName: "Queue" | "Stack" | "Priority queue";
  howItWorks: [HowItWorksStep, HowItWorksStep, HowItWorksStep];
  bestFor: string;
  strengths: string;
  limitations: string;
  weighted: boolean;
  time: string;
  space: string;
  runnable: boolean;
  implementationNote: string;
}

// Fixed 6-node example graph for live walkthrough frames
export const LEARN_EXAMPLE_GRAPH: Graph = {
  nodes: [
    { id: "node-A", label: "A", x: 150, y: 360 },
    { id: "node-B", label: "B", x: 380, y: 180 },
    { id: "node-C", label: "C", x: 380, y: 540 },
    { id: "node-D", label: "D", x: 620, y: 180 },
    { id: "node-E", label: "E", x: 620, y: 540 },
    { id: "node-F", label: "F", x: 850, y: 360 },
  ],
  edges: [
    { id: "e-A-B", a: "node-A", b: "node-B", w: 3 },
    { id: "e-A-C", a: "node-A", b: "node-C", w: 2 },
    { id: "e-B-D", a: "node-B", b: "node-D", w: 4 },
    { id: "e-B-C", a: "node-B", b: "node-C", w: 1 },
    { id: "e-C-E", a: "node-C", b: "node-E", w: 3 },
    { id: "e-D-F", a: "node-D", b: "node-F", w: 5 },
    { id: "e-E-F", a: "node-E", b: "node-F", w: 2 },
    { id: "e-C-D", a: "node-C", b: "node-D", w: 6 },
  ],
};

export const LEARN_SOURCE_ID = "node-A";
export const LEARN_GOAL_ID = "node-F";

// Helper to look up complexities from ALGORITHMS registry
const getMeta = (id: AlgorithmId) => ALGORITHMS.find((a) => a.id === id);

export const LEARN_ALGORITHMS: AlgorithmLearnContent[] = [
  {
    id: "bfs",
    name: "Breadth-First Search",
    tagline: "Queue-based search",
    kind: "Unweighted",
    strategy: "Queue, layer by layer",
    structureName: "Queue",
    howItWorks: [
      {
        title: "Start at the source",
        text: "Mark the starting vertex as discovered and push it into the FIFO queue.",
      },
      {
        title: "Explore layer by layer",
        text: "Dequeue the front node and visit all unvisited neighbors, enqueuing them at distance d + 1.",
      },
      {
        title: "Stop at the destination",
        text: "The first discovery of the goal guarantees the shortest path in edge hops (not edge weight).",
      },
    ],
    bestFor: "Unweighted shortest paths & fewest edge hops",
    strengths: "Complete and optimal for minimum-hop routes in unweighted networks",
    limitations: "Ignores edge weights; does not minimize cumulative weight on weighted graphs",
    weighted: false,
    time: getMeta("bfs")?.timeComplexity ?? "O(V + E)",
    space: getMeta("bfs")?.spaceComplexity ?? "O(V)",
    runnable: true,
    implementationNote:
      "Implemented with an explicit FIFO queue array. Enqueued neighbors are immediately marked frontier and recorded with predecessor pointers for deterministic parent-chain path recovery.",
  },
  {
    id: "dfs",
    name: "Depth-First Search",
    tagline: "Depth-oriented search",
    kind: "Unweighted",
    strategy: "Stack, deep branch exploration",
    structureName: "Stack",
    howItWorks: [
      {
        title: "Push source to stack",
        text: "Initialize an explicit LIFO stack with the source vertex and mark it discovered.",
      },
      {
        title: "Dive deep into branches",
        text: "Pop the top vertex and push unvisited neighbors in reverse alphabetical order to explore alphabetically.",
      },
      {
        title: "Backtrack when exhausted",
        text: "Backtrack when a branch reaches a dead end; stops when the goal is popped. Does not guarantee shortest path.",
      },
    ],
    bestFor: "Topological ordering, cycle detection, and maze/connectivity exploration",
    strengths: "Low memory overhead along deep paths; reaches terminal leaves rapidly",
    limitations: "Does not guarantee shortest path; can explore deep suboptimal branches before finding the destination",
    weighted: false,
    time: getMeta("dfs")?.timeComplexity ?? "O(V + E)",
    space: getMeta("dfs")?.spaceComplexity ?? "O(V)",
    runnable: true,
    implementationNote:
      "Implemented iteratively with an explicit stack array rather than recursion to guarantee stack safety. Adjacent neighbors are sorted in descending label order before pushing so popping processes neighbors in deterministic alphabetical order.",
  },
  {
    id: "dijkstra",
    name: "Dijkstra's Algorithm",
    tagline: "Weighted shortest path",
    kind: "Weighted",
    strategy: "Priority queue by cumulative distance",
    structureName: "Priority queue",
    howItWorks: [
      {
        title: "Initialize tentative distances",
        text: "Set dist[source] = 0 and all other vertices to infinity; insert the source into the priority queue with weight 0.",
      },
      {
        title: "Greedy lowest-cost extraction",
        text: "Extract the node with minimal cumulative distance and relax each incident edge: dist[v] = min(dist[v], dist[u] + w).",
      },
      {
        title: "Reconstruct minimal cost path",
        text: "When the destination node is extracted from the queue, follow parent pointers for guaranteed minimal total weight.",
      },
    ],
    bestFor: "Guaranteed minimum-weight paths in weighted graphs with non-negative edge costs",
    strengths: "Provably optimal total weight paths on any graph with non-negative edge weights",
    limitations: "Requires non-negative weights (negative edge weights break greediness and can cause infinite cycles); explores outwards uniformly",
    weighted: true,
    time: getMeta("dijkstra")?.timeComplexity ?? "O((V + E) log V)",
    space: getMeta("dijkstra")?.spaceComplexity ?? "O(V + E)",
    runnable: true,
    implementationNote:
      "Implemented using an explicit binary min-heap priority queue keyed by cumulative distance g(n). Edge relaxation safely handles re-insertion when a strictly lower distance candidate is discovered.",
  },
  {
    id: "astar",
    name: "A* Search",
    tagline: "Heuristic-guided search",
    kind: "Weighted",
    strategy: "Heuristic-guided priority queue",
    structureName: "Priority queue",
    howItWorks: [
      {
        title: "Score by f(n) = g(n) + h(n)",
        text: "Combine exact path cost from start g(n) with estimated Euclidean distance to goal h(n).",
      },
      {
        title: "Prioritize target direction",
        text: "Extract the node with lowest f(n) from priority queue, focusing the exploration cone directly toward the destination.",
      },
      {
        title: "Optimal termination",
        text: "Guarantees optimal shortest path if heuristic h(n) is admissible (never overestimates real cost).",
      },
    ],
    bestFor: "Goal-directed pathfinding on geometric or spatial coordinate networks",
    strengths: "Explores significantly fewer vertices than Dijkstra by focusing the search frontier toward the goal",
    limitations: "Requires an admissible heuristic function; complexity depends on heuristic accuracy and graph topology",
    weighted: true,
    time: "Heuristic-dependent", // accurate per prompt requirement
    space: "O(V)",
    runnable: false,
    implementationNote:
      "Staged in the registry for upcoming release. Will compute Euclidean distance as an admissible and consistent heuristic h(n) derived from SVG node coordinates.",
  },
];

export interface WalkthroughFrame {
  tag: string;
  title: string;
  subtitle: string;
  step: Step;
}

/**
 * Extracts 3 meaningful frames from real algorithm execution on LEARN_EXAMPLE_GRAPH:
 * 1. Start discovered
 * 2. First expansion
 * 3. Goal reached
 */
export function getWalkthroughFrames(algoId: AlgorithmId): WalkthroughFrame[] | null {
  const meta = LEARN_ALGORITHMS.find((a) => a.id === algoId);
  if (!meta || !meta.runnable) return null;

  try {
    const result = runAlgorithm(algoId, LEARN_EXAMPLE_GRAPH, LEARN_SOURCE_ID, LEARN_GOAL_ID);
    if (!result || result.steps.length === 0) return null;

    // Frame 1: Start Discovered (Step 0)
    const frame1Step = result.steps[0];
    const frame1: WalkthroughFrame = {
      tag: "Discover",
      title: "Start at A",
      subtitle: `Initialized ${meta.structureName.toLowerCase()} with source node A`,
      step: frame1Step,
    };

    // Frame 2: First expansion (when node A's neighbors are added to structure)
    // Find first step where structure.items has at least 2 items, or where line === 1/2 after first push
    const expansionStepIndex = result.steps.findIndex(
      (s, idx) => idx > 0 && s.structure.items.length >= 2,
    );
    const frame2Step =
      expansionStepIndex !== -1
        ? result.steps[expansionStepIndex]
        : result.steps[Math.min(3, result.steps.length - 1)];

    const neighborLabels = frame2Step.structure.items
      .map((it) => it.id.replace("node-", ""))
      .join(", ");

    const frame2: WalkthroughFrame = {
      tag: algoId === "dfs" ? "Stack Push" : algoId === "dijkstra" ? "Priority Queue" : "Enqueue",
      title: `Expand A (${meta.structureName})`,
      subtitle: `${meta.structureName}: [${neighborLabels}]`,
      step: frame2Step,
    };

    // Frame 3: Goal Reached (last step or step where goal was found)
    const goalStep =
      result.steps.find((s) => s.done && s.found) ?? result.steps[result.steps.length - 1];
    const pathLabels = goalStep.path
      ? goalStep.path.map((id) => id.replace("node-", "")).join(" → ")
      : "Complete";

    const frame3: WalkthroughFrame = {
      tag: "Process",
      title: "Goal Reached",
      subtitle: `Path found: ${pathLabels}`,
      step: goalStep,
    };

    return [frame1, frame2, frame3];
  } catch (err) {
    console.error(`Failed to generate walkthrough frames for ${algoId}:`, err);
    return null;
  }
}
