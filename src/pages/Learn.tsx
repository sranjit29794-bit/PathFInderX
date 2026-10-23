import * as React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Crosshair,
  ExternalLink,
  GitBranch,
  GitCompare,
  Info,
  Layers,
  ListOrdered,
  NotebookTabs,
  Route,
  Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import GraphCanvas from "@/components/GraphCanvas";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type Graph } from "@/lib/graph";
import { type AlgorithmId } from "@/lib/algorithms";
import {
  LEARN_ALGORITHMS,
  LEARN_EXAMPLE_GRAPH,
  LEARN_SOURCE_ID,
  LEARN_GOAL_ID,
  getWalkthroughFrames,
} from "@/content/algorithms";

// Helper to compute edge IDs along path
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

export function Learn() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Validate algorithm from URL query param, fallback to 'bfs'
  const algoParam = searchParams.get("algo") as AlgorithmId | null;
  const validAlgoIds: AlgorithmId[] = ["bfs", "dfs", "dijkstra", "astar"];
  const selectedAlgoId: AlgorithmId =
    algoParam && validAlgoIds.includes(algoParam) ? algoParam : "bfs";

  const selectedContent =
    LEARN_ALGORITHMS.find((a) => a.id === selectedAlgoId) ?? LEARN_ALGORITHMS[0];

  // Implementation notes collapse state
  const [showNotes, setShowNotes] = React.useState(false);

  // Walkthrough frames generated from real engine execution
  const frames = React.useMemo(() => {
    return getWalkthroughFrames(selectedAlgoId);
  }, [selectedAlgoId]);

  const handleSelectAlgorithm = (id: AlgorithmId) => {
    setSearchParams({ algo: id }, { replace: false });
  };

  const algoIcons: Record<AlgorithmId, React.ReactNode> = {
    bfs: <Layers className="size-5" />,
    dfs: <GitBranch className="size-5" />,
    dijkstra: <Route className="size-5" />,
    astar: <Crosshair className="size-5" />,
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1 mx-auto p-6 md:p-10 lg:p-12 flex flex-col gap-8 max-w-7xl w-full">
        {/* Page Heading Section */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="max-w-3xl">
            <div className="font-semibold uppercase text-primary text-xs tracking-[0.18em] flex mb-2.5 items-center gap-2">
              <BookOpen className="size-4" />
              Algorithm field guide
            </div>
            <h1 className="font-bold text-foreground text-3xl md:text-4xl tracking-tight mb-2.5">
              Understand the route before you run it.
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              A compact field guide to graph traversal and pathfinding.
            </p>
          </div>
          <div className="rounded-lg bg-card text-muted-foreground text-xs md:text-sm border border-border flex px-4 py-3 items-center gap-2.5 shadow-xs">
            <Info className="text-primary size-4 shrink-0" />
            <span>Compare the fundamentals before opening a graph.</span>
          </div>
        </section>

        {/* Algorithm Picker 4-Button Grid */}
        <section
          aria-label="Algorithm choices"
          className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4"
        >
          {LEARN_ALGORITHMS.map((algo) => {
            const isSelected = algo.id === selectedAlgoId;
            return (
              <button
                key={algo.id}
                type="button"
                onClick={() => handleSelectAlgorithm(algo.id)}
                aria-pressed={isSelected}
                className={cn(
                  "flex items-center gap-3.5 p-3.5 rounded-xl border text-left transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-xs",
                  isSelected
                    ? "border-primary bg-primary/10 ring-1 ring-primary text-foreground"
                    : "border-border bg-card hover:bg-accent/40 text-muted-foreground hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "flex items-center justify-center size-10 rounded-lg shrink-0 transition-colors",
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {algoIcons[algo.id]}
                </span>
                <span className="min-w-0">
                  <span className="font-bold text-sm block truncate text-foreground">
                    {algo.id.toUpperCase()}
                  </span>
                  <span className="text-xs text-muted-foreground block truncate">
                    {algo.tagline}
                  </span>
                </span>
              </button>
            );
          })}
        </section>

        {/* Selected Algorithm Card & How It Works Card */}
        <section className="grid gap-6 grid-cols-1 lg:grid-cols-12 items-start">
          {/* LEFT: Selected Algorithm Card (7 cols) */}
          <div className="rounded-xl bg-card border border-border p-6 lg:col-span-7 flex flex-col gap-6 shadow-xs">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold uppercase text-primary text-xs tracking-[0.16em]">
                  Selected algorithm
                </div>
                <h2 className="font-bold text-2xl mt-1 text-foreground">
                  {selectedContent.name}
                </h2>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  "font-mono text-xs px-2.5 py-1",
                  selectedContent.kind === "Weighted"
                    ? "bg-amber-500/10 text-amber-500 border-amber-500/30"
                    : "bg-primary/10 text-primary border-primary/30",
                )}
              >
                {selectedContent.kind}
              </Badge>
            </div>

            {/* Walkthrough Frames or A* Placeholder */}
            {selectedContent.runnable && frames ? (
              <div className="grid gap-3.5 grid-cols-1 sm:grid-cols-3">
                {frames.map((frame, idx) => {
                  const framePathEdges = getPathEdgeIds(
                    LEARN_EXAMPLE_GRAPH,
                    frame.step.path,
                  );
                  return (
                    <div
                      key={idx}
                      className="rounded-lg bg-muted/40 border border-border p-3 flex flex-col gap-2 shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold uppercase text-primary text-[10px] tracking-wider">
                          {frame.tag}
                        </span>
                        <span className="text-[10px] font-mono text-muted-foreground">
                          Frame {idx + 1}/3
                        </span>
                      </div>

                      {/* Small Non-Interactive Canvas Frame */}
                      <div className="w-full h-32 relative rounded-md overflow-hidden bg-background border border-border/80">
                        <GraphCanvas
                          graph={LEARN_EXAMPLE_GRAPH}
                          sourceId={LEARN_SOURCE_ID}
                          goalId={LEARN_GOAL_ID}
                          nodeStates={frame.step.nodeStates}
                          examinedEdge={frame.step.examinedEdge}
                          pathEdges={framePathEdges}
                          interactive={false}
                          showLegend={false}
                        />
                      </div>

                      <div>
                        <div className="font-semibold text-xs text-foreground truncate">
                          {frame.title}
                        </div>
                        <div
                          className="text-muted-foreground text-[11px] truncate mt-0.5"
                          title={frame.subtitle}
                        >
                          {frame.subtitle}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* A* Search Static Explanation */
              <div className="rounded-xl border border-dashed border-border bg-muted/30 p-8 flex flex-col items-center justify-center text-center gap-3">
                <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Sparkles className="size-6" />
                </div>
                <div>
                  <Badge variant="outline" className="mb-2 text-xs">
                    Not runnable yet
                  </Badge>
                  <h3 className="font-bold text-base text-foreground">
                    Heuristic Directed Search
                  </h3>
                  <p className="text-muted-foreground text-xs max-w-md mt-1 leading-relaxed">
                    A* evaluates vertices using the cost function{" "}
                    <span className="font-mono font-semibold text-primary">
                      f(n) = g(n) + h(n)
                    </span>
                    , where <span className="font-mono">g(n)</span> is the exact
                    distance from the source and <span className="font-mono">h(n)</span>{" "}
                    is an admissible geometric estimate to the goal. Interactive live
                    frames will become active when A* is unlocked.
                  </p>
                </div>
              </div>
            )}

            {/* Data Structure Progression Row */}
            <div className="rounded-lg bg-background border border-border p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-md bg-primary/10 text-primary">
                  <ListOrdered className="size-4.5" />
                </span>
                <div>
                  <div className="font-semibold text-sm text-foreground">
                    {selectedContent.structureName} progression
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {selectedContent.id === "dfs"
                      ? "Last in, first out (LIFO) traversal"
                      : selectedContent.id === "dijkstra"
                        ? "Min-distance priority queue extraction"
                        : selectedContent.id === "astar"
                          ? "Heuristic priority queue evaluation"
                          : "First in, first out (FIFO) exploration"}
                  </div>
                </div>
              </div>

              {/* Data structure state snapshot badges */}
              <div className="flex items-center flex-wrap gap-1.5 font-mono text-xs">
                {selectedContent.runnable && frames ? (
                  <>
                    <span className="font-semibold px-2 py-0.5 rounded bg-muted text-foreground border border-border">
                      A
                    </span>
                    <ChevronRight className="text-muted-foreground size-3.5" />
                    <span className="font-semibold px-2 py-0.5 rounded bg-muted text-foreground border border-border">
                      {selectedContent.id === "dfs"
                        ? "C, B"
                        : selectedContent.id === "dijkstra"
                          ? "C(2), B(3)"
                          : "B, C"}
                    </span>
                    <ChevronRight className="text-muted-foreground size-3.5" />
                    <span className="font-semibold px-2 py-0.5 rounded bg-primary/15 text-primary border border-primary/30">
                      Goal F
                    </span>
                  </>
                ) : (
                  <Badge variant="outline" className="text-xs">
                    f(n) = g(n) + h(n)
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: How It Works Card (5 cols) */}
          <div className="rounded-xl bg-card border border-border p-6 lg:col-span-5 flex flex-col gap-6 shadow-xs">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-xl text-foreground">How it works</h2>
              <GitCompare className="text-primary size-5" />
            </div>

            {/* 3 Numbered Steps */}
            <div className="space-y-4">
              {selectedContent.howItWorks.map((step, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <span className="font-bold rounded-full bg-primary text-primary-foreground text-xs flex justify-center items-center shrink-0 size-6 shadow-xs mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="font-semibold text-sm text-foreground">
                      {step.title}
                    </div>
                    <div className="text-muted-foreground text-xs leading-relaxed mt-0.5">
                      {step.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 grid gap-4 grid-cols-1 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <div className="font-semibold uppercase text-muted-foreground text-[11px] tracking-wider">
                  Best for
                </div>
                <div className="text-sm font-medium mt-1 text-foreground leading-snug">
                  {selectedContent.bestFor}
                </div>
              </div>
              <div>
                <div className="font-semibold uppercase text-muted-foreground text-[11px] tracking-wider">
                  Strengths
                </div>
                <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {selectedContent.strengths}
                </div>
              </div>
              <div>
                <div className="font-semibold uppercase text-muted-foreground text-[11px] tracking-wider">
                  Limitations
                </div>
                <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {selectedContent.limitations}
                </div>
              </div>
            </div>

            {/* Badges for Weighted, Time, Space */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-border/60">
              <Badge variant="secondary" className="text-xs font-mono">
                Weighted: {selectedContent.weighted ? "Yes" : "No"}
              </Badge>
              <Badge variant="secondary" className="text-xs font-mono">
                Time: {selectedContent.time}
              </Badge>
              <Badge variant="secondary" className="text-xs font-mono">
                Space: {selectedContent.space}
              </Badge>
            </div>

            {/* Open in Graph Studio CTA Button */}
            <Button
              className="w-full gap-2 font-semibold h-10 shadow-xs cursor-pointer"
              disabled={!selectedContent.runnable}
              title={
                !selectedContent.runnable
                  ? "Coming soon — A* Search is not runnable yet"
                  : `Open ${selectedContent.name} in Graph Studio`
              }
              onClick={() => {
                if (selectedContent.runnable) {
                  navigate(`/studio?algo=${selectedContent.id}`);
                }
              }}
            >
              <ExternalLink className="size-4" />
              <span>Open {selectedContent.name} in Graph Studio</span>
            </Button>
          </div>
        </section>

        {/* At a Glance Comparison Table Section */}
        <section className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="font-semibold uppercase text-primary text-xs tracking-[0.16em]">
                At a glance
              </div>
              <h2 className="font-bold text-2xl mt-1 text-foreground">
                Algorithm comparison
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setShowNotes((prev) => !prev)}
              aria-expanded={showNotes}
              className="font-medium text-primary text-sm flex items-center gap-2 cursor-pointer hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded py-1 px-2"
            >
              <NotebookTabs className="size-4" />
              <span>
                {showNotes ? "Hide implementation notes" : "Show implementation notes"}
              </span>
              <ChevronDown
                className={cn(
                  "size-4 transition-transform duration-200",
                  showNotes && "rotate-180",
                )}
              />
            </button>
          </div>

          {/* Collapsible Implementation Notes */}
          {showNotes && (
            <div
              className="rounded-xl bg-card border border-border p-5 space-y-4 shadow-xs animate-in fade-in-50 duration-200"
              aria-label="Implementation Notes"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
                <Info className="size-4" />
                <span>Engine Implementation Architecture Notes</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {LEARN_ALGORITHMS.map((algo) => (
                  <div
                    key={algo.id}
                    className="p-3.5 rounded-lg bg-muted/40 border border-border/80 text-xs"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-foreground">
                        {algo.name} ({algo.id.toUpperCase()})
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {algo.structureName}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {algo.implementationNote}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comparison Table */}
          <div className="rounded-xl bg-card border border-border overflow-x-auto shadow-xs">
            <table className="text-left border-collapse w-full min-w-160">
              <thead className="uppercase bg-muted/70 text-muted-foreground text-xs tracking-wider border-b border-border">
                <tr>
                  <th className="font-semibold px-5 py-3.5">Algorithm</th>
                  <th className="font-semibold px-5 py-3.5">Strategy</th>
                  <th className="font-semibold px-5 py-3.5">Weighted</th>
                  <th className="font-semibold px-5 py-3.5">Best for</th>
                  <th className="font-semibold px-5 py-3.5">Time</th>
                  <th className="font-semibold px-5 py-3.5">Space</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-border/60">
                {LEARN_ALGORITHMS.map((algo) => {
                  const isCurrent = algo.id === selectedAlgoId;
                  return (
                    <tr
                      key={algo.id}
                      onClick={() => handleSelectAlgorithm(algo.id)}
                      className={cn(
                        "transition-colors cursor-pointer",
                        isCurrent
                          ? "bg-primary/5 font-medium"
                          : "hover:bg-muted/40",
                      )}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "font-bold",
                              isCurrent ? "text-primary" : "text-foreground",
                            )}
                          >
                            {algo.id.toUpperCase()}
                          </span>
                          {!algo.runnable && (
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                              Soon
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground block">
                          {algo.name}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs text-foreground">
                        {algo.strategy}
                      </td>
                      <td className="px-5 py-4 text-xs font-mono">
                        {algo.weighted ? (
                          <span className="text-amber-500 font-semibold">Yes</span>
                        ) : (
                          <span className="text-muted-foreground">No</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-xs text-muted-foreground max-w-64">
                        {algo.bestFor}
                      </td>
                      <td className="px-5 py-4 font-mono text-xs text-primary font-semibold">
                        {algo.time}
                      </td>
                      <td className="px-5 py-4 font-mono text-xs text-foreground">
                        {algo.space}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Learn;
