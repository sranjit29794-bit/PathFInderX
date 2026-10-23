import { type Graph, neighbors, calculatePathWeight } from "@/lib/graph";
import {
  type Step,
  type RunResult,
  type NodeState,
  AlgorithmError,
} from "./types";

export const DIJKSTRA_PSEUDOCODE: string[] = [
  "dist[source] = 0, pq.insert(source, 0)",
  "while pq is not empty:",
  "  current = pq.extractMin()",
  "  if current == goal: return reconstructPath()",
  "  for each (neighbor, weight) of current:",
  "    alt = dist[current] + weight",
  "    if alt < dist[neighbor]:",
  "      dist[neighbor] = alt, parent[neighbor] = current",
  "      pq.insertOrDecrease(neighbor, alt)",
];

interface PQItem {
  id: string;
  priority: number;
}

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

  const pq: PQItem[] = [];
  const visitedSet = new Set<string>();
  let edgesExamined = 0;
  let stepIndex = 0;

  // Node label helper
  const labelOf = (id: string | null) =>
    graph.nodes.find((n) => n.id === id)?.label || id || "";

  // Priority Queue sorted insertion with deterministic tie-breaking
  const pqInsertOrUpdate = (id: string, priority: number) => {
    const existingIdx = pq.findIndex((item) => item.id === id);
    if (existingIdx >= 0) {
      pq[existingIdx].priority = priority;
    } else {
      pq.push({ id, priority });
    }

    pq.sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      return labelOf(a.id).localeCompare(labelOf(b.id));
    });
  };

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
        kind: "priority-queue",
        items: pq.map((item) => ({ ...item })),
      },
      visitedCount: visitedSet.size,
      edgesExamined,
      path: params.path ?? null,
      done: params.done ?? false,
      found: params.found ?? false,
    });
  };

  // Edge case: Source === Goal
  if (sourceId === goalId) {
    nodeStates[sourceId] = "processed";
    dist[sourceId] = 0;
    visitedSet.add(sourceId);

    pushStep({
      line: 3,
      message: `Source node ${sourceNode.label} is already the goal (cost: 0).`,
      current: sourceId,
      path: [sourceId],
      done: true,
      found: true,
    });

    const measuredMs = performance.now() - t0;
    return {
      algorithm: "dijkstra",
      steps,
      path: [sourceId],
      pathWeight: 0,
      visited: 1,
      edgesExamined: 0,
      stepCount: steps.length,
      measuredMs,
      timeComplexity: "O((V + E) log V)",
      spaceComplexity: "O(V + E)",
      pseudocode: DIJKSTRA_PSEUDOCODE,
      found: true,
    };
  }

  // Initial Step 0
  dist[sourceId] = 0;
  nodeStates[sourceId] = "frontier";
  pqInsertOrUpdate(sourceId, 0);

  pushStep({
    line: 0,
    message: `Initialized priority queue with dist[${sourceNode.label}] = 0.`,
    current: null,
  });

  let goalReached = false;
  let finalPath: string[] | null = null;

  while (pq.length > 0) {
    // Line 1: while pq is not empty
    pushStep({
      line: 1,
      message: `Priority queue has ${pq.length} candidate${pq.length === 1 ? "" : "s"}: [${pq.map((i) => `${labelOf(i.id)} (cost: ${i.priority})`).join(", ")}].`,
      current: null,
    });

    // Line 2: current = pq.extractMin()
    const { id: current, priority: currentDist } = pq.shift()!;
    nodeStates[current] = "current";
    visitedSet.add(current);

    pushStep({
      line: 2,
      message: `Extracted minimum cost node ${labelOf(current)} with cumulative cost ${currentDist}.`,
      current,
    });

    // Line 3: if current == goal: return path
    if (current === goalId) {
      goalReached = true;
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
        message: `Goal node ${goalNode.label} reached! Cheapest path found with cost ${dist[goalId]}: ${finalPath.map(labelOf).join(" → ")}.`,
        current,
        path: finalPath,
        done: true,
        found: true,
      });
      break;
    }

    // Line 4: for each (neighbor, weight) of current
    const neighList = neighbors(graph, current);

    pushStep({
      line: 4,
      message: `Examining ${neighList.length} weighted connection${neighList.length === 1 ? "" : "s"} from ${labelOf(current)}.`,
      current,
    });

    for (const nb of neighList) {
      edgesExamined++;
      const edgeInfo = {
        edgeId: nb.edgeId,
        from: current,
        to: nb.to,
      };

      // Line 5: alt = dist[current] + weight
      const alt = (dist[current] ?? 0) + nb.w;
      const currentKnownDist = dist[nb.to];
      const isRelaxable = currentKnownDist === null || alt < currentKnownDist;

      pushStep({
        line: 5,
        message: `Checking edge ${labelOf(current)} ⟷ ${labelOf(nb.to)} (weight ${nb.w}). Candidate path cost: ${dist[current]} + ${nb.w} = ${alt} (current best: ${currentKnownDist === null ? "∞" : currentKnownDist}).`,
        current,
        examinedEdge: edgeInfo,
      });

      // Line 6: if alt < dist[neighbor]
      pushStep({
        line: 6,
        message: isRelaxable
          ? `Path through ${labelOf(current)} is cheaper! Relaxing node ${labelOf(nb.to)}.`
          : `Existing path to ${labelOf(nb.to)} (${currentKnownDist}) is already as good or better. No relaxation.`,
        current,
        examinedEdge: edgeInfo,
      });

      if (isRelaxable) {
        dist[nb.to] = alt;
        parent[nb.to] = current;
        nodeStates[nb.to] = "frontier";

        // Line 7: dist[neighbor] = alt, parent[neighbor] = current
        pushStep({
          line: 7,
          message: `Updated dist[${labelOf(nb.to)}] = ${alt}, parent = ${labelOf(current)}.`,
          current,
          examinedEdge: edgeInfo,
        });

        // Line 8: pq.insertOrDecrease(neighbor, alt)
        pqInsertOrUpdate(nb.to, alt);

        pushStep({
          line: 8,
          message: `Enqueued/updated node ${labelOf(nb.to)} in priority queue with priority ${alt}.`,
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
      message: `Priority queue is empty. Goal node ${goalNode.label} is unreachable from ${sourceNode.label}.`,
      current: null,
      path: null,
      done: true,
      found: false,
    });
  }

  const measuredMs = performance.now() - t0;
  const pathWeight = calculatePathWeight(graph, finalPath);

  return {
    algorithm: "dijkstra",
    steps,
    path: finalPath,
    pathWeight,
    visited: visitedSet.size,
    edgesExamined,
    stepCount: steps.length,
    measuredMs,
    timeComplexity: "O((V + E) log V)",
    spaceComplexity: "O(V + E)",
    pseudocode: DIJKSTRA_PSEUDOCODE,
    found: goalReached,
  };
}
