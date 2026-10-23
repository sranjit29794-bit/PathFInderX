import { type Graph, neighbors, calculatePathWeight } from "@/lib/graph";
import {
  type Step,
  type RunResult,
  type NodeState,
  AlgorithmError,
} from "./types";

export const DFS_PSEUDOCODE: string[] = [
  "stack = [source], visited = {source}",
  "while stack is not empty:",
  "  current = stack.pop()",
  "  if current == goal: return reconstructPath()",
  "  for each neighbor of current (reverse label):",
  "    if neighbor not in visited:",
  "      visited.add(neighbor), parent[neighbor] = current",
  "      stack.push(neighbor)",
];

export function run(
  graph: Graph,
  sourceId: string,
  goalId: string,
): RunResult {
  const t0 = performance.now();

  const sourceNode = graph.nodes.find((n) => n.id === sourceId);
  const goalNode = graph.nodes.find((n) => n.id === goalId);

  if (!sourceNode || !goalNode) {
    throw new AlgorithmError(
      `Source (${sourceId}) or Goal (${goalId}) not found in graph.`,
    );
  }

  const steps: Step[] = [];
  const nodeStates: Record<string, NodeState> = {};
  const dist: Record<string, number | null> = {};
  const parent: Record<string, string | null> = {};

  for (const n of graph.nodes) {
    nodeStates[n.id] = "unvisited";
    dist[n.id] = null;
    parent[n.id] = null;
  }

  const stack: string[] = [];
  const visitedSet = new Set<string>();
  let edgesExamined = 0;
  let stepIndex = 0;

  // Node label helper
  const labelOf = (id: string | null) =>
    graph.nodes.find((n) => n.id === id)?.label || id || "";

  // Helper to deep copy and record a step
  const pushStep = (params: {
    line: number;
    message: string;
    current: string | null;
    examinedEdge?: { edgeId: string; from: string; to: string } | null;
    path?: string[] | null;
    done?: boolean;
    found?: boolean;
  }) => {
    steps.push({
      index: stepIndex++,
      line: params.line,
      message: params.message,
      current: params.current,
      examinedEdge: params.examinedEdge ?? null,
      nodeStates: { ...nodeStates },
      dist: { ...dist },
      parent: { ...parent },
      structure: {
        kind: "stack",
        items: stack.map((id) => ({ id })),
      },
      visitedCount: visitedSet.size,
      edgesExamined,
      path: params.path ?? null,
      done: params.done ?? false,
      found: params.found ?? false,
    });
  };

  // Edge Case: Source === Goal
  if (sourceId === goalId) {
    nodeStates[sourceId] = "processed";
    dist[sourceId] = 0;
    visitedSet.add(sourceId);

    pushStep({
      line: 3,
      message: `Source node ${sourceNode.label} is already the goal.`,
      current: sourceId,
      path: [sourceId],
      done: true,
      found: true,
    });

    const measuredMs = performance.now() - t0;
    return {
      algorithm: "dfs",
      steps,
      path: [sourceId],
      pathWeight: 0,
      visited: 1,
      edgesExamined: 0,
      stepCount: steps.length,
      measuredMs,
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V)",
      pseudocode: DFS_PSEUDOCODE,
      found: true,
    };
  }

  // Line 0: Initial Step 0
  dist[sourceId] = 0;
  nodeStates[sourceId] = "frontier";
  stack.push(sourceId);
  visitedSet.add(sourceId);

  pushStep({
    line: 0,
    message: `Initialized stack with source node ${sourceNode.label}.`,
    current: null,
  });

  let goalReached = false;
  let finalPath: string[] | null = null;

  while (stack.length > 0) {
    // Line 1: while stack is not empty
    pushStep({
      line: 1,
      message: `Stack has ${stack.length} node${stack.length === 1 ? "" : "s"} waiting: [${stack.map(labelOf).join(", ")}] (top is ${labelOf(stack[stack.length - 1])}).`,
      current: null,
    });

    // Line 2: current = stack.pop()
    const current = stack.pop()!;
    nodeStates[current] = "current";

    pushStep({
      line: 2,
      message: `Popped node ${labelOf(current)} from top of stack as current node.`,
      current,
    });

    // Line 3: if current == goal
    if (current === goalId) {
      goalReached = true;
      // Reconstruct parent chain from goal back to source
      const pathReconstructed: string[] = [];
      let currTrack: string | null = goalId;
      while (currTrack) {
        pathReconstructed.unshift(currTrack);
        currTrack = parent[currTrack];
      }
      finalPath = pathReconstructed;
      nodeStates[current] = "processed";

      pushStep({
        line: 3,
        message: `Goal node ${goalNode.label} reached! Path: ${finalPath.map(labelOf).join(" → ")}.`,
        current,
        path: finalPath,
        done: true,
        found: true,
      });
      break;
    }

    // Line 4: for each neighbor of current (reverse alphabetical)
    const neighList = neighbors(graph, current);

    // Sort neighbors in reverse alphabetical order so that when pushed to stack,
    // the alphabetically first neighbor lands at the top of the stack and is explored first.
    const sortedNeighbors = [...neighList].sort((a, b) => {
      const la = labelOf(a.to);
      const lb = labelOf(b.to);
      return lb.localeCompare(la);
    });

    pushStep({
      line: 4,
      message: `Exploring ${neighList.length} neighbor${neighList.length === 1 ? "" : "s"} of node ${labelOf(current)} in reverse alphabetical order.`,
      current,
    });

    for (const nb of sortedNeighbors) {
      edgesExamined++;
      const edgeInfo = {
        edgeId: nb.edgeId,
        from: current,
        to: nb.to,
      };

      // Line 5: if neighbor not in visited
      const isNew = !visitedSet.has(nb.to);

      pushStep({
        line: 5,
        message: `Checking edge ${labelOf(current)} ⟷ ${labelOf(nb.to)}. ${isNew ? "Neighbor is unvisited." : "Neighbor already visited."}`,
        current,
        examinedEdge: edgeInfo,
      });

      if (isNew) {
        visitedSet.add(nb.to);
        dist[nb.to] = (dist[current] ?? 0) + 1;
        parent[nb.to] = current;
        nodeStates[nb.to] = "frontier";

        // Line 6: visited.add(neighbor), parent[neighbor] = current
        pushStep({
          line: 6,
          message: `Discovered node ${labelOf(nb.to)}, parent set to ${labelOf(current)}.`,
          current,
          examinedEdge: edgeInfo,
        });

        // Line 7: stack.push(neighbor)
        stack.push(nb.to);

        pushStep({
          line: 7,
          message: `Pushed node ${labelOf(nb.to)} onto stack (new top).`,
          current,
          examinedEdge: edgeInfo,
        });
      }
    }

    // Mark processed
    nodeStates[current] = "processed";
    pushStep({
      line: 1,
      message: `Finished expanding node ${labelOf(current)}.`,
      current: null,
    });
  }

  // If goal was unreachable
  if (!goalReached) {
    pushStep({
      line: 1,
      message: `Stack is empty. Goal node ${goalNode.label} is unreachable from ${sourceNode.label}.`,
      current: null,
      path: null,
      done: true,
      found: false,
    });
  }

  const measuredMs = performance.now() - t0;
  const pathWeight = calculatePathWeight(graph, finalPath);

  return {
    algorithm: "dfs",
    steps,
    path: finalPath,
    pathWeight,
    visited: visitedSet.size,
    edgesExamined,
    stepCount: steps.length,
    measuredMs,
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    pseudocode: DFS_PSEUDOCODE,
    found: goalReached,
  };
}
