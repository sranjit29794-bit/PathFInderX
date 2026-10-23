import * as React from "react";
import { useGraph } from "@/state/GraphProvider";
import { usePlayback, type UsePlaybackReturn } from "@/hooks/usePlayback";
import {
  ALGORITHMS,
  runAlgorithm,
  type AlgorithmId,
  type RunResult,
  type AlgorithmMeta,
} from "@/lib/algorithms";
import {
  listGraphs,
  getGraph,
  type SavedGraph,
} from "@/lib/savedGraphs";
import { type Graph, type GNode } from "@/lib/graph";

export interface ArenaContextValue {
  selectedGraphKey: string;
  setSelectedGraphKey: (key: string) => void;
  savedGraphs: SavedGraph[];
  algoA: AlgorithmId;
  setAlgoA: (id: AlgorithmId) => void;
  algoB: AlgorithmId;
  setAlgoB: (id: AlgorithmId) => void;
  metaA: AlgorithmMeta | undefined;
  metaB: AlgorithmMeta | undefined;
  activeGraphName: string;
  activeGraph: Graph;
  frozenGraph: Graph;
  activeSourceId: string | null;
  activeGoalId: string | null;
  activeSavedGraph: SavedGraph | null;
  sourceNode: GNode | null;
  goalNode: GNode | null;
  nodeMap: Map<string, GNode>;
  runA: RunResult | null;
  runB: RunResult | null;
  totalSteps: number;
  playback: UsePlaybackReturn;
  handleSelectGraph: (key: string) => void;
}

const ArenaContext = React.createContext<ArenaContextValue | null>(null);

export function ArenaProvider({ children }: { children: React.ReactNode }) {
  const { state } = useGraph();

  // Saved graphs list
  const [savedGraphs, setSavedGraphs] = React.useState<SavedGraph[]>(() => listGraphs());

  React.useEffect(() => {
    const handleFocus = () => setSavedGraphs(listGraphs());
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  // Selected graph choice: 'current' or saved graph id
  const [selectedGraphKey, setSelectedGraphKey] = React.useState<string>(() => {
    try {
      return (
        window.sessionStorage.getItem("pathfinder.arena.selectedGraph") ?? "current"
      );
    } catch {
      return "current";
    }
  });

  // Algorithm choices for comparative run (default BFS vs Dijkstra)
  const [algoA, setAlgoA] = React.useState<AlgorithmId>("bfs");
  const [algoB, setAlgoB] = React.useState<AlgorithmId>("dijkstra");

  const metaA = ALGORITHMS.find((a) => a.id === algoA);
  const metaB = ALGORITHMS.find((a) => a.id === algoB);

  // Resolve active saved graph
  const activeSavedGraph = React.useMemo(() => {
    if (selectedGraphKey === "current") return null;
    return getGraph(selectedGraphKey);
  }, [selectedGraphKey]);

  // Active graph parameters: Studio working graph or selected SavedGraph
  const activeGraph = activeSavedGraph ? activeSavedGraph.graph : state.graph;
  const activeSourceId = activeSavedGraph ? activeSavedGraph.sourceId : state.sourceId;
  const activeGoalId = activeSavedGraph ? activeSavedGraph.goalId : state.goalId;
  const activeGraphName = activeSavedGraph ? activeSavedGraph.name : "Current Studio graph";

  // Check valid source & goal
  const sourceNode = activeSourceId
    ? activeGraph.nodes.find((n) => n.id === activeSourceId) ?? null
    : null;
  const goalNode = activeGoalId
    ? activeGraph.nodes.find((n) => n.id === activeGoalId) ?? null
    : null;

  // Node lookup map
  const nodeMap = React.useMemo(() => {
    const map = new Map<string, GNode>();
    for (const n of activeGraph.nodes) {
      map.set(n.id, n);
    }
    return map;
  }, [activeGraph.nodes]);

  // Freeze deep copy of graph in dev to strictly enforce immutability
  const frozenGraph = React.useMemo(() => {
    const copy = JSON.parse(JSON.stringify(activeGraph));
    return Object.freeze(copy);
  }, [activeGraph]);

  // Compute runs on the same frozen graph
  const runA = React.useMemo(() => {
    if (!sourceNode || !goalNode || !activeSourceId || !activeGoalId) return null;
    try {
      return runAlgorithm(algoA, frozenGraph, activeSourceId, activeGoalId);
    } catch {
      return null;
    }
  }, [algoA, frozenGraph, sourceNode, goalNode, activeSourceId, activeGoalId]);

  const runB = React.useMemo(() => {
    if (!sourceNode || !goalNode || !activeSourceId || !activeGoalId) return null;
    try {
      return runAlgorithm(algoB, frozenGraph, activeSourceId, activeGoalId);
    } catch {
      return null;
    }
  }, [algoB, frozenGraph, sourceNode, goalNode, activeSourceId, activeGoalId]);

  // Synchronized playback: totalSteps = max(stepsA, stepsB)
  const stepsCountA = runA ? runA.steps.length : 0;
  const stepsCountB = runB ? runB.steps.length : 0;
  const totalSteps = Math.max(stepsCountA, stepsCountB);

  const playback = usePlayback(totalSteps);

  const handleSelectGraph = (key: string) => {
    setSelectedGraphKey(key);
    try {
      window.sessionStorage.setItem("pathfinder.arena.selectedGraph", key);
    } catch {
      // ignore storage errors
    }
    playback.restart();
  };

  const contextValue: ArenaContextValue = {
    selectedGraphKey,
    setSelectedGraphKey,
    savedGraphs,
    algoA,
    setAlgoA,
    algoB,
    setAlgoB,
    metaA,
    metaB,
    activeGraphName,
    activeGraph,
    frozenGraph,
    activeSourceId,
    activeGoalId,
    activeSavedGraph,
    sourceNode,
    goalNode,
    nodeMap,
    runA,
    runB,
    totalSteps,
    playback,
    handleSelectGraph,
  };

  return (
    <ArenaContext.Provider value={contextValue}>{children}</ArenaContext.Provider>
  );
}

export function useArenaRuns(): ArenaContextValue {
  const context = React.useContext(ArenaContext);
  if (!context) {
    throw new Error("useArenaRuns must be used within an ArenaProvider");
  }
  return context;
}
