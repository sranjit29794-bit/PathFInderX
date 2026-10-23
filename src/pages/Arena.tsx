import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  ArrowLeft,
  BarChart3,
  GitBranch,
  Info,
  Pause,
  Play,
  RotateCcw,
  Route,
  SkipBack,
  SkipForward,
  Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import GraphCanvas from "@/components/GraphCanvas";
import Rover from "@/components/Rover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGraph } from "@/state/GraphProvider";
import { useArenaRuns } from "@/state/ArenaContext";
import {
  ALGORITHMS,
  type AlgorithmId,
} from "@/lib/algorithms";
import { type GNode } from "@/lib/graph";
import { cn } from "@/lib/utils";

export function Arena() {
  const navigate = useNavigate();
  const { state, loadGraph } = useGraph();

  const {
    selectedGraphKey,
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
  } = useArenaRuns();

  const enabledAlgorithms = React.useMemo(
    () => ALGORITHMS.filter((a) => a.enabled),
    [],
  );

  const effectiveGraphKey = activeSavedGraph ? selectedGraphKey : "current";
  const stepsCountA = runA ? runA.steps.length : 0;
  const stepsCountB = runB ? runB.steps.length : 0;

  // Each panel holds its final state when its run completes earlier
  const stepIndexA =
    stepsCountA > 0 ? Math.min(playback.index, stepsCountA - 1) : 0;
  const stepIndexB =
    stepsCountB > 0 ? Math.min(playback.index, stepsCountB - 1) : 0;

  const stepA = runA && stepsCountA > 0 ? runA.steps[stepIndexA] : null;
  const stepB = runB && stepsCountB > 0 ? runB.steps[stepIndexB] : null;

  // Path edge lookups for Panel A and Panel B
  const pathEdgesA = React.useMemo(() => {
    if (
      !stepA ||
      !stepA.done ||
      !stepA.found ||
      !stepA.path ||
      stepA.path.length < 2
    ) {
      return [];
    }
    const pathNodes = stepA.path;
    const edgeIds: string[] = [];
    for (let i = 0; i < pathNodes.length - 1; i++) {
      const u = pathNodes[i];
      const v = pathNodes[i + 1];
      const e = activeGraph.edges.find(
        (edge) =>
          (edge.a === u && edge.b === v) || (edge.a === v && edge.b === u),
      );
      if (e) edgeIds.push(e.id);
    }
    return edgeIds;
  }, [stepA, activeGraph.edges]);

  const pathEdgesB = React.useMemo(() => {
    if (
      !stepB ||
      !stepB.done ||
      !stepB.found ||
      !stepB.path ||
      stepB.path.length < 2
    ) {
      return [];
    }
    const pathNodes = stepB.path;
    const edgeIds: string[] = [];
    for (let i = 0; i < pathNodes.length - 1; i++) {
      const u = pathNodes[i];
      const v = pathNodes[i + 1];
      const e = activeGraph.edges.find(
        (edge) =>
          (edge.a === u && edge.b === v) || (edge.a === v && edge.b === u),
      );
      if (e) edgeIds.push(e.id);
    }
    return edgeIds;
  }, [stepB, activeGraph.edges]);

  // Dynamic Insight generation strictly from real data
  const insight = React.useMemo(() => {
    if (!runA || !runB || !sourceNode || !goalNode) return null;
    const nameA = metaA?.name || algoA.toUpperCase();
    const nameB = metaB?.name || algoB.toUpperCase();

    // 1. Neither found path
    if (!runA.found && !runB.found) {
      return {
        title: "No path exists between source and destination",
        body: `Both ${nameA} and ${nameB} exhausted their exploration frontiers and determined that node ${goalNode.label} is unreachable from node ${sourceNode.label}.`,
      };
    }

    // 2. Only one found path
    if (runA.found && !runB.found) {
      return {
        title: `${nameA} found a path, while ${nameB} found no route`,
        body: `${nameA} successfully reached the destination with path weight ${runA.pathWeight}, whereas ${nameB} concluded without finding a path.`,
      };
    }
    if (!runA.found && runB.found) {
      return {
        title: `${nameB} found a path, while ${nameA} found no route`,
        body: `${nameB} successfully reached the destination with path weight ${runB.pathWeight}, whereas ${nameA} concluded without finding a path.`,
      };
    }

    // 3. Both found a path
    const weightDiff = (runA.pathWeight ?? 0) - (runB.pathWeight ?? 0);
    const stepsDiff = runA.stepCount - runB.stepCount;

    const pathsIdentical =
      Boolean(runA.path &&
      runB.path &&
      runA.path.length === runB.path.length &&
      runA.path.every((nodeId, idx) => nodeId === runB.path![idx]));

    if (algoA === algoB) {
      return {
        title: `Identical execution of ${nameA}`,
        body: `Both panels simulated the exact same algorithm on this graph, yielding ${runA.stepCount} steps and path weight ${runA.pathWeight}.`,
      };
    }

    if (pathsIdentical) {
      return {
        title: `Both algorithms converged on the identical path (${runA.pathWeight} total cost)`,
        body: `${nameA} took ${runA.stepCount} steps (visiting ${runA.visited} vertices), whereas ${nameB} took ${runB.stepCount} steps (visiting ${runB.visited} vertices).`,
      };
    }

    if (weightDiff !== 0) {
      const cheaperName = weightDiff < 0 ? nameA : nameB;
      const cheaperWeight = weightDiff < 0 ? runA.pathWeight : runB.pathWeight;
      const expensiveWeight =
        weightDiff < 0 ? runB.pathWeight : runA.pathWeight;
      const fewerStepsName = stepsDiff < 0 ? nameA : nameB;

      return {
        title: `${cheaperName} found a lower-weight route (${cheaperWeight} vs ${expensiveWeight} total cost)`,
        body: `${fewerStepsName} reached the goal in fewer traversal steps (${Math.min(runA.stepCount, runB.stepCount)} vs ${Math.max(runA.stepCount, runB.stepCount)}), but ${cheaperName} minimized cumulative edge weights.`,
      };
    }

    return {
      title: `Both routes found distinct paths with equal weight (${runA.pathWeight})`,
      body: `${nameA} examined ${runA.edgesExamined} edges in ${runA.stepCount} steps; ${nameB} examined ${runB.edgesExamined} edges in ${runB.stepCount} steps.`,
    };
  }, [runA, runB, algoA, algoB, metaA, metaB, sourceNode, goalNode]);

  // Empty state if source or goal missing in graph
  if (!sourceNode || !goalNode) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />
        <main className="flex-1 p-8 max-w-4xl mx-auto w-full flex flex-col items-center justify-center text-center">
          <Activity className="size-12 text-muted-foreground/40 mb-4" />
          <h1 className="text-2xl font-bold tracking-tight mb-2">
            Source or Destination Missing in "{activeGraphName}"
          </h1>
          <p className="text-muted-foreground text-sm max-w-md mb-6 leading-relaxed">
            {activeSavedGraph
              ? `The saved graph "${activeGraphName}" does not have both a source and destination node set. Open it in Graph Studio to configure them.`
              : "The Algorithm Arena compares two algorithms on the exact same graph, source, and destination. Please configure both nodes in Graph Studio first."}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button
              onClick={() => {
                if (activeSavedGraph) {
                  loadGraph(
                    activeSavedGraph.graph,
                    activeSavedGraph.sourceId,
                    activeSavedGraph.goalId,
                    activeSavedGraph.id,
                  );
                }
                navigate("/studio");
              }}
              className="gap-2 cursor-pointer font-medium"
            >
              <ArrowLeft className="size-4" />
              Open in Studio
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Or switch graph:</span>
              <select
                value={effectiveGraphKey}
                onChange={(e) => handleSelectGraph(e.target.value)}
                className="bg-background text-xs font-semibold text-foreground border border-input rounded-md px-3 h-9 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer max-w-xs"
              >
                <option value="current">Current Studio graph ({state.graph.nodes.length} nodes)</option>
                {savedGraphs.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name} ({g.graph.nodes.length} nodes · {g.graph.edges.length} edges)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Rover target nodes for Panel A and B
  let roverNodeA: GNode | null = null;
  if (stepA) {
    if (stepA.current) {
      roverNodeA = nodeMap.get(stepA.current) ?? null;
    } else if (stepA.done) {
      roverNodeA =
        stepA.found && activeGoalId
          ? (nodeMap.get(activeGoalId) ?? null)
          : activeSourceId
            ? (nodeMap.get(activeSourceId) ?? null)
            : null;
    } else if (activeSourceId) {
      roverNodeA = nodeMap.get(activeSourceId) ?? null;
    }
  }

  let roverNodeB: GNode | null = null;
  if (stepB) {
    if (stepB.current) {
      roverNodeB = nodeMap.get(stepB.current) ?? null;
    } else if (stepB.done) {
      roverNodeB =
        stepB.found && activeGoalId
          ? (nodeMap.get(activeGoalId) ?? null)
          : activeSourceId
            ? (nodeMap.get(activeSourceId) ?? null)
            : null;
    } else if (activeSourceId) {
      roverNodeB = nodeMap.get(activeSourceId) ?? null;
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex mx-auto px-6 py-6 flex-col gap-6 w-full max-w-[1700px] flex-1">
        {/* Subheader Toolbar */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-semibold text-2xl tracking-tight">
              Algorithm Arena
            </h1>

            {/* Graph Selector */}
            <div className="flex items-center gap-2 bg-muted/40 border border-border rounded-md px-2.5 py-1">
              <span className="text-xs font-semibold text-muted-foreground">Graph:</span>
              <select
                value={effectiveGraphKey}
                onChange={(e) => handleSelectGraph(e.target.value)}
                className="bg-background text-xs font-semibold text-foreground border border-input rounded-md px-2.5 h-7 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer max-w-55 truncate"
              >
                <option value="current">
                  Current Studio graph ({state.graph.nodes.length} nodes)
                </option>
                {savedGraphs.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name} ({g.graph.nodes.length}n · {g.graph.edges.length}e)
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span
                className="font-semibold text-xs text-foreground bg-accent/60 border border-border px-2.5 py-1 rounded-md max-w-45 truncate"
                title={activeGraphName}
              >
                {activeGraphName}
              </span>
              <span className="font-medium rounded-md bg-secondary text-secondary-foreground text-xs px-2.5 py-1">
                {sourceNode.label} → {goalNode.label}
              </span>
              <span className="font-medium rounded-md bg-muted text-muted-foreground text-xs px-2.5 py-1 font-mono">
                {activeGraph.nodes.length} nodes · {activeGraph.edges.length} edges
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-muted-foreground text-xs hidden sm:flex items-center gap-1.5">
              <Info className="size-3.5" />
              Runtime is measured for this run only.
            </div>
            <Button
              variant={playback.index >= totalSteps - 1 ? "default" : "outline"}
              size="sm"
              className="text-xs gap-1.5 h-8 font-semibold cursor-pointer shadow-xs"
              disabled={!runA || !runB}
              onClick={() => navigate("/arena/results")}
              title={
                playback.index >= totalSteps - 1
                  ? "View full run results"
                  : "Skip directly to full run results"
              }
            >
              <BarChart3 className="size-3.5" />
              <span>
                {playback.index >= totalSteps - 1 ? "View results" : "Skip to results"}
              </span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs gap-1.5 h-8 font-medium cursor-pointer"
              onClick={() => {
                if (activeSavedGraph) {
                  loadGraph(
                    activeSavedGraph.graph,
                    activeSavedGraph.sourceId,
                    activeSavedGraph.goalId,
                    activeSavedGraph.id,
                  );
                }
                navigate("/studio");
              }}
            >
              <ArrowLeft className="size-3.5" />
              Edit in Studio
            </Button>
          </div>
        </div>

        {/* Dual Canvas Panels */}
        <section
          aria-label="Algorithm graph comparison"
          className="grid gap-6 grid-cols-1 lg:grid-cols-2 flex-1 min-h-115"
        >
          {/* PANEL A */}
          <article className="shadow-sm rounded-lg bg-card border border-border flex flex-col min-h-0 overflow-hidden">
            {/* Panel A Header */}
            <div className="border-b border-border flex px-4 py-3 justify-between items-center bg-card">
              <div className="flex items-center gap-3">
                <span className="rounded-md bg-primary/10 text-primary flex justify-center items-center size-8">
                  <GitBranch className="size-4" />
                </span>
                <div className="flex items-center gap-2">
                  <select
                    value={algoA}
                    onChange={(e) => setAlgoA(e.target.value as AlgorithmId)}
                    className="bg-background text-sm font-semibold text-foreground border border-input rounded-md px-2.5 h-8 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                  >
                    {enabledAlgorithms.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                  <span className="text-muted-foreground text-xs font-mono">
                    ({metaA?.kind})
                  </span>
                </div>
              </div>

              {/* Status Badge A */}
              {stepA?.done ? (
                stepA.found ? (
                  <Badge
                    variant="default"
                    className="bg-primary/10 text-primary border-primary/20 text-xs"
                  >
                    Complete · Path found
                  </Badge>
                ) : (
                  <Badge
                    variant="destructive"
                    className="bg-destructive/10 text-destructive border-destructive/20 text-xs"
                  >
                    No path found
                  </Badge>
                )
              ) : playback.playing ? (
                <Badge
                  variant="outline"
                  className="text-primary border-primary/30 animate-pulse text-xs"
                >
                  Running ({stepIndexA + 1}/{stepsCountA})
                </Badge>
              ) : (
                <Badge variant="outline" className="text-xs">
                  Step {stepIndexA + 1}/{stepsCountA}
                </Badge>
              )}
            </div>

            {/* Panel A Canvas */}
            <div className="bg-muted/20 relative flex-1 min-h-95 overflow-hidden">
              <GraphCanvas
                graph={frozenGraph}
                interactive={false}
                nodeStates={stepA ? stepA.nodeStates : undefined}
                examinedEdge={stepA ? stepA.examinedEdge : undefined}
                pathEdges={pathEdgesA}
                showLegend={false}
              >
                {Boolean(runA) && roverNodeA && (
                  <Rover
                    key={runA ? `${runA.algorithm}-${algoA}` : "none-a"}
                    x={roverNodeA.x}
                    y={roverNodeA.y}
                    isProcessing={playback.playing && Boolean(stepA?.current) && !stepA?.done}
                    isPlaying={playback.playing}
                    hasRun={Boolean(runA)}
                    speed={playback.speed}
                  />
                )}
              </GraphCanvas>
            </div>

            {/* Panel A Footer */}
            <div className="text-xs border-t border-border flex px-5 py-3 justify-between items-center bg-card">
              <span className="text-muted-foreground">
                {stepA?.done
                  ? stepA.found
                    ? `Complete · Path found (${runA?.pathWeight} cost)`
                    : "Complete · No path found"
                  : `Traversing · Step ${stepIndexA + 1} of ${stepsCountA}`}
              </span>
              <span className="font-mono text-foreground font-semibold">
                {runA ? `${runA.measuredMs.toFixed(1)}ms measured` : "—"}
              </span>
            </div>
          </article>

          {/* PANEL B */}
          <article className="shadow-sm rounded-lg bg-card border border-border flex flex-col min-h-0 overflow-hidden">
            {/* Panel B Header */}
            <div className="border-b border-border flex px-4 py-3 justify-between items-center bg-card">
              <div className="flex items-center gap-3">
                <span className="rounded-md bg-chart-2/10 text-chart-2 flex justify-center items-center size-8">
                  <Route className="size-4" />
                </span>
                <div className="flex items-center gap-2">
                  <select
                    value={algoB}
                    onChange={(e) => setAlgoB(e.target.value as AlgorithmId)}
                    className="bg-background text-sm font-semibold text-foreground border border-input rounded-md px-2.5 h-8 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                  >
                    {enabledAlgorithms.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                  <span className="text-muted-foreground text-xs font-mono">
                    ({metaB?.kind})
                  </span>
                </div>
              </div>

              {/* Status Badge B */}
              {stepB?.done ? (
                stepB.found ? (
                  <Badge
                    variant="default"
                    className="bg-primary/10 text-primary border-primary/20 text-xs"
                  >
                    Complete · Path found
                  </Badge>
                ) : (
                  <Badge
                    variant="destructive"
                    className="bg-destructive/10 text-destructive border-destructive/20 text-xs"
                  >
                    No path found
                  </Badge>
                )
              ) : playback.playing ? (
                <Badge
                  variant="outline"
                  className="text-primary border-primary/30 animate-pulse text-xs"
                >
                  Running ({stepIndexB + 1}/{stepsCountB})
                </Badge>
              ) : (
                <Badge variant="outline" className="text-xs">
                  Step {stepIndexB + 1}/{stepsCountB}
                </Badge>
              )}
            </div>

            {/* Panel B Canvas */}
            <div className="bg-muted/20 relative flex-1 min-h-95 overflow-hidden">
              <GraphCanvas
                graph={frozenGraph}
                interactive={false}
                nodeStates={stepB ? stepB.nodeStates : undefined}
                examinedEdge={stepB ? stepB.examinedEdge : undefined}
                pathEdges={pathEdgesB}
                showLegend={false}
              >
                {Boolean(runB) && roverNodeB && (
                  <Rover
                    key={runB ? `${runB.algorithm}-${algoB}` : "none-b"}
                    x={roverNodeB.x}
                    y={roverNodeB.y}
                    isProcessing={playback.playing && Boolean(stepB?.current) && !stepB?.done}
                    isPlaying={playback.playing}
                    hasRun={Boolean(runB)}
                    speed={playback.speed}
                  />
                )}
              </GraphCanvas>
            </div>

            {/* Panel B Footer */}
            <div className="text-xs border-t border-border flex px-5 py-3 justify-between items-center bg-card">
              <span className="text-muted-foreground">
                {stepB?.done
                  ? stepB.found
                    ? `Complete · Path found (${runB?.pathWeight} cost)`
                    : "Complete · No path found"
                  : `Traversing · Step ${stepIndexB + 1} of ${stepsCountB}`}
              </span>
              <span className="font-mono text-foreground font-semibold">
                {runB ? `${runB.measuredMs.toFixed(1)}ms measured` : "—"}
              </span>
            </div>
          </article>
        </section>

        {/* Synchronized Playback Controls */}
        <section
          aria-label="Synchronized playback controls"
          className="shadow-sm rounded-lg bg-card border border-border flex px-5 py-3 justify-between items-center gap-4 flex-wrap"
        >
          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Restart"
              onClick={playback.restart}
              className="size-8 focus-visible:ring-2 focus-visible:ring-primary active:scale-95 transition-all"
              title="Restart playback"
            >
              <RotateCcw className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Step back"
              onClick={playback.prev}
              disabled={playback.index === 0}
              className="size-8 focus-visible:ring-2 focus-visible:ring-primary active:scale-95 transition-all"
              title="Step back"
            >
              <SkipBack className="size-4" />
            </Button>
            <Button
              onClick={playback.toggle}
              className="px-6 gap-2 h-9 font-semibold shadow-xs active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-primary"
            >
              {playback.playing ? (
                <>
                  <Pause className="size-4 fill-current" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="size-4 fill-current ml-0.5" />
                  Play both
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Step forward"
              onClick={playback.next}
              disabled={playback.index >= totalSteps - 1}
              className="size-8 focus-visible:ring-2 focus-visible:ring-primary active:scale-95 transition-all"
              title="Step forward"
            >
              <SkipForward className="size-4" />
            </Button>
          </div>

          <div className="flex items-center gap-3 flex-1 max-w-lg min-w-48">
            <span className="text-muted-foreground text-xs whitespace-nowrap font-medium">
              Shared timeline
            </span>
            <input
              type="range"
              min={0}
              max={Math.max(0, totalSteps - 1)}
              value={playback.index}
              onChange={(e) => playback.seek(parseInt(e.target.value, 10))}
              className="accent-primary flex-1 h-1.5 bg-muted rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/60"
              aria-label="Shared execution timeline"
            />
            <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
              {playback.index + 1} / {totalSteps}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-muted-foreground text-xs font-medium">Speed</span>
            <select
              value={String(playback.speed)}
              onChange={(e) => playback.setSpeed(parseFloat(e.target.value))}
              className="bg-background text-xs text-foreground border border-input rounded-md px-2.5 h-8 focus:outline-none focus:ring-2 focus:ring-primary/80 cursor-pointer font-medium hover:border-primary/50 transition-colors"
            >
              <option value="0.5">0.5x</option>
              <option value="1">1x</option>
              <option value="2">2x</option>
            </select>
          </div>

          {/* View results / Skip to results CTA */}
          <Button
            variant={playback.index >= totalSteps - 1 ? "default" : "outline"}
            size="sm"
            disabled={!runA || !runB}
            onClick={() => navigate("/arena/results")}
            className="text-xs gap-1.5 h-8 font-semibold cursor-pointer shrink-0 shadow-xs ml-auto sm:ml-0"
            title={
              playback.index >= totalSteps - 1
                ? "View full run results"
                : "Skip directly to full run results"
            }
          >
            <BarChart3 className="size-3.5" />
            <span>
              {playback.index >= totalSteps - 1 ? "View results" : "Skip to results"}
            </span>
          </Button>
        </section>

        {/* Comparison Metrics Table */}
        {runA && runB && (
          <section
            aria-label="Comparison metrics"
            className="shadow-sm rounded-lg bg-card border border-border overflow-hidden"
          >
            <div className="border-b border-border px-5 py-3.5 bg-muted/20">
              <h2 className="font-semibold text-sm">Comparison metrics</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="text-sm w-full">
                <thead className="text-left uppercase bg-muted/40 text-muted-foreground text-xs tracking-wide">
                  <tr>
                    <th className="font-medium px-5 py-2.5">Metric</th>
                    <th className="font-semibold text-primary px-5 py-2.5">
                      {metaA?.name || algoA.toUpperCase()}
                    </th>
                    <th className="font-semibold text-chart-2 px-5 py-2.5">
                      {metaB?.name || algoB.toUpperCase()}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="text-muted-foreground px-5 py-2.5">
                      Path result
                    </td>
                    <td className="font-medium px-5 py-2.5">
                      {runA.found ? "Path found" : "No path found"}
                    </td>
                    <td className="font-medium px-5 py-2.5">
                      {runB.found ? "Path found" : "No path found"}
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="text-muted-foreground px-5 py-2.5">
                      Total path weight
                    </td>
                    <td
                      className={cn(
                        "font-mono font-semibold px-5 py-2.5",
                        runA.pathWeight !== null &&
                          runB.pathWeight !== null &&
                          runA.pathWeight < runB.pathWeight
                          ? "text-primary font-bold"
                          : "",
                      )}
                    >
                      {runA.pathWeight !== null
                        ? `${runA.pathWeight} total weight`
                        : "—"}
                    </td>
                    <td
                      className={cn(
                        "font-mono font-semibold px-5 py-2.5",
                        runA.pathWeight !== null &&
                          runB.pathWeight !== null &&
                          runB.pathWeight < runA.pathWeight
                          ? "text-chart-2 font-bold"
                          : "",
                      )}
                    >
                      {runB.pathWeight !== null
                        ? `${runB.pathWeight} total weight`
                        : "—"}
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="text-muted-foreground px-5 py-2.5">
                      Nodes visited
                    </td>
                    <td className="font-mono px-5 py-2.5">{runA.visited} nodes</td>
                    <td className="font-mono px-5 py-2.5">{runB.visited} nodes</td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="text-muted-foreground px-5 py-2.5">
                      Edges examined
                    </td>
                    <td className="font-mono px-5 py-2.5">
                      {runA.edgesExamined} edges
                    </td>
                    <td className="font-mono px-5 py-2.5">
                      {runB.edgesExamined} edges
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="text-muted-foreground px-5 py-2.5">
                      Measured runtime (this run only)
                    </td>
                    <td className="font-mono px-5 py-2.5">
                      {runA.measuredMs.toFixed(1)}ms
                    </td>
                    <td className="font-mono px-5 py-2.5">
                      {runB.measuredMs.toFixed(1)}ms
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="text-muted-foreground px-5 py-2.5">
                      Theoretical time
                    </td>
                    <td className="font-mono text-primary font-semibold px-5 py-2.5">
                      {runA.timeComplexity}
                    </td>
                    <td className="font-mono text-chart-2 font-semibold px-5 py-2.5">
                      {runB.timeComplexity}
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="text-muted-foreground px-5 py-2.5">
                      Space complexity
                    </td>
                    <td className="font-mono px-5 py-2.5">
                      {runA.spaceComplexity}
                    </td>
                    <td className="font-mono px-5 py-2.5">
                      {runB.spaceComplexity}
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="text-muted-foreground px-5 py-2.5">
                      Traversal steps
                    </td>
                    <td className="font-mono px-5 py-2.5">{runA.stepCount}</td>
                    <td className="font-mono px-5 py-2.5">{runB.stepCount}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Dynamic Insight Banner Generated Strictly from Data */}
        {insight && (
          <section className="rounded-lg bg-primary/5 border border-primary/25 flex p-4.5 items-start gap-3.5 shadow-xs">
            <Sparkles className="text-primary size-5 shrink-0 mt-0.5" />
            <div className="text-sm leading-relaxed">
              <span className="font-semibold text-foreground block mb-0.5">
                {insight.title}
              </span>
              <span className="text-muted-foreground">{insight.body}</span>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default Arena;
