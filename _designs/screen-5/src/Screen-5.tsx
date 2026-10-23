import { useNavigate } from "react-router-dom";
import {
  CircleHelp,
  Compass,
  Copy,
  Crosshair,
  GitBranch,
  GitCompareArrows,
  GitFork,
  MapPin,
  Play,
  Rocket,
  Route,
  Timer,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

import "./ed6c55f0-5b6c-4493-8e29-8afb25959c9f.css";
import "./Screen-5.screen.css";

export default function Screen5() {
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
                <Compass aria-hidden="true" className="size-4" />
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
                aria-current="page"
                className="font-medium text-primary text-sm flex relative px-4 items-center h-full after:bg-primary after:absolute after:inset-x-4 after:bottom-0 after:h-0.5"
                onClick={() => navigate("/screen-7")}
              >
                Algorithm Arena
              </a>
              <a
                href="#"
                className="font-medium text-muted-foreground text-sm flex px-4 items-center h-full"
                onClick={() => navigate("/screen-8")}
              >
                Algorithm Explorer
              </a>
              <a
                href="#"
                className="font-medium text-muted-foreground text-sm flex px-4 items-center h-full"
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
        <main className="flex mx-auto px-12 py-8 flex-col gap-6 w-full">
          <div className="flex justify-between items-end">
            <div>
              <p className="font-semibold uppercase text-primary text-xs tracking-[0.18em] mb-2">
                Algorithm selection
              </p>
              <h1 className="font-semibold text-3xl tracking-tight mb-2">
                Choose your algorithms
              </h1>
              <p className="text-muted-foreground text-base">
                Run one algorithm or compare several on the same graph.
              </p>
            </div>
          </div>
          <div className="shadow-xs rounded-lg bg-card border border-border flex px-5 py-3 items-center gap-6">
            <div className="text-sm flex items-center gap-2">
              <span className="text-muted-foreground">Graph</span>
              <span className="font-medium">Weighted route</span>
            </div>
            <div className="bg-border w-px h-4" />
            <div className="text-sm flex items-center gap-2">
              <span className="text-muted-foreground">Source</span>
              <span className="font-mono font-medium">A</span>
            </div>
            <div className="bg-border w-px h-4" />
            <div className="text-sm flex items-center gap-2">
              <span className="text-muted-foreground">Destination</span>
              <span className="font-mono font-medium">L</span>
            </div>
            <div className="bg-border w-px h-4" />
            <span className="text-muted-foreground text-sm">
              12 nodes · 16 edges
            </span>
            <Badge className="bg-primary/10 text-primary ml-auto">
              Same graph for every run
            </Badge>
          </div>
          <div className="flex items-start gap-6">
            <section
              aria-label="Algorithm choices"
              className="grid flex-1 gap-4 grid-cols-2"
            >
              <Card>
                <div className="flex p-6 flex-col gap-5 h-full">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-md bg-primary/10 text-primary flex justify-center items-center size-11">
                        <GitBranch className="size-5" />
                      </div>
                      <div>
                        <h2 className="font-semibold text-lg">
                          Breadth-First Search
                        </h2>
                        <p className="font-mono text-muted-foreground text-xs">
                          BFS
                        </p>
                      </div>
                    </div>
                    <Checkbox
                      aria-label="Select Breadth-First Search"
                      defaultChecked={true}
                    />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Unweighted shortest-path search.
                  </p>
                  <div className="text-sm border-x-border border-t border-t-border border-b-border flex pt-4 justify-between items-center">
                    <span className="text-muted-foreground">Best for</span>
                    <span className="font-medium">Fewest-hop routes</span>
                  </div>
                  <div className="text-sm flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Weighted edges
                    </span>
                    <Badge variant="outline">No</Badge>
                  </div>
                  <div className="border-x-border border-t border-t-border border-b-border grid pt-4 gap-4 grid-cols-2">
                    <div>
                      <p className="text-muted-foreground text-xs">Time</p>
                      <p className="font-mono font-medium text-sm mt-1">
                        O(V + E)
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Space</p>
                      <p className="font-mono font-medium text-sm mt-1">O(V)</p>
                    </div>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="flex p-6 flex-col gap-5 h-full">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-md bg-chart-2/10 text-chart-2 flex justify-center items-center size-11">
                        <GitFork className="size-5" />
                      </div>
                      <div>
                        <h2 className="font-semibold text-lg">
                          Depth-First Search
                        </h2>
                        <p className="font-mono text-muted-foreground text-xs">
                          DFS
                        </p>
                      </div>
                    </div>
                    <Checkbox
                      aria-label="Select Depth-First Search"
                      defaultChecked={false}
                    />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Depth-oriented traversal.
                  </p>
                  <div className="text-sm border-x-border border-t border-t-border border-b-border flex pt-4 justify-between items-center">
                    <span className="text-muted-foreground">Best for</span>
                    <span className="font-medium">
                      Exploring connected paths
                    </span>
                  </div>
                  <div className="text-sm flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Weighted edges
                    </span>
                    <Badge variant="outline">No</Badge>
                  </div>
                  <div className="border-x-border border-t border-t-border border-b-border grid pt-4 gap-4 grid-cols-2">
                    <div>
                      <p className="text-muted-foreground text-xs">Time</p>
                      <p className="font-mono font-medium text-sm mt-1">
                        O(V + E)
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Space</p>
                      <p className="font-mono font-medium text-sm mt-1">O(V)</p>
                    </div>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="flex p-6 flex-col gap-5 h-full">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-md bg-chart-2/10 text-chart-2 flex justify-center items-center size-11">
                        <Route className="size-5" />
                      </div>
                      <div>
                        <h2 className="font-semibold text-lg">
                          Dijkstra's Algorithm
                        </h2>
                        <p className="font-mono text-muted-foreground text-xs">
                          DIJKSTRA
                        </p>
                      </div>
                    </div>
                    <Checkbox
                      aria-label="Select Dijkstra's Algorithm"
                      defaultChecked={true}
                    />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Minimum-cost route for non-negative weights.
                  </p>
                  <div className="text-sm border-x-border border-t border-t-border border-b-border flex pt-4 justify-between items-center">
                    <span className="text-muted-foreground">Best for</span>
                    <span className="font-medium">
                      Weighted route optimization
                    </span>
                  </div>
                  <div className="text-sm flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Weighted edges
                    </span>
                    <Badge className="bg-chart-2/10 text-chart-2">Yes</Badge>
                  </div>
                  <div className="border-x-border border-t border-t-border border-b-border grid pt-4 gap-4 grid-cols-2">
                    <div>
                      <p className="text-muted-foreground text-xs">Time</p>
                      <p className="font-mono font-medium text-sm mt-1">
                        O((V + E) log V)
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Space</p>
                      <p className="font-mono font-medium text-sm mt-1">
                        O(V + E)
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="flex p-6 flex-col gap-5 h-full">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-md bg-primary/10 text-primary flex justify-center items-center size-11">
                        <Crosshair className="size-5" />
                      </div>
                      <div>
                        <h2 className="font-semibold text-lg">A* Search</h2>
                        <p className="font-mono text-muted-foreground text-xs">
                          A-STAR
                        </p>
                      </div>
                    </div>
                    <Checkbox
                      aria-label="Select A* Search"
                      defaultChecked={false}
                    />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Heuristic-guided pathfinding.
                  </p>
                  <div className="text-sm border-x-border border-t border-t-border border-b-border flex pt-4 justify-between items-center">
                    <span className="text-muted-foreground">Best for</span>
                    <span className="font-medium">Directed map navigation</span>
                  </div>
                  <div className="text-sm flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Weighted edges
                    </span>
                    <Badge className="bg-primary/10 text-primary">Yes</Badge>
                  </div>
                  <div className="border-x-border border-t border-t-border border-b-border grid pt-4 gap-4 grid-cols-2">
                    <div>
                      <p className="text-muted-foreground text-xs">Time</p>
                      <p className="font-mono font-medium text-sm mt-1">
                        Depends on heuristic
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Space</p>
                      <p className="font-mono font-medium text-sm mt-1">O(V)</p>
                    </div>
                  </div>
                </div>
              </Card>
            </section>
            <aside className="shrink-0 w-80">
              <Card className="shadow-xs bg-sidebar border-border">
                <div className="p-6">
                  <div className="mb-6">
                    <div className="rounded-md bg-primary/10 text-primary flex mb-3 justify-center items-center size-10">
                      <GitCompareArrows className="size-5" />
                    </div>
                    <h2 className="font-semibold text-lg">Comparison mode</h2>
                    <p className="text-muted-foreground text-sm leading-6 mt-2">
                      Run equivalent copies of this graph side by side to see
                      how each algorithm behaves.
                    </p>
                  </div>
                  <div className="border-x-border border-t border-t-border border-b-border pt-5">
                    <div className="flex mb-4 gap-3">
                      <Copy className="text-primary mt-0.5 shrink-0 size-4" />
                      <p className="text-muted-foreground text-sm">
                        Each algorithm receives an equivalent copy of the same
                        graph.
                      </p>
                    </div>
                    <div className="flex mb-4 gap-3">
                      <MapPin className="text-primary mt-0.5 shrink-0 size-4" />
                      <p className="text-muted-foreground text-sm">
                        Source A and destination L stay identical for every run.
                      </p>
                    </div>
                    <div className="flex mb-4 gap-3">
                      <Play className="text-primary mt-0.5 shrink-0 size-4" />
                      <p className="text-muted-foreground text-sm">
                        Playback stays synchronized so traversal decisions are
                        easy to compare.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Timer className="text-primary mt-0.5 shrink-0 size-4" />
                      <p className="text-muted-foreground text-sm">
                        Measured runtime is shown separately from theoretical
                        complexity.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </aside>
          </div>
        </main>
        <div className="shadow-lg bg-card border-x-border border-t border-t-border border-b-border flex sticky bottom-0 px-12 py-4 justify-between items-center">
          <p className="font-medium text-sm">2 algorithms selected</p>
          <div className="flex items-center gap-3">
            <Button variant="outline">Clear selection</Button>
            <Button onClick={() => navigate("/screen-6")}>
              <Play className="size-4" />
              Compare selected algorithms
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
