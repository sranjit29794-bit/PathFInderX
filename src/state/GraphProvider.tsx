import * as React from "react";
import {
  type Graph,
  type PresetKey,
  PRESETS,
  addNode as addNodeFn,
  moveNode as moveNodeFn,
  addEdge as addEdgeFn,
  removeNode as removeNodeFn,
  removeEdge as removeEdgeFn,
  setWeight as setWeightFn,
  getNextLabel,
  generateSeededRandomGraph,
} from "@/lib/graph";

export type ToolType = "select" | "add" | "connect" | "delete";

export type Selection =
  | { type: "node"; id: string }
  | { type: "edge"; id: string }
  | null;

export interface GraphState {
  graph: Graph;
  sourceId: string | null;
  goalId: string | null;
  selection: Selection;
  tool: ToolType;
  currentPreset: PresetKey | "custom";
  activeSavedId: string | null;
}

import { loadDraft, saveDraft, deepCopy } from "@/lib/savedGraphs";

type GraphAction =
  | { type: "SET_PRESET"; preset: PresetKey }
  | { type: "RESET_GRAPH" }
  | { type: "SET_TOOL"; tool: ToolType }
  | { type: "SET_SELECTION"; selection: Selection }
  | { type: "ADD_NODE"; x: number; y: number }
  | { type: "MOVE_NODE"; id: string; x: number; y: number }
  | { type: "ADD_EDGE"; a: string; b: string; w?: number }
  | { type: "REMOVE_NODE"; id: string }
  | { type: "REMOVE_EDGE"; id: string }
  | { type: "SET_WEIGHT"; id: string; w: number }
  | { type: "SET_SOURCE"; id: string | null }
  | { type: "SET_GOAL"; id: string | null }
  | {
      type: "LOAD_GRAPH";
      graph: Graph;
      sourceId: string | null;
      goalId: string | null;
      activeSavedId?: string | null;
    }
  | { type: "SET_ACTIVE_SAVED_ID"; id: string | null };

const initialPreset: PresetKey = "weighted";
const defaultPresetData = PRESETS[initialPreset];

function getInitialGraphState(): GraphState {
  const draft = loadDraft();
  if (draft && draft.graph && Array.isArray(draft.graph.nodes)) {
    return {
      graph: draft.graph,
      sourceId: draft.sourceId,
      goalId: draft.goalId,
      selection: null,
      tool: "select",
      currentPreset: "custom",
      activeSavedId: draft.activeSavedId,
    };
  }

  return {
    graph: deepCopy(defaultPresetData.graph),
    sourceId: defaultPresetData.sourceId,
    goalId: defaultPresetData.goalId,
    selection: null,
    tool: "select",
    currentPreset: initialPreset,
    activeSavedId: null,
  };
}

function graphReducer(state: GraphState, action: GraphAction): GraphState {
  switch (action.type) {
    case "SET_PRESET": {
      const presetData =
        action.preset === "random"
          ? {
              ...PRESETS.random,
              graph: generateSeededRandomGraph(Date.now()),
            }
          : PRESETS[action.preset];

      return {
        ...state,
        currentPreset: action.preset,
        graph: presetData.graph,
        sourceId: presetData.sourceId,
        goalId: presetData.goalId,
        selection: null,
        activeSavedId: null,
      };
    }

    case "RESET_GRAPH": {
      const presetData =
        state.currentPreset === "random"
          ? {
              ...PRESETS.random,
              graph: generateSeededRandomGraph(42),
            }
          : state.currentPreset === "custom"
            ? PRESETS.weighted
            : PRESETS[state.currentPreset];

      return {
        ...state,
        graph: presetData.graph,
        sourceId: presetData.sourceId,
        goalId: presetData.goalId,
        selection: null,
        activeSavedId: null,
      };
    }

    case "SET_TOOL":
      return {
        ...state,
        tool: action.tool,
      };

    case "SET_SELECTION":
      return {
        ...state,
        selection: action.selection,
      };

    case "ADD_NODE": {
      const label = getNextLabel(state.graph.nodes);
      const id = `node-${label}-${Date.now().toString().slice(-4)}`;
      const newNode = {
        id,
        label,
        x: Math.round(action.x),
        y: Math.round(action.y),
      };
      const updatedGraph = addNodeFn(state.graph, newNode);
      return {
        ...state,
        graph: updatedGraph,
        selection: { type: "node", id },
      };
    }

    case "MOVE_NODE": {
      return {
        ...state,
        graph: moveNodeFn(state.graph, action.id, action.x, action.y),
      };
    }

    case "ADD_EDGE": {
      const updatedGraph = addEdgeFn(state.graph, action.a, action.b, action.w ?? 1);
      return {
        ...state,
        graph: updatedGraph,
      };
    }

    case "REMOVE_NODE": {
      const updatedGraph = removeNodeFn(state.graph, action.id);
      const isSelectedNode =
        state.selection?.type === "node" && state.selection.id === action.id;
      const isSelectedEdgeGone =
        state.selection?.type === "edge" &&
        !updatedGraph.edges.some((e) => e.id === state.selection?.id);

      return {
        ...state,
        graph: updatedGraph,
        sourceId: state.sourceId === action.id ? null : state.sourceId,
        goalId: state.goalId === action.id ? null : state.goalId,
        selection: isSelectedNode || isSelectedEdgeGone ? null : state.selection,
      };
    }

    case "REMOVE_EDGE": {
      const updatedGraph = removeEdgeFn(state.graph, action.id);
      return {
        ...state,
        graph: updatedGraph,
        selection:
          state.selection?.id === action.id ? null : state.selection,
      };
    }

    case "SET_WEIGHT": {
      if (typeof action.w !== "number" || isNaN(action.w) || !isFinite(action.w) || action.w < 1) {
        return state;
      }
      return {
        ...state,
        graph: setWeightFn(state.graph, action.id, action.w),
      };
    }

    case "SET_SOURCE": {
      return {
        ...state,
        sourceId: action.id,
      };
    }

    case "SET_GOAL": {
      return {
        ...state,
        goalId: action.id,
      };
    }

    case "LOAD_GRAPH": {
      return {
        ...state,
        graph: deepCopy(action.graph),
        sourceId: action.sourceId,
        goalId: action.goalId,
        selection: null,
        tool: "select",
        currentPreset: "custom",
        activeSavedId: action.activeSavedId ?? null,
      };
    }

    case "SET_ACTIVE_SAVED_ID": {
      return {
        ...state,
        activeSavedId: action.id,
      };
    }

    default:
      return state;
  }
}

interface GraphContextType {
  state: GraphState;
  dispatch: React.Dispatch<GraphAction>;
  // Action helpers
  setPreset: (preset: PresetKey) => void;
  resetGraph: () => void;
  setTool: (tool: ToolType) => void;
  setSelection: (selection: Selection) => void;
  addNode: (x: number, y: number) => void;
  moveNode: (id: string, x: number, y: number) => void;
  addEdge: (a: string, b: string, w?: number) => void;
  removeNode: (id: string) => void;
  removeEdge: (id: string) => void;
  setWeight: (id: string, w: number) => void;
  setSource: (id: string | null) => void;
  setGoal: (id: string | null) => void;
  loadGraph: (
    graph: Graph,
    sourceId: string | null,
    goalId: string | null,
    activeSavedId?: string | null,
  ) => void;
  setActiveSavedId: (id: string | null) => void;
}

const GraphContext = React.createContext<GraphContextType | null>(null);

export function GraphProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(graphReducer, undefined, getInitialGraphState);

  // Autosave current working graph draft with 500ms debounce
  React.useEffect(() => {
    const timer = setTimeout(() => {
      saveDraft({
        graph: state.graph,
        sourceId: state.sourceId,
        goalId: state.goalId,
        activeSavedId: state.activeSavedId,
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [state.graph, state.sourceId, state.goalId, state.activeSavedId]);

  const value = React.useMemo<GraphContextType>(
    () => ({
      state,
      dispatch,
      setPreset: (preset) => dispatch({ type: "SET_PRESET", preset }),
      resetGraph: () => dispatch({ type: "RESET_GRAPH" }),
      setTool: (tool) => dispatch({ type: "SET_TOOL", tool }),
      setSelection: (selection) => dispatch({ type: "SET_SELECTION", selection }),
      addNode: (x, y) => dispatch({ type: "ADD_NODE", x, y }),
      moveNode: (id, x, y) => dispatch({ type: "MOVE_NODE", id, x, y }),
      addEdge: (a, b, w) => dispatch({ type: "ADD_EDGE", a, b, w }),
      removeNode: (id) => dispatch({ type: "REMOVE_NODE", id }),
      removeEdge: (id) => dispatch({ type: "REMOVE_EDGE", id }),
      setWeight: (id, w) => dispatch({ type: "SET_WEIGHT", id, w }),
      setSource: (id) => dispatch({ type: "SET_SOURCE", id }),
      setGoal: (id) => dispatch({ type: "SET_GOAL", id }),
      loadGraph: (graph, sourceId, goalId, activeSavedId) =>
        dispatch({ type: "LOAD_GRAPH", graph, sourceId, goalId, activeSavedId }),
      setActiveSavedId: (id) => dispatch({ type: "SET_ACTIVE_SAVED_ID", id }),
    }),
    [state],
  );

  return (
    <GraphContext.Provider value={value}>{children}</GraphContext.Provider>
  );
}

export function useGraph(): GraphContextType {
  const context = React.useContext(GraphContext);
  if (!context) {
    throw new Error("useGraph must be used within a GraphProvider");
  }
  return context;
}
