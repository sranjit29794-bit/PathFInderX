import { type Graph } from "@/lib/graph";
import { run as runBFS, BFS_PSEUDOCODE } from "./bfs";
import { run as runDijkstra, DIJKSTRA_PSEUDOCODE } from "./dijkstra";
import { run as runDFS, DFS_PSEUDOCODE } from "./dfs";
import {
  type RunResult,
  AlgorithmError,
} from "./types";

export * from "./types";
export {
  runBFS,
  runDijkstra,
  runDFS,
  BFS_PSEUDOCODE,
  DIJKSTRA_PSEUDOCODE,
  DFS_PSEUDOCODE,
};

export type AlgorithmId = "bfs" | "dijkstra" | "dfs" | "astar";

export interface AlgorithmMeta {
  id: AlgorithmId;
  name: string;
  shortDesc: string;
  kind: "Unweighted" | "Weighted" | "Heuristic";
  enabled: boolean;
  timeComplexity: string;
  spaceComplexity: string;
}

export const ALGORITHMS: AlgorithmMeta[] = [
  {
    id: "bfs",
    name: "Breadth-First Search (BFS)",
    shortDesc:
      "Explores breadth-wise layer by layer. Guaranteed to find the path with the minimum number of edge hops.",
    kind: "Unweighted",
    enabled: true,
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
  },
  {
    id: "dijkstra",
    name: "Dijkstra's Algorithm",
    shortDesc:
      "Greedily extracts the minimum cumulative distance candidate. Guaranteed to find the minimal total weight path.",
    kind: "Weighted",
    enabled: true,
    timeComplexity: "O((V + E) log V)",
    spaceComplexity: "O(V + E)",
  },
  {
    id: "dfs",
    name: "Depth-First Search (DFS)",
    shortDesc:
      "Explores deeply along each branch before backtracking. Iterative traversal with an explicit stack.",
    kind: "Unweighted",
    enabled: true,
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
  },
  {
    id: "astar",
    name: "A* Search",
    shortDesc:
      "Combines path cost with a geometric heuristic to efficiently direct the search toward the destination.",
    kind: "Heuristic",
    enabled: false,
    timeComplexity: "O(E log V)",
    spaceComplexity: "O(V)",
  },
];

export function runAlgorithm(
  id: string,
  graph: Graph,
  sourceId: string,
  goalId: string,
): RunResult {
  switch (id) {
    case "bfs":
      return runBFS(graph, sourceId, goalId);
    case "dijkstra":
      return runDijkstra(graph, sourceId, goalId);
    case "dfs":
      return runDFS(graph, sourceId, goalId);
    default:
      throw new AlgorithmError(
        `Algorithm '${id}' is not implemented or not enabled.`,
      );
  }
}
