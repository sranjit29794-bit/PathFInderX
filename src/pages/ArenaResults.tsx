import * as React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Download,
  FileSpreadsheet,
  FileText,
  GitBranch,
  GitCompareArrows,
  Layers,
  Lightbulb,
  RotateCcw,
  Route,
  Table2,
} from "lucide-react";
import Header from "@/components/Header";
import GraphCanvas from "@/components/GraphCanvas";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useArenaRuns } from "@/state/ArenaContext";
import { type Graph } from "@/lib/graph";
import { type RunResult, type AlgorithmId } from "@/lib/algorithms";

// Helper to compute edge IDs along a path
function getPathEdgeIds(graph: Graph, path: string[] | null | undefined): string[] {
  if (!path || path.length < 2) return [];
  const edgeIds: string[] = [];
  for (let i = 0; i < path.length - 1; i++) {
    const u = path[i];
    const v = path[i + 1];
    const edge = graph.edges.find(
      (e) => (e.a === u && e.b === v) || (e.a === v && e.b === u),
    );
    if (edge) edgeIds.push(edge.id);
  }
  return edgeIds;
}

// Generate one-line summary for an algorithm card
function generateAlgorithmSummary(
  algoId: AlgorithmId,
  run: RunResult,
  otherRun: RunResult | null,
): string {
  if (!run.found || !run.path) {
    return `${algoId.toUpperCase()} exhausted all reachable paths without finding the destination.`;
  }

  const hops = run.path.length - 1;

  if (algoId === "bfs") {
    if (otherRun && otherRun.pathWeight !== null && run.pathWeight !== null) {
      if (otherRun.pathWeight < run.pathWeight) {
        return `BFS reached the destination in the fewest edge hops (${hops} hops), but with a higher cumulative weight (${run.pathWeight}).`;
      }
    }
    return `BFS reached the destination in the minimum number of edge hops (${hops} hops, total cost ${run.pathWeight}).`;
  }

  if (algoId === "dijkstra") {
    return `Dijkstra discovered the minimum-total-weight path (cost ${run.pathWeight}) by evaluating cumulative path distances.`;
  }

  if (algoId === "dfs") {
    return `DFS explored deep branch pathways to locate the destination (${hops} hops, cost ${run.pathWeight}) without shortest-path guarantees.`;
  }

  return `Run finished: ${hops} hops, total weight ${run.pathWeight}.`;
}

// Generate dynamic interpretation text comparing both runs
function generateInterpretation(
  algoA: AlgorithmId,
  algoB: AlgorithmId,
  runA: RunResult,
  runB: RunResult,
): string {
  if (!runA.found && !runB.found) {
    return "Neither algorithm could discover a valid path to the goal node. The destination is in a disconnected graph component.";
  }
  if (!runA.found) {
    return `${algoB.toUpperCase()} located a valid path, whereas ${algoA.toUpperCase()} was unable to reach the destination.`;
  }
  if (!runB.found) {
    return `${algoA.toUpperCase()} located a valid path, whereas ${algoB.toUpperCase()} was unable to reach the destination.`;
  }

  const samePath = runA.path?.join("→") === runB.path?.join("→");
  const hopsA = runA.path ? runA.path.length - 1 : 0;
  const hopsB = runB.path ? runB.path.length - 1 : 0;
  const costA = runA.pathWeight ?? 0;
  const costB = runB.pathWeight ?? 0;

  if (samePath) {
    return `Both ${algoA.toUpperCase()} and ${algoB.toUpperCase()} converged on the identical route (${hopsA} edges, total cost ${costA}). ${
      runA.visited < runB.visited
        ? `${algoA.toUpperCase()} visited fewer vertices (${runA.visited} vs ${runB.visited}) to reach the solution.`
        : runB.visited < runA.visited
          ? `${algoB.toUpperCase()} visited fewer vertices (${runB.visited} vs ${runA.visited}) to reach the solution.`
          : "Both algorithms exhibited similar traversal workloads."
    } Note: Measured runtime reflects this client-side browser execution only.`;
  }

  if (costA < costB) {
    return `${algoA.toUpperCase()} discovered a cheaper route (cost ${costA} vs ${costB}), while ${algoB.toUpperCase()} took ${hopsB} hops. Note: Measured runtime reflects this client-side browser execution only; theoretical time complexity dictates asymptotic scalability.`;
  }

  if (costB < costA) {
    return `${algoB.toUpperCase()} discovered a cheaper route (cost ${costB} vs ${costA}), while ${algoA.toUpperCase()} selected a route with ${hopsA} hops. Note: Measured runtime reflects this client-side browser execution only; theoretical time complexity dictates asymptotic scalability.`;
  }

  return `Both algorithms found paths with identical total cost (${costA}), though with different route branches (${hopsA} hops vs ${hopsB} hops). Note: Measured runtime is for this browser run only.`;
}

export function ArenaResults() {
  const navigate = useNavigate();
  const {
    activeGraphName,
    activeGraph,
    activeSourceId,
    activeGoalId,
    sourceNode,
    goalNode,
    nodeMap,
    algoA,
    algoB,
    metaA,
    metaB,
    runA,
    runB,
    playback,
  } = useArenaRuns();

  const [isExportOpen, setIsExportOpen] = React.useState(false);

  // If there are no results yet, redirect gracefully to /arena
  if (
    !runA ||
    !runB ||
    !activeSourceId ||
    !activeGoalId ||
    !sourceNode ||
    !goalNode
  ) {
    return <Navigate to="/arena" replace />;
  }

  // Pre-calculate path edges for both mini diagrams
  const pathEdgesA = getPathEdgeIds(activeGraph, runA.path);
  const pathEdgesB = getPathEdgeIds(activeGraph, runB.path);

  // Create node states highlighting the final path for each mini diagram
  const nodeStatesA: Record<string, string> = {};
  if (runA.path) {
    for (const id of runA.path) {
      nodeStatesA[id] = "processed";
    }
  }

  const nodeStatesB: Record<string, string> = {};
  if (runB.path) {
    for (const id of runB.path) {
      nodeStatesB[id] = "processed";
    }
  }

  // Workload bar proportions relative to each other
  const totalVisited = Math.max(1, runA.visited + runB.visited);
  const totalEdges = Math.max(1, runA.edgesExamined + runB.edgesExamined);

  const pctVisitedA = Math.round((runA.visited / totalVisited) * 100);
  const pctVisitedB = 100 - pctVisitedA;

  const pctEdgesA = Math.round((runA.edgesExamined / totalEdges) * 100);
  const pctEdgesB = 100 - pctEdgesA;

  // Slugs for export filename
  const graphSlug = activeGraphName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, "-")
    .slice(0, 19);

  // Export CSV
  const handleExportCSV = () => {
    setIsExportOpen(false);
    const rows = [
      ["Metric", metaA?.name || algoA.toUpperCase(), metaB?.name || algoB.toUpperCase()],
      ["Path result", runA.found ? "Route found" : "No path", runB.found ? "Route found" : "No path"],
      ["Total path weight", runA.pathWeight !== null ? String(runA.pathWeight) : "—", runB.pathWeight !== null ? String(runB.pathWeight) : "—"],
      ["Route length (edges)", runA.path ? String(runA.path.length - 1) : "—", runB.path ? String(runB.path.length - 1) : "—"],
      ["Nodes visited", String(runA.visited), String(runB.visited)],
      ["Edges examined", String(runA.edgesExamined), String(runB.edgesExamined)],
      ["Traversal steps", String(runA.steps.length), String(runB.steps.length)],
      ["Measured runtime (ms)", runA.measuredMs.toFixed(3), runB.measuredMs.toFixed(3)],
      ["Theoretical time", `"${runA.timeComplexity}"`, `"${runB.timeComplexity}"`],
      ["Theoretical space", `"${runA.spaceComplexity}"`, `"${runB.spaceComplexity}"`],
    ];

    const csvContent = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pathfinder-results-${graphSlug}-${timestamp}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Export JSON
  const handleExportJSON = () => {
    setIsExportOpen(false);
    const payload = {
      graphName: activeGraphName,
      nodeCount: activeGraph.nodes.length,
      edgeCount: activeGraph.edges.length,
      source: { id: sourceNode.id, label: sourceNode.label },
      goal: { id: goalNode.id, label: goalNode.label },
      exportedAt: new Date().toISOString(),
      algorithmA: {
        id: algoA,
        name: metaA?.name || algoA,
        found: runA.found,
        path: runA.path,
        pathWeight: runA.pathWeight,
        stepCount: runA.steps.length,
        visitedCount: runA.visited,
        edgesExamined: runA.edgesExamined,
        measuredMs: runA.measuredMs,
        timeComplexity: runA.timeComplexity,
        spaceComplexity: runA.spaceComplexity,
      },
      algorithmB: {
        id: algoB,
        name: metaB?.name || algoB,
        found: runB.found,
        path: runB.path,
        pathWeight: runB.pathWeight,
        stepCount: runB.steps.length,
        visitedCount: runB.visited,
        edgesExamined: runB.edgesExamined,
        measuredMs: runB.measuredMs,
        timeComplexity: runB.timeComplexity,
        spaceComplexity: runB.spaceComplexity,
      },
    };

    const jsonContent = JSON.stringify(payload, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pathfinder-results-${graphSlug}-${timestamp}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getAlgoIcon = (id: AlgorithmId) => {
    switch (id) {
      case "bfs":
        return <Layers className="size-5" />;
      case "dfs":
        return <GitBranch className="size-5" />;
      case "dijkstra":
        return <Route className="size-5" />;
      default:
        return <GitBranch className="size-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex mx-auto p-6 md:p-8 flex-col gap-8 max-w-7xl w-full flex-1">
        {/* Header Section */}
        <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-6">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-3">
              <h1 className="font-bold text-2xl md:text-3xl tracking-tight text-foreground">
                Run complete
              </h1>
              <Badge className="bg-primary/10 text-primary border-primary/30 gap-1.5 font-semibold text-xs py-0.5 px-2.5">
                <span className="rounded-full bg-primary size-2 animate-pulse" />
                Complete
              </Badge>
            </div>
            <div className="text-muted-foreground text-xs md:text-sm flex items-center flex-wrap gap-2 md:gap-3">
              <span className="font-semibold text-foreground">{activeGraphName}</span>
              <span className="text-border">/</span>
              <span className="font-mono text-primary font-bold">
                {sourceNode.label} → {goalNode.label}
              </span>
              <span className="text-border">/</span>
              <span>
                {activeGraph.nodes.length} nodes · {activeGraph.edges.length} edges
              </span>
            </div>
          </div>
          <div className="text-muted-foreground text-xs md:text-sm flex items-center gap-2 bg-muted/40 border border-border rounded-lg px-3.5 py-2 shadow-xs">
            <CheckCircle2 className="text-primary size-4 shrink-0" />
            <span>Same graph, source, and destination</span>
          </div>
        </section>

        {/* Two Algorithm Route Cards */}
        <section className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {/* Algorithm A Card */}
          <div className="rounded-xl shadow-xs bg-card border border-primary/40 flex p-6 flex-col gap-5">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 text-primary flex justify-center items-center size-10 shadow-xs">
                  {getAlgoIcon(algoA)}
                </div>
                <div>
                  <h2 className="font-bold text-xl text-foreground">
                    {metaA?.name || algoA.toUpperCase()}
                  </h2>
                  <p className="text-muted-foreground text-xs">
                    {metaA?.shortDesc.split(".")[0] || "Graph traversal"}
                  </p>
                </div>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  "text-xs px-2.5 py-0.5",
                  runA.found
                    ? "bg-primary/10 text-primary border-primary/30"
                    : "bg-destructive/10 text-destructive border-destructive/30",
                )}
              >
                {runA.found ? "Route found" : "No path"}
              </Badge>
            </div>

            {/* Mini Route Diagram with real GraphCanvas */}
            <div className="rounded-lg bg-muted/40 border border-border relative h-36 overflow-hidden">
              <GraphCanvas
                graph={activeGraph}
                sourceId={activeSourceId}
                goalId={activeGoalId}
                pathEdges={pathEdgesA}
                nodeStates={nodeStatesA}
                interactive={false}
                showLegend={false}
              />
              <div className="font-mono -translate-x-1/2 rounded-md bg-background/90 text-primary text-[10px] font-bold border border-border/80 absolute bottom-2.5 left-1/2 px-2.5 py-1 shadow-xs max-w-[90%] truncate">
                {runA.path
                  ? runA.path.map((id) => nodeMap.get(id)?.label ?? id).join(" → ")
                  : "No reachable path"}
              </div>
            </div>

            {/* Metrics Row */}
            <div className="border-t border-border pt-4 grid gap-3 grid-cols-3 text-center sm:text-left">
              <div>
                <p className="text-muted-foreground text-xs">Route length</p>
                <p className="font-bold text-base md:text-lg mt-0.5 text-foreground">
                  {runA.path ? `${runA.path.length - 1} edges` : "—"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Total weight</p>
                <p className="font-bold text-base md:text-lg mt-0.5 text-foreground">
                  {runA.pathWeight !== null ? runA.pathWeight : "—"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Traversal steps</p>
                <p className="font-bold text-base md:text-lg mt-0.5 text-foreground">
                  {runA.steps.length}
                </p>
              </div>
            </div>

            <p className="text-muted-foreground text-xs leading-relaxed border-t border-border/60 pt-3">
              {generateAlgorithmSummary(algoA, runA, runB)}
            </p>
          </div>

          {/* Algorithm B Card */}
          <div className="rounded-xl shadow-xs bg-card border border-chart-2/40 flex p-6 flex-col gap-5">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-chart-2/10 text-chart-2 flex justify-center items-center size-10 shadow-xs">
                  {getAlgoIcon(algoB)}
                </div>
                <div>
                  <h2 className="font-bold text-xl text-foreground">
                    {metaB?.name || algoB.toUpperCase()}
                  </h2>
                  <p className="text-muted-foreground text-xs">
                    {metaB?.shortDesc.split(".")[0] || "Graph traversal"}
                  </p>
                </div>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  "text-xs px-2.5 py-0.5",
                  runB.found
                    ? "bg-chart-2/10 text-chart-2 border-chart-2/30"
                    : "bg-destructive/10 text-destructive border-destructive/30",
                )}
              >
                {runB.found ? "Route found" : "No path"}
              </Badge>
            </div>

            {/* Mini Route Diagram with real GraphCanvas */}
            <div className="rounded-lg bg-muted/40 border border-border relative h-36 overflow-hidden">
              <GraphCanvas
                graph={activeGraph}
                sourceId={activeSourceId}
                goalId={activeGoalId}
                pathEdges={pathEdgesB}
                nodeStates={nodeStatesB}
                interactive={false}
                showLegend={false}
              />
              <div className="font-mono -translate-x-1/2 rounded-md bg-background/90 text-chart-2 text-[10px] font-bold border border-border/80 absolute bottom-2.5 left-1/2 px-2.5 py-1 shadow-xs max-w-[90%] truncate">
                {runB.path
                  ? runB.path.map((id) => nodeMap.get(id)?.label ?? id).join(" → ")
                  : "No reachable path"}
              </div>
            </div>

            {/* Metrics Row */}
            <div className="border-t border-border pt-4 grid gap-3 grid-cols-3 text-center sm:text-left">
              <div>
                <p className="text-muted-foreground text-xs">Route length</p>
                <p className="font-bold text-base md:text-lg mt-0.5 text-foreground">
                  {runB.path ? `${runB.path.length - 1} edges` : "—"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">
                  {algoB === "dijkstra" ? "Minimum weight" : "Total weight"}
                </p>
                <p className="font-bold text-chart-2 text-base md:text-lg mt-0.5">
                  {runB.pathWeight !== null ? runB.pathWeight : "—"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Traversal steps</p>
                <p className="font-bold text-base md:text-lg mt-0.5 text-foreground">
                  {runB.steps.length}
                </p>
              </div>
            </div>

            <p className="text-muted-foreground text-xs leading-relaxed border-t border-border/60 pt-3">
              {generateAlgorithmSummary(algoB, runB, runA)}
            </p>
          </div>
        </section>

        {/* Section 2: Metrics Table and Traversal Workload */}
        <section className="grid gap-6 grid-cols-1 lg:grid-cols-[1.45fr_0.85fr]">
          {/* Left: Metrics Comparison Table */}
          <div className="rounded-xl shadow-xs bg-card border border-border overflow-hidden">
            <div className="border-b border-border px-6 py-4 flex justify-between items-center bg-muted/20">
              <div>
                <h2 className="font-bold text-base md:text-lg text-foreground">
                  Metrics comparison
                </h2>
                <p className="text-muted-foreground text-xs mt-0.5">
                  Comparative run across the same {activeGraph.nodes.length}-node graph
                </p>
              </div>
              <Table2 className="text-muted-foreground size-5" />
            </div>

            <div className="overflow-x-auto">
              <table className="text-xs md:text-sm w-full border-collapse">
                <thead className="bg-muted text-muted-foreground text-xs uppercase tracking-wider text-left border-b border-border">
                  <tr>
                    <th className="font-semibold px-6 py-3">Metric</th>
                    <th className="font-bold text-primary px-6 py-3">
                      {metaA?.name || algoA.toUpperCase()}
                    </th>
                    <th className="font-bold text-chart-2 px-6 py-3">
                      {metaB?.name || algoB.toUpperCase()}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-3 font-medium text-muted-foreground">
                      Path result
                    </td>
                    <td className="px-6 py-3 font-semibold text-foreground">
                      {runA.found ? "Route found" : "No path"}
                    </td>
                    <td className="px-6 py-3 font-semibold text-foreground">
                      {runB.found ? "Route found" : "No path"}
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-3 font-medium text-muted-foreground">
                      Total path weight
                    </td>
                    <td className="px-6 py-3 font-bold text-foreground font-mono">
                      {runA.pathWeight !== null ? runA.pathWeight : "—"}
                    </td>
                    <td className="px-6 py-3 font-bold text-chart-2 font-mono">
                      {runB.pathWeight !== null ? runB.pathWeight : "—"}
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-3 font-medium text-muted-foreground">
                      Route length (edges)
                    </td>
                    <td className="px-6 py-3 font-mono">
                      {runA.path ? `${runA.path.length - 1} edges` : "—"}
                    </td>
                    <td className="px-6 py-3 font-mono">
                      {runB.path ? `${runB.path.length - 1} edges` : "—"}
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-3 font-medium text-muted-foreground">
                      Nodes visited
                    </td>
                    <td className="px-6 py-3 font-mono">{runA.visited}</td>
                    <td className="px-6 py-3 font-mono">{runB.visited}</td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-3 font-medium text-muted-foreground">
                      Edges examined
                    </td>
                    <td className="px-6 py-3 font-mono">{runA.edgesExamined}</td>
                    <td className="px-6 py-3 font-mono">{runB.edgesExamined}</td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-3 font-medium text-muted-foreground">
                      Traversal steps
                    </td>
                    <td className="px-6 py-3 font-mono">{runA.steps.length}</td>
                    <td className="px-6 py-3 font-mono">{runB.steps.length}</td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors bg-muted/10">
                    <td className="px-6 py-3 font-medium text-muted-foreground flex flex-col">
                      <span>Measured runtime</span>
                      <span className="text-[10px] text-muted-foreground/80 font-normal">
                        (this run only)
                      </span>
                    </td>
                    <td className="px-6 py-3 font-mono font-semibold text-primary">
                      {runA.measuredMs.toFixed(2)} ms
                    </td>
                    <td className="px-6 py-3 font-mono font-semibold text-chart-2">
                      {runB.measuredMs.toFixed(2)} ms
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-3 font-medium text-muted-foreground">
                      Theoretical time
                    </td>
                    <td className="px-6 py-3 font-mono text-xs">{runA.timeComplexity}</td>
                    <td className="px-6 py-3 font-mono text-xs">{runB.timeComplexity}</td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-3 font-medium text-muted-foreground">
                      Space complexity
                    </td>
                    <td className="px-6 py-3 font-mono text-xs">{runA.spaceComplexity}</td>
                    <td className="px-6 py-3 font-mono text-xs">{runB.spaceComplexity}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Traversal Workload & Interpretation */}
          <div className="flex flex-col gap-6">
            {/* Traversal Workload Card */}
            <div className="rounded-xl shadow-xs bg-card border border-border p-6 flex flex-col gap-5">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-bold text-base md:text-lg text-foreground">
                    Traversal workload
                  </h2>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    Comparative execution counts
                  </p>
                </div>
                <BarChart3 className="text-muted-foreground size-5" />
              </div>

              <div className="flex flex-col gap-4 mt-2">
                {/* Nodes Visited Relative Bar */}
                <div>
                  <div className="text-xs flex mb-1.5 justify-between">
                    <span className="font-medium">Nodes visited</span>
                    <span className="font-mono text-muted-foreground">
                      {runA.visited} ({pctVisitedA}%) / {runB.visited} ({pctVisitedB}%)
                    </span>
                  </div>
                  <div className="flex gap-1 h-3 rounded-md overflow-hidden bg-muted/60 p-0.5">
                    <div
                      className="rounded-sm bg-primary transition-all duration-300"
                      style={{ width: `${pctVisitedA}%` }}
                      title={`${metaA?.name ?? algoA}: ${runA.visited} nodes`}
                    />
                    <div
                      className="rounded-sm bg-chart-2 transition-all duration-300"
                      style={{ width: `${pctVisitedB}%` }}
                      title={`${metaB?.name ?? algoB}: ${runB.visited} nodes`}
                    />
                  </div>
                </div>

                {/* Edges Examined Relative Bar */}
                <div>
                  <div className="text-xs flex mb-1.5 justify-between">
                    <span className="font-medium">Edges examined</span>
                    <span className="font-mono text-muted-foreground">
                      {runA.edgesExamined} ({pctEdgesA}%) / {runB.edgesExamined} ({pctEdgesB}%)
                    </span>
                  </div>
                  <div className="flex gap-1 h-3 rounded-md overflow-hidden bg-muted/60 p-0.5">
                    <div
                      className="rounded-sm bg-primary transition-all duration-300"
                      style={{ width: `${pctEdgesA}%` }}
                      title={`${metaA?.name ?? algoA}: ${runA.edgesExamined} edges`}
                    />
                    <div
                      className="rounded-sm bg-chart-2 transition-all duration-300"
                      style={{ width: `${pctEdgesB}%` }}
                      title={`${metaB?.name ?? algoB}: ${runB.edgesExamined} edges`}
                    />
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="text-muted-foreground text-xs flex items-center gap-4 pt-3 border-t border-border/60">
                <span className="flex items-center gap-2">
                  <span className="rounded-full bg-primary size-2.5" />
                  <strong className="text-foreground">{metaA?.name || algoA.toUpperCase()}</strong>
                </span>
                <span className="flex items-center gap-2">
                  <span className="rounded-full bg-chart-2 size-2.5" />
                  <strong className="text-foreground">{metaB?.name || algoB.toUpperCase()}</strong>
                </span>
              </div>
            </div>

            {/* Generated Interpretation Card */}
            <div className="rounded-xl shadow-xs bg-primary/5 border border-primary/30 flex p-5 gap-3.5">
              <Lightbulb className="text-primary mt-0.5 shrink-0 size-5" />
              <div>
                <h3 className="font-bold text-sm text-foreground">
                  Interpretation
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed mt-1.5">
                  {generateInterpretation(algoA, algoB, runA, runB)}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Actions Bar */}
        <section className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center flex-wrap gap-2.5 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                playback.restart();
                navigate("/arena");
              }}
              className="gap-2 text-xs font-semibold cursor-pointer"
            >
              <RotateCcw className="size-3.5" />
              Replay execution
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/studio")}
              className="gap-2 text-xs font-semibold cursor-pointer"
            >
              <ArrowLeft className="size-3.5" />
              Return to graph
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/arena")}
              className="gap-2 text-xs font-semibold cursor-pointer"
            >
              <GitCompareArrows className="size-3.5" />
              Compare additional algorithms
            </Button>
          </div>

          {/* Export Results Split/Dropdown Button */}
          <div className="relative w-full sm:w-auto">
            <Button
              size="sm"
              onClick={() => setIsExportOpen((prev) => !prev)}
              className="gap-2 text-xs font-semibold cursor-pointer w-full sm:w-auto shadow-xs"
            >
              <Download className="size-3.5" />
              <span>Export results</span>
              <ChevronDown className="size-3.5" />
            </Button>

            {isExportOpen && (
              <div
                className="absolute right-0 bottom-full mb-2 w-48 rounded-lg bg-popover text-popover-foreground border border-border shadow-lg p-1 z-50 flex flex-col gap-0.5 animate-in fade-in-50"
                onBlur={() => setTimeout(() => setIsExportOpen(false), 200)}
              >
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs rounded hover:bg-accent cursor-pointer text-left w-full transition-colors"
                >
                  <FileSpreadsheet className="size-4 text-primary" />
                  <span>Export as CSV</span>
                </button>
                <button
                  type="button"
                  onClick={handleExportJSON}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs rounded hover:bg-accent cursor-pointer text-left w-full transition-colors"
                >
                  <FileText className="size-4 text-primary" />
                  <span>Export as JSON</span>
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default ArenaResults;
