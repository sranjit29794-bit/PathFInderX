import * as React from "react";
import { useSearchParams } from "react-router-dom";
import {
  Activity,
  AlertCircle,
  BarChart3,
  Check,
  ChevronRight,
  CircleDot,
  Download,
  FileText,
  Flag,
  FolderOpen,
  Hand,
  Info,
  Link2,
  MousePointer2,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Save,
  SkipBack,
  SkipForward,
  Trash2,
  Upload,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import Header from "@/components/Header";
import GraphCanvas from "@/components/GraphCanvas";
import Rover from "@/components/Rover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGraph } from "@/state/GraphProvider";
import { usePlayback } from "@/hooks/usePlayback";
import {
  PRESETS,
  type PresetKey,
  type GEdge,
  type GNode,
  getGraphStats,
} from "@/lib/graph";
import {
  ALGORITHMS,
  runAlgorithm,
  type AlgorithmId,
  type RunResult,
} from "@/lib/algorithms";
import {
  type SavedGraph,
  listGraphs,
  getGraph,
  saveGraph,
  exportGraphJson,
  importGraphJson,
  formatRelativeTime,
} from "@/lib/savedGraphs";
import {
  SavedGraphsModal,
  SaveGraphModal,
} from "@/components/SavedGraphsModal";
import { cn } from "@/lib/utils";

function EdgeInspectorSection({
  edge,
  nodeA,
  nodeB,
  onUpdateWeight,
  onDeleteEdge,
}: {
  edge: GEdge;
  nodeA: GNode;
  nodeB: GNode;
  onUpdateWeight: (w: number) => void;
  onDeleteEdge: () => void;
}) {
  const [weightInput, setWeightInput] = React.useState<string>(String(edge.w));

  const handleUpdate = () => {
    const trimmed = weightInput.trim();
    if (trimmed === "") {
      setWeightInput(String(edge.w));
      return;
    }
    const w = parseInt(trimmed, 10);
    if (!isNaN(w) && w >= 1) {
      onUpdateWeight(w);
    } else {
      setWeightInput(String(edge.w));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="font-medium text-sm flex items-center gap-2">
          <span className="font-mono font-bold text-primary">{nodeA.label}</span>
          <span className="text-muted-foreground">⟷</span>
          <span className="font-mono font-bold text-primary">{nodeB.label}</span>
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          Weight: {edge.w}
        </span>
      </div>

      <div className="mt-3">
        <label className="text-muted-foreground text-xs block mb-1">
          Edge Weight (integer ≥ 1)
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            min="1"
            max="99"
            value={weightInput}
            onChange={(e) => setWeightInput(e.target.value)}
            onBlur={handleUpdate}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleUpdate();
            }}
            className="bg-background text-foreground border border-input rounded px-2.5 h-8 text-xs font-mono w-24 focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <Button
            size="sm"
            variant="secondary"
            className="text-xs h-8 flex-1"
            onClick={handleUpdate}
          >
            Update
          </Button>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="text-destructive hover:bg-destructive/10 text-xs w-full mt-3 gap-1.5"
        onClick={onDeleteEdge}
      >
        <Trash2 className="size-3.5" />
        Delete edge
      </Button>
    </div>
  );
}

export function Studio() {
  const {
    state,
    setPreset,
    resetGraph,
    setTool,
    removeNode,
    removeEdge,
    setWeight,
    setSource,
    setGoal,
    loadGraph,
    setActiveSavedId,
  } = useGraph();

  // Algorithm Engine & Replay State
  const [searchParams] = useSearchParams();
  const [selectedAlgorithm, setSelectedAlgorithm] =
    React.useState<AlgorithmId>(() => {
      const algoParam = searchParams.get("algo");
      if (algoParam) {
        const found = ALGORITHMS.find((a) => a.id === algoParam && a.enabled);
        if (found) return found.id;
      }
      return "bfs";
    });

  const algoParam = searchParams.get("algo");
  const [prevAlgoParam, setPrevAlgoParam] = React.useState<string | null>(algoParam);
  if (algoParam !== prevAlgoParam) {
    setPrevAlgoParam(algoParam);
    if (algoParam) {
      const found = ALGORITHMS.find((a) => a.id === algoParam && a.enabled);
      if (found) {
        setSelectedAlgorithm(found.id);
      }
    }
  }
  const [run, setRun] = React.useState<RunResult | null>(null);
  const [stale, setStale] = React.useState<boolean>(false);
  const [runError, setRunError] = React.useState<string | null>(null);
  const [rightTab, setRightTab] =
    React.useState<"element" | "algorithms" | "inspector">("element");

  // Saved Graphs & Modals state
  const [isMyGraphsOpen, setIsMyGraphsOpen] = React.useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = React.useState(false);
  const [isSaveAsMode, setIsSaveAsMode] = React.useState(false);
  const [savedGraphsList, setSavedGraphsList] = React.useState<SavedGraph[]>(() => listGraphs());
  const rightPanelFileInputRef = React.useRef<HTMLInputElement | null>(null);

  // Toast Notification state
  const [toast, setToast] = React.useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const toastTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = React.useCallback(
    (message: string, type: "success" | "error" | "info" = "success") => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      setToast({ message, type });
      toastTimerRef.current = setTimeout(() => setToast(null), 3500);
    },
    [],
  );

  const refreshSavedList = React.useCallback(() => {
    setSavedGraphsList(listGraphs());
  }, []);

  const activeSavedGraph = React.useMemo(() => {
    return state.activeSavedId ? getGraph(state.activeSavedId) : null;
  }, [state.activeSavedId]);

  // Unsaved changes detection
  const isUnsaved = React.useMemo(() => {
    if (activeSavedGraph) {
      if (state.sourceId !== activeSavedGraph.sourceId) return true;
      if (state.goalId !== activeSavedGraph.goalId) return true;
      return JSON.stringify(state.graph) !== JSON.stringify(activeSavedGraph.graph);
    }
    if (state.currentPreset === "weighted") {
      const def = PRESETS.weighted;
      if (state.sourceId !== def.sourceId || state.goalId !== def.goalId) return true;
      return JSON.stringify(state.graph) !== JSON.stringify(def.graph);
    }
    return true;
  }, [activeSavedGraph, state.graph, state.sourceId, state.goalId, state.currentPreset]);

  // Handle Save (overwrite existing if loaded, otherwise open save modal)
  const handleSave = () => {
    try {
      if (state.activeSavedId) {
        const existing = getGraph(state.activeSavedId);
        if (existing) {
          saveGraph(existing.name, state.graph, state.sourceId, state.goalId, existing.id);
          refreshSavedList();
          showToast(`Saved "${existing.name}"`, "success");
          return;
        }
      }
      setIsSaveAsMode(false);
      setIsSaveModalOpen(true);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Storage unavailable: Unable to save graph.";
      showToast(msg, "error");
    }
  };

  const handleSaveAs = () => {
    setIsSaveAsMode(true);
    setIsSaveModalOpen(true);
  };

  const handleSaveModalSubmit = (name: string) => {
    try {
      const saved = saveGraph(name, state.graph, state.sourceId, state.goalId);
      setActiveSavedId(saved.id);
      refreshSavedList();
      showToast(`Saved "${saved.name}"`, "success");
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Storage unavailable: Unable to save graph.";
      showToast(msg, "error");
    }
  };

  const handleLoadGraph = (saved: SavedGraph) => {
    loadGraph(saved.graph, saved.sourceId, saved.goalId, saved.id);
    setRun(null);
    setStale(false);
    playback.restart();
    refreshSavedList();
    showToast(`Loaded "${saved.name}"`, "success");
    setIsMyGraphsOpen(false);
  };

  const handleExport = (saved: SavedGraph) => {
    try {
      const jsonStr = exportGraphJson(saved);
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const safeName = saved.name.replace(/[^a-z0-9_-]/gi, "_").toLowerCase();
      a.href = url;
      a.download = `pathfinder_${safeName}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast(`Exported "${saved.name}"`, "success");
    } catch {
      showToast("Failed to export JSON", "error");
    }
  };

  const handleRightPanelImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const res = importGraphJson(text);
      if (!res.success) {
        showToast("Import error: " + res.error, "error");
        return;
      }
      saveGraph(res.data.name, res.data.graph, res.data.sourceId, res.data.goalId);
      refreshSavedList();
      showToast(`Imported "${res.data.name}"`, "success");
    } catch {
      showToast("Failed to read file", "error");
    } finally {
      if (rightPanelFileInputRef.current) {
        rightPanelFileInputRef.current.value = "";
      }
    }
  };

  // Track the snapshot of the graph when the algorithm was run
  const lastRunGraphRef = React.useRef<{
    nodes: typeof state.graph.nodes;
    edges: typeof state.graph.edges;
    sourceId: string | null;
    goalId: string | null;
  } | null>(null);

  // Playback controller
  const totalSteps = run ? run.steps.length : 0;
  const playback = usePlayback(totalSteps);
  const currentStep = run && totalSteps > 0 ? run.steps[playback.index] : null;

  // Detect graph or endpoint changes after an active run
  React.useEffect(() => {
    if (!run || !lastRunGraphRef.current) return;

    if (
      lastRunGraphRef.current.nodes !== state.graph.nodes ||
      lastRunGraphRef.current.edges !== state.graph.edges ||
      lastRunGraphRef.current.sourceId !== state.sourceId ||
      lastRunGraphRef.current.goalId !== state.goalId
    ) {
      setStale(true);
      playback.pause();
    }
  }, [
    state.graph.nodes,
    state.graph.edges,
    state.sourceId,
    state.goalId,
    run,
    playback,
  ]);

  // Execute Algorithm
  const handleRunAlgorithm = () => {
    try {
      setRunError(null);
      const sourceExists = state.sourceId
        ? state.graph.nodes.some((n) => n.id === state.sourceId)
        : false;
      const goalExists = state.goalId
        ? state.graph.nodes.some((n) => n.id === state.goalId)
        : false;

      if (!state.sourceId || !sourceExists || !state.goalId || !goalExists) {
        throw new Error("Set a source and destination first.");
      }

      const result = runAlgorithm(
        selectedAlgorithm,
        state.graph,
        state.sourceId,
        state.goalId,
      );

      setRun(result);
      setStale(false);
      lastRunGraphRef.current = {
        nodes: state.graph.nodes,
        edges: state.graph.edges,
        sourceId: state.sourceId,
        goalId: state.goalId,
      };

      playback.restart();
      setRightTab("inspector");
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to run algorithm.";
      setRunError(msg);
    }
  };

  const stats = React.useMemo(() => getGraphStats(state.graph), [state.graph]);

  // Map of nodes for quick coordinate lookups
  const nodeMap = React.useMemo(() => {
    const map = new Map<string, GNode>();
    for (const n of state.graph.nodes) {
      map.set(n.id, n);
    }
    return map;
  }, [state.graph.nodes]);

  // Selected item details for element inspector
  const selectedNode =
    state.selection?.type === "node"
      ? state.graph.nodes.find((n) => n.id === state.selection?.id)
      : null;

  const selectedEdge =
    state.selection?.type === "edge"
      ? state.graph.edges.find((e) => e.id === state.selection?.id)
      : null;

  const selectedEdgeNodeA = selectedEdge
    ? state.graph.nodes.find((n) => n.id === selectedEdge.a)
    : null;
  const selectedEdgeNodeB = selectedEdge
    ? state.graph.nodes.find((n) => n.id === selectedEdge.b)
    : null;

  // Path edges on final step
  const currentPathEdgeIds = React.useMemo(() => {
    if (
      !currentStep ||
      !currentStep.done ||
      !currentStep.found ||
      !currentStep.path ||
      currentStep.path.length < 2
    ) {
      return [];
    }
    const pathNodes = currentStep.path;
    const edgeIds: string[] = [];
    for (let i = 0; i < pathNodes.length - 1; i++) {
      const u = pathNodes[i];
      const v = pathNodes[i + 1];
      const e = state.graph.edges.find(
        (edge) =>
          (edge.a === u && edge.b === v) || (edge.a === v && edge.b === u),
      );
      if (e) edgeIds.push(e.id);
    }
    return edgeIds;
  }, [currentStep, state.graph.edges]);

  // Target coordinates for Rover glyph
  let roverTargetNode: GNode | null = null;
  if (run && currentStep) {
    if (currentStep.current) {
      roverTargetNode = nodeMap.get(currentStep.current) ?? null;
    } else if (currentStep.done) {
      if (currentStep.found && state.goalId) {
        roverTargetNode = nodeMap.get(state.goalId) ?? null;
      } else if (state.sourceId) {
        roverTargetNode = nodeMap.get(state.sourceId) ?? null;
      }
    } else if (state.sourceId) {
      roverTargetNode = nodeMap.get(state.sourceId) ?? null;
    }
  }

  // Canvas interactivity rule: not editable while playing; re-enabled when paused at step 0 or when no run
  const isCanvasInteractive =
    !playback.playing && (playback.index === 0 || !run);

  const currentPresetName =
    state.currentPreset !== "custom"
      ? PRESETS[state.currentPreset]?.name
      : "Custom Graph";

  return (
    <div className="h-screen max-h-screen bg-background text-foreground flex flex-col overflow-hidden">
      <Header />

      {/* Subheader Toolbar */}
      <div className="bg-card border-b border-border flex px-5 items-center shrink-0 gap-2.5 h-13 z-10 overflow-x-auto">
        {/* Active Graph Indicator with Unsaved changes dot */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 bg-muted/40 border border-border/80 rounded-md text-xs shrink-0"
          title={activeSavedGraph ? `Saved as: ${activeSavedGraph.name}` : "Working Draft"}
        >
          <FileText className="size-3.5 text-primary" />
          <span className="font-semibold text-foreground truncate max-w-32.5">
            {activeSavedGraph
              ? activeSavedGraph.name
              : state.currentPreset === "custom"
                ? "Custom Draft"
                : currentPresetName.split("/")[0]?.trim()}
          </span>
          {isUnsaved && (
            <span
              className="size-2 rounded-full bg-amber-500 animate-pulse ml-0.5"
              title="Unsaved changes"
            />
          )}
        </div>

        {/* Save button */}
        <Button
          variant="outline"
          size="sm"
          className="text-xs gap-1.5 h-8 font-medium cursor-pointer shrink-0"
          onClick={handleSave}
          title={
            state.activeSavedId
              ? `Overwrite "${activeSavedGraph?.name || ""}"`
              : "Save current graph"
          }
        >
          <Save className="size-3.5" />
          Save
        </Button>

        {/* Save as... button */}
        <Button
          variant="outline"
          size="sm"
          className="text-xs gap-1.5 h-8 font-medium cursor-pointer shrink-0"
          onClick={handleSaveAs}
          title="Save as a new named graph"
        >
          <Plus className="size-3.5" />
          Save as…
        </Button>

        {/* My graphs button */}
        <Button
          variant="outline"
          size="sm"
          className="text-xs gap-1.5 h-8 font-medium cursor-pointer shrink-0"
          onClick={() => {
            refreshSavedList();
            setIsMyGraphsOpen(true);
          }}
          title="Manage and load saved graphs"
        >
          <FolderOpen className="size-3.5" />
          My graphs
        </Button>

        <div className="bg-border w-px h-5 mx-1 shrink-0" />

        {/* Preset Select */}
        <select
          value={state.currentPreset}
          onChange={(e) => {
            setPreset(e.target.value as PresetKey);
            setRun(null);
            setStale(false);
            playback.restart();
          }}
          className="bg-background text-xs text-foreground border border-input rounded-md px-2.5 h-8 w-44 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer font-medium shrink-0"
        >
          <option value="weighted">Weighted / 13 nodes</option>
          <option value="small">Small / 6 nodes</option>
          <option value="maze">Maze / 10 nodes</option>
          <option value="dense">Dense / 8 nodes</option>
          <option value="random">Random / 9 nodes</option>
          {state.currentPreset === "custom" && (
            <option value="custom">Custom / {state.graph.nodes.length} nodes</option>
          )}
        </select>

        {/* Reset Graph */}
        <Button
          variant="outline"
          size="sm"
          className="text-xs gap-1.5 h-8 font-medium cursor-pointer shrink-0"
          onClick={() => {
            resetGraph();
            setRun(null);
            setStale(false);
            playback.restart();
          }}
          title="Reset graph to preset default"
        >
          <RotateCcw className="size-3.5" />
          Reset
        </Button>

        {/* Stale Run Badge */}
        {stale && (
          <Badge
            variant="outline"
            className="bg-amber-500/10 text-amber-500 border-amber-500/30 text-xs gap-1 py-1 px-2.5 animate-pulse"
          >
            <AlertCircle className="size-3" />
            Graph changed — run again
          </Badge>
        )}

        {/* Inline Error Message */}
        {runError && (
          <div className="text-destructive text-xs flex items-center gap-1 bg-destructive/10 border border-destructive/20 rounded px-2.5 py-1">
            <AlertCircle className="size-3.5" />
            <span>{runError}</span>
          </div>
        )}

        {/* Algorithm Quick Selector & Run CTA */}
        <div className="flex items-center gap-2 ml-auto">
          <select
            value={selectedAlgorithm}
            onChange={(e) => {
              setSelectedAlgorithm(e.target.value as AlgorithmId);
              playback.pause();
            }}
            className="bg-background text-xs text-foreground border border-input rounded-md px-2.5 h-8 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer font-medium"
            title="Selected algorithm for execution"
          >
            <option value="bfs">BFS (Breadth-First)</option>
            <option value="dijkstra">Dijkstra's Algorithm</option>
            <option value="dfs">DFS (Depth-First)</option>
            <option value="astar" disabled title="Coming soon">
              A* Search (Coming soon)
            </option>
          </select>

          <Button
            size="sm"
            className="font-semibold text-xs px-4 gap-2 h-8"
            onClick={handleRunAlgorithm}
          >
            <Play className="fill-primary-foreground size-3.5" />
            Run algorithm
          </Button>
        </div>
      </div>

      {/* Main Studio Body */}
      <div className="flex flex-1 min-h-0 relative">
        {/* Left Tool Rail */}
        <aside
          aria-label="Graph editing tools"
          className="bg-sidebar border-r border-border flex py-3 flex-col items-center shrink-0 gap-1.5 w-14 z-10"
        >
          <Button
            variant={state.tool === "select" ? "default" : "ghost"}
            size="icon"
            className={cn(
              "size-9",
              state.tool === "select" && "shadow-xs",
              !isCanvasInteractive && "opacity-40 cursor-not-allowed",
            )}
            disabled={!isCanvasInteractive}
            onClick={() => setTool("select")}
            title="Select tool: click node/edge to inspect, drag node to move"
          >
            <MousePointer2 className="size-4" />
          </Button>

          <Button
            variant={state.tool === "add" ? "default" : "ghost"}
            size="icon"
            className={cn(
              "size-9",
              state.tool === "add" && "shadow-xs",
              !isCanvasInteractive && "opacity-40 cursor-not-allowed",
            )}
            disabled={!isCanvasInteractive}
            onClick={() => setTool("add")}
            title="Add node: click anywhere on the canvas to place a node"
          >
            <Plus className="size-4" />
          </Button>

          <Button
            variant={state.tool === "connect" ? "default" : "ghost"}
            size="icon"
            className={cn(
              "size-9",
              state.tool === "connect" && "shadow-xs",
              !isCanvasInteractive && "opacity-40 cursor-not-allowed",
            )}
            disabled={!isCanvasInteractive}
            onClick={() => setTool("connect")}
            title="Connect tool: click node A then node B to add an edge"
          >
            <Link2 className="size-4" />
          </Button>

          <Button
            variant={state.tool === "delete" ? "default" : "ghost"}
            size="icon"
            className={cn(
              "size-9",
              state.tool === "delete" && "shadow-xs",
              !isCanvasInteractive && "opacity-40 cursor-not-allowed",
            )}
            disabled={!isCanvasInteractive}
            onClick={() => setTool("delete")}
            title="Delete tool: click any node or edge to remove it"
          >
            <Trash2 className="size-4" />
          </Button>

          <div className="bg-border w-6 h-px my-1.5" />

          <Button
            variant="ghost"
            size="icon"
            className="size-9 opacity-40 cursor-not-allowed"
            disabled
            title="Pan canvas (Not in this build)"
          >
            <Hand className="size-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="size-9 opacity-40 cursor-not-allowed"
            disabled
            title="Zoom in (Not in this build)"
          >
            <ZoomIn className="size-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="size-9 opacity-40 cursor-not-allowed"
            disabled
            title="Zoom out (Not in this build)"
          >
            <ZoomOut className="size-4" />
          </Button>
        </aside>

        {/* Central Graph Workspace */}
        <section
          aria-label="Graph editor workspace"
          className="flex-1 min-w-0 h-full relative bg-muted/20 flex flex-col overflow-hidden"
        >
          {/* Active Tool Helper Banner */}
          {state.tool === "add" && isCanvasInteractive && (
            <div className="bg-primary/10 border-b border-primary/20 px-4 py-1.5 text-xs text-primary flex items-center justify-between shrink-0">
              <span>
                Add node mode: click anywhere on the canvas grid to place a new
                node.
              </span>
              <button
                type="button"
                onClick={() => setTool("select")}
                className="text-primary hover:underline text-[11px] font-semibold ml-2 cursor-pointer"
              >
                Done
              </button>
            </div>
          )}

          {state.tool === "connect" && isCanvasInteractive && (
            <div className="bg-primary/10 border-b border-primary/20 px-4 py-1.5 text-xs text-primary flex items-center justify-between shrink-0">
              <span>
                Connect mode: click the first node, then click the second node
                to create an edge.
              </span>
              <button
                type="button"
                onClick={() => setTool("select")}
                className="text-primary hover:underline text-[11px] font-semibold ml-2 cursor-pointer"
              >
                Done
              </button>
            </div>
          )}

          {state.tool === "delete" && isCanvasInteractive && (
            <div className="bg-destructive/10 border-b border-destructive/20 px-4 py-1.5 text-xs text-destructive flex items-center justify-between shrink-0">
              <span>
                Delete mode: click on any node or edge line to remove it
                immediately.
              </span>
              <button
                type="button"
                onClick={() => setTool("select")}
                className="text-muted-foreground hover:text-foreground text-[11px] underline ml-2 cursor-pointer"
              >
                Done
              </button>
            </div>
          )}

          {!isCanvasInteractive && (
            <div className="bg-muted/80 backdrop-blur-xs border-b border-border px-4 py-1 text-xs text-muted-foreground flex items-center justify-between shrink-0">
              <span>
                Playback active · Canvas editing paused to preserve execution
                replay.
              </span>
              <button
                type="button"
                onClick={playback.restart}
                className="text-primary hover:underline text-[11px] font-semibold ml-2 cursor-pointer"
              >
                Reset to Step 0 to edit
              </button>
            </div>
          )}

          <div className="flex-1 size-full relative">
            <GraphCanvas
              graph={state.graph}
              interactive={isCanvasInteractive}
              nodeStates={currentStep ? currentStep.nodeStates : undefined}
              examinedEdge={currentStep ? currentStep.examinedEdge : undefined}
              pathEdges={currentPathEdgeIds}
              showLegend={true}
            >
              {Boolean(run) && roverTargetNode && (
                <Rover
                  key={run ? `${run.algorithm}-${state.sourceId}-${state.goalId}` : "none"}
                  x={roverTargetNode.x}
                  y={roverTargetNode.y}
                  isProcessing={
                    playback.playing && Boolean(currentStep?.current) && !currentStep?.done
                  }
                  isPlaying={playback.playing}
                  hasRun={Boolean(run)}
                  speed={playback.speed}
                />
              )}
            </GraphCanvas>
          </div>
        </section>

        {/* Right Inspector Panel with 3 Tabs */}
        <aside
          aria-label="Studio side panel"
          className="bg-card border-l border-border shrink-0 w-80 flex flex-col overflow-hidden z-10"
        >
          {/* Tab Header */}
          <div className="border-b border-border flex items-center px-2 bg-muted/20 shrink-0">
            <button
              type="button"
              onClick={() => setRightTab("element")}
              className={cn(
                "px-3.5 py-2.5 text-xs font-semibold relative transition-colors cursor-pointer",
                rightTab === "element"
                  ? "text-primary after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Element
            </button>
            <button
              type="button"
              onClick={() => setRightTab("algorithms")}
              className={cn(
                "px-3.5 py-2.5 text-xs font-semibold relative transition-colors cursor-pointer",
                rightTab === "algorithms"
                  ? "text-primary after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Algorithms
            </button>
            <button
              type="button"
              onClick={() => setRightTab("inspector")}
              className={cn(
                "px-3.5 py-2.5 text-xs font-semibold relative transition-colors flex items-center gap-1.5 cursor-pointer",
                rightTab === "inspector"
                  ? "text-primary after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Inspector
              {run && (
                <span className="rounded-full bg-primary/20 text-primary text-[9px] px-1.5 py-0.2 font-mono font-bold">
                  LIVE
                </span>
              )}
            </button>
          </div>

          {/* Tab Body */}
          <div className="flex-1 overflow-y-auto">
            {/* TAB 1: ELEMENT INSPECTOR */}
            {rightTab === "element" && (
              <div>
                {/* Selected Element Section */}
                <div className="border-b border-border p-4">
                  <div className="flex mb-3 justify-between items-center">
                    <h2 className="font-semibold text-sm">Selected element</h2>
                    {selectedNode ? (
                      <Badge
                        variant="default"
                        size="sm"
                        className="font-mono text-[10px]"
                      >
                        NODE
                      </Badge>
                    ) : selectedEdge ? (
                      <Badge
                        variant="secondary"
                        size="sm"
                        className="font-mono text-[10px]"
                      >
                        EDGE
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground text-[10px] font-mono">
                        NONE
                      </span>
                    )}
                  </div>

                  {selectedNode ? (
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="font-semibold rounded-md bg-primary/10 text-primary border border-primary flex justify-center items-center size-9 font-mono">
                          {selectedNode.label}
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            Node {selectedNode.label}
                          </p>
                          <p className="font-mono text-muted-foreground text-xs">
                            x {selectedNode.x} · y {selectedNode.y}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <Button
                          variant={
                            selectedNode.id === state.sourceId
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          className="text-xs gap-1.5"
                          onClick={() => setSource(selectedNode.id)}
                        >
                          <CircleDot className="size-3.5" />
                          {selectedNode.id === state.sourceId
                            ? "Source"
                            : "Set source"}
                        </Button>
                        <Button
                          variant={
                            selectedNode.id === state.goalId
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          className="text-xs gap-1.5"
                          onClick={() => setGoal(selectedNode.id)}
                        >
                          <Flag className="size-3.5" />
                          {selectedNode.id === state.goalId
                            ? "Goal"
                            : "Set goal"}
                        </Button>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10 text-xs w-full mt-2 gap-1.5"
                        onClick={() => removeNode(selectedNode.id)}
                      >
                        <Trash2 className="size-3.5" />
                        Delete node
                      </Button>
                    </div>
                  ) : selectedEdge && selectedEdgeNodeA && selectedEdgeNodeB ? (
                    <EdgeInspectorSection
                      key={`${selectedEdge.id}-${selectedEdge.w}`}
                      edge={selectedEdge}
                      nodeA={selectedEdgeNodeA}
                      nodeB={selectedEdgeNodeB}
                      onUpdateWeight={(w) => setWeight(selectedEdge.id, w)}
                      onDeleteEdge={() => removeEdge(selectedEdge.id)}
                    />
                  ) : (
                    <div className="text-muted-foreground text-xs py-2 leading-relaxed">
                      Click any node or edge on the canvas to inspect, rename,
                      reposition, or configure roles.
                    </div>
                  )}
                </div>

                {/* Start and Destination Selection */}
                <div className="border-b border-border p-4">
                  <h2 className="font-semibold text-sm mb-3">
                    Start and destination
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <label className="text-muted-foreground text-xs block mb-1">
                        Source node (Start)
                      </label>
                      <select
                        value={state.sourceId ?? ""}
                        onChange={(e) => setSource(e.target.value || null)}
                        className="bg-background text-xs text-foreground border border-input rounded-md px-2.5 h-8 w-full focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer font-mono"
                      >
                        <option value="" disabled>
                          {state.graph.nodes.length === 0
                            ? "No nodes available"
                            : "Select source node..."}
                        </option>
                        {state.graph.nodes.map((node) => (
                          <option key={node.id} value={node.id}>
                            Node {node.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-muted-foreground text-xs block mb-1">
                        Destination node (Goal)
                      </label>
                      <select
                        value={state.goalId ?? ""}
                        onChange={(e) => setGoal(e.target.value || null)}
                        className="bg-background text-xs text-foreground border border-input rounded-md px-2.5 h-8 w-full focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer font-mono"
                      >
                        <option value="" disabled>
                          {state.graph.nodes.length === 0
                            ? "No nodes available"
                            : "Select goal node..."}
                        </option>
                        {state.graph.nodes.map((node) => (
                          <option key={node.id} value={node.id}>
                            Node {node.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Graph Statistics */}
                <div className="border-b border-border p-4">
                  <h2 className="font-semibold text-sm mb-3">
                    Graph statistics
                  </h2>
                  <div className="text-xs grid gap-y-3 grid-cols-2">
                    <div>
                      <span className="text-muted-foreground block">Nodes</span>
                      <span className="font-mono font-medium text-foreground">
                        {stats.nodeCount}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Edges</span>
                      <span className="font-mono font-medium text-foreground">
                        {stats.edgeCount}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">
                        Topology
                      </span>
                      <span className="font-medium text-foreground">
                        {stats.topology}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">
                        Weights
                      </span>
                      <span className="font-medium text-foreground">
                        {stats.isWeighted ? "Weighted" : "Unweighted"}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-muted-foreground block">
                        Density
                      </span>
                      <span className="font-mono font-medium text-foreground">
                        {stats.densityPercent}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Preset Quick Links */}
                <div className="p-4 border-b border-border">
                  <h2 className="font-semibold text-sm mb-2.5">
                    Switch presets
                  </h2>
                  <div className="space-y-1">
                    {(Object.keys(PRESETS) as PresetKey[]).map((key) => {
                      const isCurrent = state.currentPreset === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => {
                            setPreset(key);
                            setRun(null);
                            setStale(false);
                          }}
                          className={cn(
                            "text-left rounded-sm text-xs flex px-2.5 py-2 justify-between items-center w-full transition-colors cursor-pointer",
                            isCurrent
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:bg-accent hover:text-foreground",
                          )}
                        >
                          <span>{PRESETS[key].name}</span>
                          {isCurrent ? (
                            <Check className="size-3.5 text-primary" />
                          ) : (
                            <ChevronRight className="size-3.5 opacity-60" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* My Saved Graphs List in Right Panel */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <FolderOpen className="size-3.5 text-primary" />
                      <h2 className="font-semibold text-sm">My graphs</h2>
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4">
                        {savedGraphsList.length}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <input
                        ref={rightPanelFileInputRef}
                        type="file"
                        accept=".json,application/json"
                        className="hidden"
                        onChange={handleRightPanelImport}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-1.5 text-xs text-muted-foreground hover:text-foreground gap-1 cursor-pointer"
                        onClick={() => rightPanelFileInputRef.current?.click()}
                        title="Import a graph from JSON"
                      >
                        <Upload className="size-3" />
                        Import
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-1.5 text-xs text-primary hover:text-primary gap-1 cursor-pointer"
                        onClick={() => {
                          refreshSavedList();
                          setIsMyGraphsOpen(true);
                        }}
                      >
                        Manage
                      </Button>
                    </div>
                  </div>

                  {savedGraphsList.length === 0 ? (
                    <div className="p-3 rounded-lg border border-dashed border-border text-center text-xs text-muted-foreground">
                      No saved graphs yet.
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2 h-7 text-xs gap-1 cursor-pointer"
                        onClick={() => setIsSaveModalOpen(true)}
                      >
                        <Plus className="size-3" />
                        Save current graph
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                      {savedGraphsList.map((g) => {
                        const isActive = g.id === state.activeSavedId;
                        return (
                          <div
                            key={g.id}
                            className={cn(
                              "p-2 rounded-md border text-xs flex flex-col gap-1 transition-colors",
                              isActive
                                ? "border-primary/50 bg-primary/5"
                                : "border-border/80 hover:border-primary/30 bg-card/60",
                            )}
                          >
                            <div className="flex items-center justify-between gap-1">
                              <span
                                className="font-semibold text-foreground truncate max-w-32.5"
                                title={g.name}
                              >
                                {g.name}
                              </span>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant={isActive ? "secondary" : "default"}
                                  size="sm"
                                  className="h-6 px-2 text-[11px] cursor-pointer"
                                  onClick={() => handleLoadGraph(g)}
                                  title="Load graph"
                                >
                                  Load
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="size-6 text-muted-foreground hover:text-foreground cursor-pointer"
                                  onClick={() => handleExport(g)}
                                  title="Export JSON"
                                >
                                  <Download className="size-3" />
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                              <span>
                                {g.graph.nodes.length} nodes · {g.graph.edges.length} edges
                              </span>
                              <span>{formatRelativeTime(g.updatedAt)}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: ALGORITHMS SELECTION */}
            {rightTab === "algorithms" && (
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider">
                    Available Algorithms
                  </h3>
                  <Badge variant="outline" size="sm" className="text-[10px]">
                    Single Active
                  </Badge>
                </div>

                {ALGORITHMS.map((algo) => {
                  const isSelected = selectedAlgorithm === algo.id;
                  return (
                    <div
                      key={algo.id}
                      onClick={() => {
                        if (algo.enabled) {
                          setSelectedAlgorithm(algo.id as AlgorithmId);
                        }
                      }}
                      className={cn(
                        "rounded-lg border p-3.5 transition-all text-left flex flex-col gap-2 relative",
                        !algo.enabled &&
                          "opacity-50 cursor-not-allowed bg-muted/40",
                        algo.enabled &&
                          isSelected &&
                          "border-primary bg-primary/5 ring-1 ring-primary cursor-pointer",
                        algo.enabled &&
                          !isSelected &&
                          "border-border hover:border-border/80 hover:bg-accent/40 cursor-pointer",
                      )}
                      title={!algo.enabled ? "Coming soon" : undefined}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="selected-algo"
                            checked={isSelected}
                            disabled={!algo.enabled}
                            onChange={() => {
                              if (algo.enabled) {
                                setSelectedAlgorithm(algo.id as AlgorithmId);
                              }
                            }}
                            className="accent-primary"
                          />
                          <span className="font-semibold text-sm">
                            {algo.name}
                          </span>
                        </div>
                        <Badge
                          variant={algo.enabled ? "default" : "outline"}
                          size="sm"
                          className="text-[10px]"
                        >
                          {algo.kind}
                        </Badge>
                      </div>

                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {algo.shortDesc}
                      </p>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/50 text-[11px] font-mono">
                        <div>
                          <span className="text-muted-foreground block text-[10px]">
                            Time
                          </span>
                          <span className="font-semibold text-primary">
                            {algo.timeComplexity}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block text-[10px]">
                            Space
                          </span>
                          <span className="font-semibold text-foreground">
                            {algo.spaceComplexity}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* TAB 3: LIVE EXECUTION INSPECTOR */}
            {rightTab === "inspector" && (
              <div>
                {!run || !currentStep ? (
                  <div className="p-8 text-center flex flex-col items-center justify-center text-muted-foreground min-h-90">
                    <Activity className="size-8 mb-3 text-muted-foreground/40" />
                    <h3 className="font-semibold text-sm text-foreground mb-1">
                      Inspector Idle
                    </h3>
                    <p className="text-xs max-w-52 leading-relaxed">
                      Run an algorithm to inspect it. Live queue state,
                      pseudocode, and complexity telemetry will appear here.
                    </p>
                    <Button
                      size="sm"
                      className="mt-4 gap-1.5 text-xs font-semibold"
                      onClick={handleRunAlgorithm}
                    >
                      <Play className="size-3.5 fill-current" />
                      Run now
                    </Button>
                  </div>
                ) : (
                  <div className="p-4 space-y-4">
                    {/* Data Structure Inspector */}
                    <section className="rounded-lg bg-card border border-border p-3.5 shadow-xs">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold text-xs uppercase tracking-wide">
                          Structure Inspector
                        </h3>
                        <span className="font-mono rounded bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5">
                          {currentStep.structure.kind.toUpperCase()}
                        </span>
                      </div>

                      {/* Current Node */}
                      <div className="flex items-center gap-3 bg-muted/40 p-2.5 rounded-md border border-border">
                        <div className="font-semibold font-mono rounded bg-primary text-primary-foreground text-sm flex justify-center items-center size-9 shadow-xs">
                          {currentStep.current
                            ? (nodeMap.get(currentStep.current)?.label ??
                              currentStep.current)
                            : "—"}
                        </div>
                        <div>
                          <div className="font-semibold text-xs text-primary">
                            {currentStep.current
                              ? `Current: Node ${nodeMap.get(currentStep.current)?.label ?? currentStep.current}`
                              : currentStep.done
                                ? currentStep.found
                                  ? "Goal Reached"
                                  : "Unreachable"
                                : "Idle"}
                          </div>
                          <div className="text-muted-foreground text-[11px]">
                            {currentStep.done
                              ? "Traversal finished"
                              : currentStep.current
                                ? "Examining adjacent neighbors"
                                : currentStep.structure.kind === "stack"
                                  ? "Awaiting next pop"
                                  : "Awaiting next dequeue"}
                          </div>
                        </div>
                      </div>

                      {/* Pending Items in Queue / Stack */}
                      <div className="mt-3 pt-3 border-t border-border">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-muted-foreground text-xs">
                            {currentStep.structure.kind === "stack"
                              ? "Stack (LIFO)"
                              : currentStep.structure.kind === "priority-queue"
                                ? "Priority Queue (Min-Heap)"
                                : "Queue (FIFO)"}{" "}
                            ({currentStep.structure.items.length})
                          </span>
                        </div>

                        {currentStep.structure.items.length === 0 ? (
                          <div className="text-muted-foreground text-xs italic py-1">
                            {currentStep.structure.kind === "stack"
                              ? "(Empty stack)"
                              : "(Empty queue)"}
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-1.5">
                            {currentStep.structure.items.map((item, idx) => {
                              const label =
                                nodeMap.get(item.id)?.label ?? item.id;
                              const isTop =
                                currentStep.structure.kind === "stack" &&
                                idx === currentStep.structure.items.length - 1;
                              return (
                                <span
                                  key={`${item.id}-${idx}`}
                                  className={cn(
                                    "font-mono text-xs rounded border px-2 py-1 flex items-center gap-1.5 shadow-xs transition-colors",
                                    isTop
                                      ? "bg-primary/15 border-primary text-primary font-bold ring-1 ring-primary/40"
                                      : "bg-muted border-border text-foreground",
                                  )}
                                >
                                  <strong>{label}</strong>
                                  {item.priority !== undefined && (
                                    <span className="text-primary text-[10px] font-bold">
                                      w:{item.priority}
                                    </span>
                                  )}
                                  {isTop && (
                                    <span className="bg-primary text-primary-foreground text-[9px] uppercase px-1 py-0.5 rounded font-extrabold tracking-wider">
                                      TOP
                                    </span>
                                  )}
                                </span>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </section>

                    {/* Pseudocode Highlighter */}
                    <section className="rounded-lg bg-card border border-border p-3.5 shadow-xs">
                      <div className="flex justify-between items-center mb-2.5">
                        <h3 className="font-semibold text-xs uppercase tracking-wide">
                          Pseudocode
                        </h3>
                        <span className="text-muted-foreground text-[10px] font-mono">
                          {run.algorithm.toUpperCase()}
                        </span>
                      </div>

                      <div className="font-mono text-xs space-y-0.5 bg-muted/30 p-2 rounded-md border border-border">
                        {run.pseudocode.map((lineText, idx) => {
                          const isCurrentLine = currentStep.line === idx;
                          return (
                            <div
                              key={idx}
                              className={cn(
                                "flex px-2 py-1 rounded text-[11px] gap-2 transition-colors items-center",
                                isCurrentLine
                                  ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                                  : "text-muted-foreground",
                              )}
                            >
                              <span className="w-4 text-right opacity-60 font-mono text-[10px] shrink-0">
                                {idx + 1}
                              </span>
                              {isCurrentLine ? (
                                <span className="text-[10px] text-primary-foreground shrink-0">▶</span>
                              ) : (
                                <span className="w-2.5 shrink-0" />
                              )}
                              <span className="truncate">{lineText}</span>
                            </div>
                          );
                        })}
                      </div>
                    </section>

                    {/* Live Telemetry & Complexity */}
                    <section className="rounded-lg bg-card border border-border p-3.5 shadow-xs">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold text-xs uppercase tracking-wide">
                          Live Telemetry
                        </h3>
                        <BarChart3 className="text-muted-foreground size-3.5" />
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-muted/40 p-2.5 rounded border border-border">
                          <span className="text-muted-foreground block text-[10px]">
                            Time Complexity
                          </span>
                          <span className="font-mono font-bold text-primary text-sm">
                            {run.timeComplexity}
                          </span>
                        </div>
                        <div className="bg-muted/40 p-2.5 rounded border border-border">
                          <span className="text-muted-foreground block text-[10px]">
                            Space Complexity
                          </span>
                          <span className="font-mono font-bold text-foreground text-sm">
                            {run.spaceComplexity}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-y-2.5 pt-3 mt-3 border-t border-border text-xs">
                        <div>
                          <span className="text-muted-foreground block text-[10px]">
                            Visited
                          </span>
                          <span className="font-mono font-semibold">
                            {currentStep.visitedCount} / {stats.nodeCount}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block text-[10px]">
                            Edges Examined
                          </span>
                          <span className="font-mono font-semibold">
                            {currentStep.edgesExamined}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block text-[10px]">
                            Current Distance / Cost
                          </span>
                          <span className="font-mono font-semibold text-primary">
                            {currentStep.current
                              ? (currentStep.dist[currentStep.current] ?? "—")
                              : currentStep.done && currentStep.found
                                ? run.pathWeight
                                : "—"}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block text-[10px]">
                            Engine Execution
                          </span>
                          <span className="font-mono font-semibold">
                            {run.measuredMs.toFixed(1)} ms
                          </span>
                        </div>
                      </div>
                    </section>
                  </div>
                )}
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Bottom Playback Control Bar (from screen-3) */}
      <div className="bg-card border-t border-border flex px-5 items-center shrink-0 gap-5 h-16 z-20">
        {/* Step Message / Status */}
        <div className="w-56 min-w-44">
          <p className="font-semibold text-xs truncate">
            {run ? currentStep?.message || "Traversing..." : "Ready to explore"}
          </p>
          <p className="text-muted-foreground text-[10px] mt-0.5 truncate">
            {run ? (
              <>
                {run.algorithm.toUpperCase()} ·{" "}
                {currentStep?.done
                  ? currentStep.found
                    ? `Path found (${run.pathWeight} total cost)`
                    : "No path exists"
                  : `Step ${playback.index + 1} of ${totalSteps}`}
              </>
            ) : (
              "Select algorithm and click Run"
            )}
          </p>
        </div>

        {/* Playback Buttons */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Restart playback"
            disabled={!run}
            onClick={playback.restart}
            className="size-8 focus-visible:ring-2 focus-visible:ring-primary active:scale-95 transition-all"
            title="Restart from step 1"
          >
            <RotateCcw className="size-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Previous step"
            disabled={!run || playback.index === 0}
            onClick={playback.prev}
            className="size-8 focus-visible:ring-2 focus-visible:ring-primary active:scale-95 transition-all"
            title="Previous step"
          >
            <SkipBack className="size-4" />
          </Button>

          <Button
            size="icon"
            aria-label="Play or pause"
            disabled={!run}
            onClick={playback.toggle}
            className={cn(
              "size-8 shadow-xs focus-visible:ring-2 focus-visible:ring-primary active:scale-95 transition-all",
              playback.playing
                ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                : "bg-primary text-primary-foreground hover:bg-primary/90",
            )}
            title={playback.playing ? "Pause" : "Play"}
          >
            {playback.playing ? (
              <Pause className="size-4 fill-current" />
            ) : (
              <Play className="size-4 fill-current ml-0.5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Next step"
            disabled={!run || playback.index >= totalSteps - 1}
            onClick={playback.next}
            className="size-8 focus-visible:ring-2 focus-visible:ring-primary active:scale-95 transition-all"
            title="Next step"
          >
            <SkipForward className="size-4" />
          </Button>
        </div>

        {/* Range Scrubber bound to playback index */}
        <div className="flex items-center flex-1 gap-3 min-w-0">
          <span className="font-mono text-muted-foreground text-xs shrink-0 w-8 text-right">
            {run ? playback.index + 1 : 0}
          </span>
          <input
            type="range"
            min={0}
            max={Math.max(0, totalSteps - 1)}
            value={run ? playback.index : 0}
            disabled={!run || totalSteps <= 1}
            onChange={(e) => playback.seek(parseInt(e.target.value, 10))}
            className="accent-primary flex-1 h-1.5 bg-muted rounded-lg appearance-none cursor-pointer disabled:opacity-40"
            aria-label="Execution timeline scrubber"
          />
          <span className="text-muted-foreground text-xs shrink-0 font-mono">
            {totalSteps} steps
          </span>
        </div>

        {/* Speed Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-muted-foreground text-xs font-medium">Speed</span>
          <select
            value={String(playback.speed)}
            onChange={(e) => playback.setSpeed(parseFloat(e.target.value))}
            disabled={!run}
            className="bg-background text-xs text-foreground border border-input rounded-md px-2.5 h-8 focus:outline-none focus:ring-2 focus:ring-primary/80 cursor-pointer disabled:opacity-40 font-medium hover:border-primary/50 transition-colors"
          >
            <option value="0.5">0.5x</option>
            <option value="1">1x</option>
            <option value="2">2x</option>
          </select>
        </div>
      </div>

      {/* Toast Notification Banner */}
      {toast && (
        <div
          role="status"
          className={cn(
            "fixed top-16 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold shadow-xl border transition-all animate-in fade-in slide-in-from-top-3 duration-150",
            toast.type === "success" &&
              "bg-primary text-primary-foreground border-primary/20",
            toast.type === "error" &&
              "bg-destructive text-destructive-foreground border-destructive/20",
            toast.type === "info" &&
              "bg-card text-foreground border-border",
          )}
        >
          {toast.type === "success" && <Check className="size-4" />}
          {toast.type === "error" && <AlertCircle className="size-4" />}
          {toast.type === "info" && <Info className="size-4" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Saved Graphs Modal */}
      <SavedGraphsModal
        isOpen={isMyGraphsOpen}
        onClose={() => setIsMyGraphsOpen(false)}
        activeSavedId={state.activeSavedId}
        onLoadGraph={handleLoadGraph}
        onToast={showToast}
        onOpenSaveAs={handleSaveAs}
      />

      {/* Save / Save As Modal */}
      <SaveGraphModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSaveModalSubmit}
        initialName={
          isSaveAsMode
            ? activeSavedGraph
              ? `${activeSavedGraph.name} Copy`
              : "My Graph"
            : activeSavedGraph?.name || "My Graph"
        }
        isSaveAs={isSaveAsMode}
      />
    </div>
  );
}

export default Studio;
