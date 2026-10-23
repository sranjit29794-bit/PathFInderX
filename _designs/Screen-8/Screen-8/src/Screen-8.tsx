import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Compass,
  Crosshair,
  ExternalLink,
  GitBranch,
  GitCompare,
  Info,
  Layers,
  ListOrdered,
  NotebookTabs,
  Rocket,
  Route,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import "./ed6c55f0-5b6c-4493-8e29-8afb25959c9f.css";
import "./Screen-8.screen.css";

export default function Screen8() {
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
                aria-current="page"
                className="font-medium text-primary text-sm flex relative px-4 items-center h-full after:bg-primary after:absolute after:inset-x-4 after:bottom-0 after:h-0.5"
                onClick={() => navigate("/screen-5")}
              >
                Algorithm Explorer
              </a>
              <a
                href="#"
                className="font-medium text-muted-foreground text-sm flex px-4 items-center h-full"
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
        <main className="flex mx-auto p-12 flex-col gap-8 max-w-7xl">
          <section className="flex justify-between items-end gap-8">
            <div className="max-w-3xl">
              <div className="font-medium uppercase text-primary text-xs tracking-[0.18em] flex mb-3 items-center gap-2">
                <BookOpen className="size-4" />
                Algorithm field guide
              </div>
              <h1 className="font-semibold text-foreground text-4xl tracking-tight mb-3">
                Understand the route before you run it.
              </h1>
              <p className="text-muted-foreground text-lg">
                A compact field guide to graph traversal and pathfinding.
              </p>
            </div>
            <div className="rounded-md bg-card text-muted-foreground text-sm border border-border flex px-4 py-3 items-center gap-2">
              <Info className="text-primary size-4" />
              Compare the fundamentals before opening a graph.
            </div>
          </section>
          <section aria-label="Algorithms" className="grid gap-4 grid-cols-4">
            <button type="button">
              <span>
                <Layers className="size-5" />
              </span>
              <span>
                <span className="font-semibold text-foreground text-sm block">
                  BFS
                </span>
                <span className="text-muted-foreground text-xs">
                  Queue-based search
                </span>
              </span>
            </button>
            <button type="button">
              <span>
                <GitBranch className="size-5" />
              </span>
              <span>
                <span className="font-semibold text-foreground text-sm block">
                  DFS
                </span>
                <span className="text-muted-foreground text-xs">
                  Depth-oriented search
                </span>
              </span>
            </button>
            <button type="button">
              <span>
                <Route className="size-5" />
              </span>
              <span>
                <span className="font-semibold text-foreground text-sm block">
                  Dijkstra
                </span>
                <span className="text-muted-foreground text-xs">
                  Weighted shortest path
                </span>
              </span>
            </button>
            <button type="button">
              <span>
                <Crosshair className="size-5" />
              </span>
              <span>
                <span className="font-semibold text-foreground text-sm block">
                  A*
                </span>
                <span className="text-muted-foreground text-xs">
                  Heuristic-guided search
                </span>
              </span>
            </button>
          </section>
          <section className="grid gap-6 grid-cols-12">
            <Card className="bg-card border-border p-6 col-span-7">
              <div className="flex mb-5 justify-between items-center">
                <div>
                  <div className="font-medium uppercase text-primary text-xs tracking-[0.16em]">
                    Selected algorithm
                  </div>
                  <h2 className="font-semibold text-2xl mt-1">
                    Breadth-First Search
                  </h2>
                </div>
                <Badge className="bg-primary/10 text-primary">Unweighted</Badge>
              </div>
              <div className="grid gap-3 grid-cols-3">
                <div className="rounded-md bg-muted/50 border border-border p-3">
                  <div className="font-semibold uppercase text-muted-foreground text-xs tracking-wide mb-2">
                    Discover
                  </div>
                  <svg viewBox="0 0 180 115" className="w-full h-28">
                    <path
                      d="M20 58 L62 25 L106 48 L155 22 M62 25 L78 92 L106 48 L145 88 M106 48 L155 92"
                      fill="none"
                      stroke="var(--color-border)"
                      strokeWidth="2"
                    />
                    <circle cx="20" cy="58" r="8" fill="var(--color-primary)" />
                    <circle
                      cx="62"
                      cy="25"
                      r="7"
                      fill="var(--color-muted)"
                      stroke="var(--color-primary)"
                      strokeWidth="2"
                    />
                    <circle cx="106" cy="48" r="7" fill="var(--color-muted)" />
                    <circle cx="155" cy="22" r="7" fill="var(--color-muted)" />
                    <circle cx="78" cy="92" r="7" fill="var(--color-muted)" />
                    <circle cx="145" cy="88" r="7" fill="var(--color-muted)" />
                    <circle cx="155" cy="92" r="7" fill="var(--color-muted)" />
                  </svg>
                  <div className="text-muted-foreground text-xs">
                    Start at A
                  </div>
                </div>
                <div className="rounded-md bg-muted/50 border border-border p-3">
                  <div className="font-semibold uppercase text-muted-foreground text-xs tracking-wide mb-2">
                    Enqueue
                  </div>
                  <svg viewBox="0 0 180 115" className="w-full h-28">
                    <path
                      d="M20 58 L62 25 L106 48 L155 22 M62 25 L78 92 L106 48 L145 88 M106 48 L155 92"
                      fill="none"
                      stroke="var(--color-border)"
                      strokeWidth="2"
                    />
                    <circle cx="20" cy="58" r="8" fill="var(--color-primary)" />
                    <circle cx="62" cy="25" r="7" fill="var(--color-primary)" />
                    <circle
                      cx="106"
                      cy="48"
                      r="7"
                      fill="var(--color-primary)"
                    />
                    <circle cx="155" cy="22" r="7" fill="var(--color-muted)" />
                    <circle cx="78" cy="92" r="7" fill="var(--color-muted)" />
                    <circle cx="145" cy="88" r="7" fill="var(--color-muted)" />
                    <circle cx="155" cy="92" r="7" fill="var(--color-muted)" />
                  </svg>
                  <div className="text-muted-foreground text-xs">
                    Queue: B, C
                  </div>
                </div>
                <div className="rounded-md bg-muted/50 border border-border p-3">
                  <div className="font-semibold uppercase text-muted-foreground text-xs tracking-wide mb-2">
                    Process
                  </div>
                  <svg viewBox="0 0 180 115" className="w-full h-28">
                    <path
                      d="M20 58 L62 25 L106 48 L155 22 M62 25 L78 92 L106 48 L145 88 M106 48 L155 92"
                      fill="none"
                      stroke="var(--color-primary)"
                      strokeWidth="2"
                    />
                    <circle cx="20" cy="58" r="8" fill="var(--color-primary)" />
                    <circle cx="62" cy="25" r="7" fill="var(--color-primary)" />
                    <circle
                      cx="106"
                      cy="48"
                      r="7"
                      fill="var(--color-primary)"
                      stroke="var(--color-primary)"
                      strokeWidth="4"
                    />
                    <circle cx="155" cy="22" r="7" fill="var(--color-muted)" />
                    <circle cx="78" cy="92" r="7" fill="var(--color-muted)" />
                    <circle cx="145" cy="88" r="7" fill="var(--color-muted)" />
                    <circle cx="155" cy="92" r="7" fill="var(--color-muted)" />
                  </svg>
                  <div className="text-muted-foreground text-xs">
                    Process C next
                  </div>
                </div>
              </div>
              <div className="rounded-md bg-background border border-border flex mt-6 p-4 justify-between items-center">
                <div className="flex items-center gap-3">
                  <ListOrdered className="text-primary size-5" />
                  <div>
                    <div className="font-medium text-sm">Queue progression</div>
                    <div className="text-muted-foreground text-xs">
                      First in, first out exploration
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">A</Badge>
                  <ChevronRight className="text-muted-foreground size-4" />
                  <Badge variant="secondary">B</Badge>
                  <ChevronRight className="text-muted-foreground size-4" />
                  <Badge variant="secondary">C</Badge>
                </div>
              </div>
            </Card>
            <Card className="bg-card border-border p-6 col-span-5">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl">How it works</h2>
                <GitCompare className="text-primary size-5" />
              </div>
              <div className="mt-5">
                <div className="flex mb-4 gap-3">
                  <span className="font-semibold rounded-full bg-primary text-primary-foreground text-xs flex justify-center items-center shrink-0 size-6">
                    1
                  </span>
                  <div>
                    <div className="font-medium text-sm">
                      Start at the source
                    </div>
                    <div className="text-muted-foreground text-xs">
                      Mark the starting vertex and add it to the queue.
                    </div>
                  </div>
                </div>
                <div className="flex mb-4 gap-3">
                  <span className="font-semibold rounded-full bg-primary text-primary-foreground text-xs flex justify-center items-center shrink-0 size-6">
                    2
                  </span>
                  <div>
                    <div className="font-medium text-sm">
                      Explore layer by layer
                    </div>
                    <div className="text-muted-foreground text-xs">
                      Visit each unvisited neighbor before moving deeper.
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="font-semibold rounded-full bg-primary text-primary-foreground text-xs flex justify-center items-center shrink-0 size-6">
                    3
                  </span>
                  <div>
                    <div className="font-medium text-sm">
                      Stop at the destination
                    </div>
                    <div className="text-muted-foreground text-xs">
                      The first discovery gives the shortest path in edges.
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-x-border border-t border-t-border border-b-border my-6" />
              <div className="grid gap-5 grid-cols-2">
                <div>
                  <div className="font-semibold uppercase text-muted-foreground text-xs tracking-wide">
                    Best for
                  </div>
                  <div className="text-sm mt-1">Unweighted shortest paths</div>
                </div>
                <div>
                  <div className="font-semibold uppercase text-muted-foreground text-xs tracking-wide">
                    Strengths
                  </div>
                  <div className="text-sm mt-1">
                    Complete and optimal in unweighted graphs
                  </div>
                </div>
                <div>
                  <div className="font-semibold uppercase text-muted-foreground text-xs tracking-wide">
                    Limitations
                  </div>
                  <div className="text-sm mt-1">Ignores edge weights</div>
                </div>
              </div>
              <div className="flex mt-6 flex-wrap gap-2">
                <Badge variant="secondary">Weighted edges No</Badge>
                <Badge variant="secondary">Time O(V + E)</Badge>
                <Badge variant="secondary">Space O(V)</Badge>
              </div>
              <Button
                className="mt-6 w-full"
                onClick={() => navigate("/screen-3")}
              >
                <ExternalLink className="size-4" />
                Open BFS in Graph Studio
              </Button>
            </Card>
          </section>
          <section>
            <div className="flex mb-4 justify-between items-end">
              <div>
                <div className="font-medium uppercase text-primary text-xs tracking-[0.16em]">
                  At a glance
                </div>
                <h2 className="font-semibold text-2xl mt-1">
                  Algorithm comparison
                </h2>
              </div>
              <button
                type="button"
                className="font-medium text-primary text-sm flex items-center gap-2"
              >
                <NotebookTabs className="size-4" />
                Show implementation notes
                <ChevronDown className="size-4" />
              </button>
            </div>
            <div className="rounded-md bg-muted text-muted-foreground text-sm border border-border hidden mb-4 p-4 items-center gap-3">
              <Info className="text-primary shrink-0 size-4" />
              A* complexity depends on the heuristic and graph; avoid treating
              one universal bound as guaranteed.
            </div>
            <div className="rounded-lg bg-card border border-border overflow-hidden">
              <table className="text-left border-collapse w-full">
                <thead className="uppercase bg-muted text-muted-foreground text-xs tracking-wide">
                  <tr>
                    <th className="font-semibold px-5 py-4">Algorithm</th>
                    <th className="font-semibold px-5 py-4">Strategy</th>
                    <th className="font-semibold px-5 py-4">Weighted edges</th>
                    <th className="font-semibold px-5 py-4">Best for</th>
                    <th className="font-semibold px-5 py-4">Time</th>
                    <th className="font-semibold px-5 py-4">Space</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-t-border border-r-border border-b border-b-border border-l-border">
                    <td className="font-semibold text-primary px-5 py-4">
                      BFS
                    </td>
                    <td className="px-5 py-4">Queue, layer by layer</td>
                    <td className="px-5 py-4">No</td>
                    <td className="px-5 py-4">Unweighted shortest paths</td>
                    <td className="font-mono text-xs px-5 py-4">O(V + E)</td>
                    <td className="font-mono text-xs px-5 py-4">O(V)</td>
                  </tr>
                  <tr className="border-t-border border-r-border border-b border-b-border border-l-border">
                    <td className="font-semibold px-5 py-4">DFS</td>
                    <td className="px-5 py-4">Stack or recursion</td>
                    <td className="px-5 py-4">No</td>
                    <td className="px-5 py-4">Reachability and structure</td>
                    <td className="font-mono text-xs px-5 py-4">O(V + E)</td>
                    <td className="font-mono text-xs px-5 py-4">O(V)</td>
                  </tr>
                  <tr className="border-t-border border-r-border border-b border-b-border border-l-border">
                    <td className="font-semibold px-5 py-4">Dijkstra</td>
                    <td className="px-5 py-4">Priority queue by distance</td>
                    <td className="px-5 py-4">Yes</td>
                    <td className="px-5 py-4">Non-negative weighted paths</td>
                    <td className="font-mono text-xs px-5 py-4">
                      O((V + E) log V)
                    </td>
                    <td className="font-mono text-xs px-5 py-4">O(V + E)</td>
                  </tr>
                  <tr>
                    <td className="font-semibold px-5 py-4">A*</td>
                    <td className="px-5 py-4">
                      Heuristic-guided priority queue
                    </td>
                    <td className="px-5 py-4">Yes</td>
                    <td className="px-5 py-4">Goal-directed pathfinding</td>
                    <td className="font-mono text-xs px-5 py-4">
                      Heuristic-dependent
                    </td>
                    <td className="font-mono text-xs px-5 py-4">O(V)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
