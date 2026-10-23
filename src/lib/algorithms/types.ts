export type NodeState =
  | "unvisited"
  | "discovered"
  | "frontier"
  | "current"
  | "processed";

export interface Step {
  index: number;
  line: number; // 0-based line of the pseudocode to highlight
  message: string; // human sentence, e.g. "Exploring neighbours of C"
  current: string | null;
  examinedEdge: { edgeId: string; from: string; to: string } | null;
  nodeStates: Record<string, NodeState>;
  dist: Record<string, number | null>; // BFS: hop count, Dijkstra: weighted distance
  parent: Record<string, string | null>;
  structure: {
    kind: "queue" | "priority-queue" | "stack";
    items: { id: string; priority?: number }[];
  };
  visitedCount: number;
  edgesExamined: number;
  path: string[] | null; // set only on the final step when found
  done: boolean;
  found: boolean;
}

export interface RunResult {
  algorithm: "bfs" | "dijkstra" | "dfs";
  steps: Step[];
  path: string[] | null;
  pathWeight: number | null; // ALWAYS the real sum of edge weights along the returned path, for BFS too
  visited: number;
  edgesExamined: number;
  stepCount: number;
  measuredMs: number; // performance.now() around the computation only
  timeComplexity: string;
  spaceComplexity: string;
  pseudocode: string[];
  found: boolean;
}

export class AlgorithmError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AlgorithmError";
  }
}
