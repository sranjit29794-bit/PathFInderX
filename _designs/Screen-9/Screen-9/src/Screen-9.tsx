import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  CircleHelp,
  Compass,
  Download,
  GitBranch,
  GitCompareArrows,
  Lightbulb,
  Rocket,
  RotateCcw,
  Route,
  Table2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import "./ed6c55f0-5b6c-4493-8e29-8afb25959c9f.css";
import "./Screen-9.screen.css";

export default function Screen9() {
  const navigate = useNavigate();
  return (
    <div data-appearance="light">
      <div className="bg-background text-foreground w-full h-fit h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <header className="bg-sidebar text-foreground border-t-border border-r-border border-b border-b-border border-l-border w-full h-16">
          <div className="flex mx-auto px-6 items-center size-full">
            <a
              href="#"
              aria-label="PATHFINDER home"
              className="flex items-center shrink-0 gap-3"
              onClick={() => navigate("/screen-2")}
            >
              <span className="rounded-md bg-background text-primary border border-border flex justify-center items-center size-8">
                <Compass className="size-4" />
              </span>
              <span className="font-semibold text-foreground text-sm tracking-[0.2em]">
                PATHFINDER
              </span>
            </a>
            <nav
              aria-label="Primary navigation"
              className="flex ml-10 items-center gap-1 h-full"
            >
              <a
                href="#"
                className="font-medium text-muted-foreground text-sm flex px-4 items-center h-full"
                onClick={() => navigate("/screen-3")}
              >
                Graph Studio
              </a>
              <a
                href="#"
                className="font-medium text-muted-foreground text-sm flex px-4 items-center h-full"
                onClick={() => navigate("/screen-6")}
              >
                Algorithm Arena
              </a>
              <a
                href="#"
                className="font-medium text-muted-foreground text-sm flex px-4 items-center h-full"
                onClick={() => navigate("/screen-5")}
              >
                Algorithm Explorer
              </a>
              <a
                href="#"
                aria-current="page"
                className="font-medium text-primary text-sm flex relative px-4 items-center h-full after:bg-primary after:absolute after:inset-x-4 after:bottom-0 after:h-0.5"
                onClick={() => navigate("/screen-8")}
              >
                Learn
              </a>
            </nav>
            <div className="flex ml-auto items-center gap-5">
              <div className="text-muted-foreground text-xs flex items-center gap-2">
                <span className="rounded-full bg-primary size-2" />
                Operational
              </div>
              <button
                type="button"
                className="rounded-md text-muted-foreground flex justify-center items-center size-9"
              >
                <CircleHelp className="size-4" />
              </button>
              <button
                type="button"
                className="font-semibold rounded-md bg-primary text-primary-foreground text-sm flex px-3.5 items-center gap-2 h-9"
                onClick={() => navigate("/screen-3")}
              >
                <Rocket className="size-4" />
                Launch Studio
              </button>
            </div>
          </div>
        </header>
        <main className="flex mx-auto p-8 flex-col gap-8 max-w-7xl">
          <section className="flex justify-between items-start gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <h1 className="font-semibold text-3xl tracking-tight">
                  Run complete
                </h1>
                <Badge className="bg-primary/10 text-primary gap-2">
                  <span className="rounded-full bg-primary size-2" />
                  Complete
                </Badge>
              </div>
              <div className="text-muted-foreground text-sm flex items-center gap-6">
                <span>Weighted route</span>
                <span className="text-border">/</span>
                <span className="font-mono text-foreground">A → L</span>
                <span className="text-border">/</span>
                <span>12 nodes · 16 edges</span>
              </div>
            </div>
            <div className="text-muted-foreground text-sm flex items-center gap-2">
              <CheckCircle2 className="text-primary size-4" />
              Same graph, source, and destination
            </div>
          </section>
          <section className="grid gap-6 grid-cols-2">
            <Card className="shadow-sm bg-card border-primary/40 flex p-6 flex-col gap-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-primary/10 text-primary flex justify-center items-center size-10">
                    <GitBranch className="size-5" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-xl">BFS</h2>
                    <p className="text-muted-foreground text-sm">
                      Breadth-first search
                    </p>
                  </div>
                </div>
                <Badge className="bg-primary/10 text-primary">
                  Route found
                </Badge>
              </div>
              <div className="rounded-md bg-muted/40 border border-border relative h-36 overflow-hidden">
                <div className="bg-primary/30 absolute inset-x-12 top-1/2 h-px" />
                <div className="rotate-28 bg-primary/30 absolute top-8 left-28 w-px h-20" />
                <div className="-rotate-28 bg-primary/30 absolute top-8 right-28 w-px h-20" />
                <div className="font-semibold -translate-y-1/2 rounded-full bg-background text-primary text-xs border-2 border-primary flex absolute top-1/2 left-10 justify-center items-center size-8">
                  A
                </div>
                <div className="font-semibold -translate-1/2 rounded-full bg-primary/10 text-primary text-xs border-2 border-primary flex absolute top-1/2 left-1/2 justify-center items-center size-8">
                  F
                </div>
                <div className="font-semibold -translate-y-1/2 rounded-full bg-primary text-primary-foreground text-xs border-2 border-primary flex absolute top-1/2 right-10 justify-center items-center size-8">
                  L
                </div>
                <div className="rounded-full bg-card text-muted-foreground text-xs border border-border flex absolute top-5 left-1/4 justify-center items-center size-7">
                  C
                </div>
                <div className="rounded-full bg-card text-muted-foreground text-xs border border-border flex absolute top-5 right-1/4 justify-center items-center size-7">
                  H
                </div>
                <div className="font-mono -translate-x-1/2 rounded-sm bg-background/80 text-primary text-[10px] absolute bottom-3 left-1/2 px-2 py-1">
                  A → C → F → I → L
                </div>
              </div>
              <div className="border-x-border border-t border-t-border border-b-border grid pt-5 gap-4 grid-cols-3">
                <div>
                  <p className="text-muted-foreground text-xs">Route length</p>
                  <p className="font-semibold text-lg mt-1">4 edges</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Total weight</p>
                  <p className="font-semibold text-lg mt-1">18</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">
                    Traversal steps
                  </p>
                  <p className="font-semibold text-lg mt-1">12</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-6">
                BFS reached the destination in the fewest edges, but its route
                is not weight-optimal on weighted graphs.
              </p>
            </Card>
            <Card className="shadow-sm bg-card border-chart-2/50 flex p-6 flex-col gap-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-chart-2/10 text-chart-2 flex justify-center items-center size-10">
                    <Route className="size-5" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-xl">Dijkstra</h2>
                    <p className="text-muted-foreground text-sm">
                      Weighted shortest path
                    </p>
                  </div>
                </div>
                <Badge className="bg-chart-2/10 text-chart-2">
                  Route found
                </Badge>
              </div>
              <div className="rounded-md bg-muted/40 border border-border relative h-36 overflow-hidden">
                <div className="bg-chart-2/30 absolute inset-x-12 top-1/2 h-px" />
                <div className="rotate-28 bg-chart-2 absolute top-8 left-28 w-px h-20" />
                <div className="-rotate-28 bg-chart-2 absolute top-8 right-28 w-px h-20" />
                <div className="font-semibold -translate-y-1/2 rounded-full bg-background text-chart-2 text-xs border-2 border-chart-2 flex absolute top-1/2 left-10 justify-center items-center size-8">
                  A
                </div>
                <div className="font-semibold -translate-1/2 rounded-full bg-chart-2/10 text-chart-2 text-xs border-2 border-chart-2 flex absolute top-1/2 left-1/2 justify-center items-center size-8">
                  F
                </div>
                <div className="font-semibold -translate-y-1/2 rounded-full bg-chart-2 text-primary-foreground text-xs border-2 border-chart-2 flex absolute top-1/2 right-10 justify-center items-center size-8">
                  L
                </div>
                <div className="rounded-full bg-card text-muted-foreground text-xs border border-border flex absolute top-5 left-1/4 justify-center items-center size-7">
                  C
                </div>
                <div className="rounded-full bg-card text-muted-foreground text-xs border border-border flex absolute top-5 right-1/4 justify-center items-center size-7">
                  H
                </div>
                <div className="font-mono -translate-x-1/2 rounded-sm bg-background/80 text-chart-2 text-[10px] absolute bottom-3 left-1/2 px-2 py-1">
                  A → C → F → I → L
                </div>
              </div>
              <div className="border-x-border border-t border-t-border border-b-border grid pt-5 gap-4 grid-cols-3">
                <div>
                  <p className="text-muted-foreground text-xs">Route length</p>
                  <p className="font-semibold text-lg mt-1">4 edges</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">
                    Minimum weight
                  </p>
                  <p className="font-semibold text-chart-2 text-lg mt-1">14</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">
                    Traversal steps
                  </p>
                  <p className="font-semibold text-lg mt-1">14</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-6">
                Dijkstra found the minimum-total-weight route by evaluating
                cumulative distance across the weighted graph.
              </p>
            </Card>
          </section>
          <section className="grid gap-6 grid-cols-[1.45fr_0.85fr]">
            <Card className="shadow-sm bg-card overflow-hidden">
              <div className="border-t-border border-r-border border-b border-b-border border-l-border flex px-6 py-5 justify-between items-center">
                <div>
                  <h2 className="font-semibold text-lg">Metrics comparison</h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Completed run across the same 12-node graph
                  </p>
                </div>
                <Table2 className="text-muted-foreground size-5" />
              </div>
              <div className="text-sm grid grid-cols-[1.4fr_1fr_1fr]">
                <div className="font-medium bg-muted text-muted-foreground px-6 py-3">
                  Metric
                </div>
                <div className="font-medium bg-muted text-primary px-6 py-3">
                  BFS
                </div>
                <div className="font-medium bg-muted text-chart-2 px-6 py-3">
                  Dijkstra
                </div>
                <div className="border-x-border border-t border-t-border border-b-border px-6 py-3">
                  Total path weight
                </div>
                <div className="font-semibold border-x-border border-t border-t-border border-b-border px-6 py-3">
                  18
                </div>
                <div className="font-semibold text-chart-2 border-x-border border-t border-t-border border-b-border px-6 py-3">
                  14
                </div>
                <div className="border-x-border border-t border-t-border border-b-border px-6 py-3">
                  Nodes visited
                </div>
                <div className="border-x-border border-t border-t-border border-b-border px-6 py-3">
                  9
                </div>
                <div className="border-x-border border-t border-t-border border-b-border px-6 py-3">
                  10
                </div>
                <div className="border-x-border border-t border-t-border border-b-border px-6 py-3">
                  Edges examined
                </div>
                <div className="border-x-border border-t border-t-border border-b-border px-6 py-3">
                  13
                </div>
                <div className="border-x-border border-t border-t-border border-b-border px-6 py-3">
                  16
                </div>
                <div className="border-x-border border-t border-t-border border-b-border px-6 py-3">
                  Measured runtime
                </div>
                <div className="border-x-border border-t border-t-border border-b-border px-6 py-3">
                  0.42 ms
                </div>
                <div className="border-x-border border-t border-t-border border-b-border px-6 py-3">
                  0.61 ms
                </div>
                <div className="border-x-border border-t border-t-border border-b-border px-6 py-3">
                  Theoretical time
                </div>
                <div className="font-mono text-xs border-x-border border-t border-t-border border-b-border px-6 py-3">
                  O(V + E)
                </div>
                <div className="font-mono text-xs border-x-border border-t border-t-border border-b-border px-6 py-3">
                  O((V + E) log V)
                </div>
                <div className="border-x-border border-t border-t-border border-b-border px-6 py-3">
                  Space complexity
                </div>
                <div className="font-mono text-xs border-x-border border-t border-t-border border-b-border px-6 py-3">
                  O(V)
                </div>
                <div className="font-mono text-xs border-x-border border-t border-t-border border-b-border px-6 py-3">
                  O(V + E)
                </div>
                <div className="border-x-border border-t border-t-border border-b-border px-6 py-3">
                  Traversal steps
                </div>
                <div className="border-x-border border-t border-t-border border-b-border px-6 py-3">
                  12
                </div>
                <div className="border-x-border border-t border-t-border border-b-border px-6 py-3">
                  14
                </div>
              </div>
            </Card>
            <div className="flex flex-col gap-6">
              <Card className="shadow-sm bg-card p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-semibold text-lg">
                      Traversal workload
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      This run only
                    </p>
                  </div>
                  <BarChart3 className="text-muted-foreground size-5" />
                </div>
                <div className="flex mt-6 flex-col gap-5">
                  <div>
                    <div className="text-sm flex mb-2 justify-between">
                      <span>Nodes visited</span>
                      <span className="font-mono text-muted-foreground">
                        9 / 10
                      </span>
                    </div>
                    <div className="flex gap-1 h-3">
                      <div className="rounded-xs bg-primary w-3/4" />
                      <div className="rounded-xs bg-chart-2 w-[8%]" />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm flex mb-2 justify-between">
                      <span>Edges examined</span>
                      <span className="font-mono text-muted-foreground">
                        13 / 16
                      </span>
                    </div>
                    <div className="flex gap-1 h-3">
                      <div className="rounded-xs bg-primary w-[81%]" />
                      <div className="rounded-xs bg-chart-2 w-[19%]" />
                    </div>
                  </div>
                </div>
                <div className="text-muted-foreground text-xs flex mt-6 items-center gap-4">
                  <span className="flex items-center gap-2">
                    <span className="rounded-full bg-primary size-2" />
                    BFS
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="rounded-full bg-chart-2 size-2" />
                    Dijkstra
                  </span>
                </div>
              </Card>
              <Card className="shadow-sm bg-primary/5 border-primary/30 flex p-6 gap-4">
                <Lightbulb className="text-primary mt-1 shrink-0 size-5" />
                <div>
                  <h2 className="font-semibold">Interpretation</h2>
                  <p className="text-muted-foreground text-sm leading-6 mt-2">
                    Measured runtime reflects this browser run and graph size;
                    it is not a universal speed ranking.
                  </p>
                </div>
              </Card>
            </div>
          </section>
          <section className="border-x-border border-t border-t-border border-b-border flex pt-6 justify-between items-center">
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => navigate("/screen-7")}>
                <RotateCcw className="size-4" />
                Replay execution
              </Button>
              <Button variant="outline" onClick={() => navigate("/screen-3")}>
                <ArrowLeft className="size-4" />
                Return to graph
              </Button>
              <Button variant="outline" onClick={() => navigate("/screen-5")}>
                <GitCompareArrows className="size-4" />
                Compare additional algorithms
              </Button>
            </div>
            <Button>
              <Download className="size-4" />
              Export results
            </Button>
          </section>
        </main>
      </div>
    </div>
  );
}
