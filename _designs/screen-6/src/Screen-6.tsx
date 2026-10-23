import { useNavigate } from "react-router-dom";
import {
  Bot,
  CircleHelp,
  Compass,
  GitBranch,
  Info,
  Play,
  Rocket,
  RotateCcw,
  Route,
  SkipBack,
  SkipForward,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import "./ed6c55f0-5b6c-4493-8e29-8afb25959c9f.css";
import "./Screen-6.screen.css";

export default function Screen6() {
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
        <main className="flex mx-auto px-8 py-7 flex-col gap-6 w-full min-h-[1016px] max-w-[1800px]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="font-semibold text-2xl tracking-tight">
                Algorithm Arena
              </h1>
              <div className="flex items-center gap-2">
                <span className="font-medium rounded-md bg-primary/10 text-primary text-xs px-3 py-1">
                  Same graph
                </span>
                <span className="font-medium rounded-md bg-secondary text-secondary-foreground text-xs px-3 py-1">
                  Source A → Goal L
                </span>
                <span className="font-medium rounded-md bg-muted text-muted-foreground text-xs px-3 py-1">
                  12 nodes
                </span>
              </div>
            </div>
            <div className="text-muted-foreground text-xs flex items-center gap-2">
              <Info className="size-4" />
              Runtime is measured for this run only.
            </div>
          </div>
          <section
            aria-label="Algorithm graph comparison"
            className="grid flex-1 gap-6 grid-cols-2"
          >
            <article className="shadow-sm rounded-lg bg-card border border-primary/40 flex flex-col min-h-0 overflow-hidden">
              <div className="border-t-border border-r-border border-b border-b-border border-l-border flex px-5 py-4 justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="rounded-md bg-primary/10 text-primary flex justify-center items-center size-9">
                    <GitBranch className="size-5" />
                  </span>
                  <div>
                    <h2 className="font-semibold text-lg">BFS</h2>
                    <p className="text-muted-foreground text-sm">
                      Unweighted search
                    </p>
                  </div>
                </div>
                <span className="font-medium rounded-md bg-primary/10 text-primary text-xs px-3 py-1">
                  Complete
                </span>
              </div>
              <div className="bg-muted/30 relative p-5 flex-1 min-h-0">
                <div className="shadow-xs rounded-md bg-card text-muted-foreground text-xs border border-border flex absolute z-10 top-5 left-5 px-3 py-2 items-center gap-2">
                  <span className="rounded-full bg-primary size-2" />
                  Path found
                </div>
                <svg
                  viewBox="0 0 900 500"
                  role="img"
                  aria-label="BFS graph with visited nodes and highlighted path"
                  className="size-full min-h-[390px]"
                >
                  <g
                    stroke="var(--color-border)"
                    strokeWidth="3"
                    opacity="0.75"
                  >
                    <path d="M90 250 L190 120 L330 105 L470 185 L610 115 L790 170" />
                    <path d="M90 250 L220 370 L360 300 L470 185" />
                    <path d="M220 370 L360 430 L520 365 L610 300 L790 350" />
                    <path d="M330 105 L360 300" />
                    <path d="M470 185 L520 365" />
                    <path d="M610 115 L610 300" />
                  </g>
                  <g
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="8"
                    strokeLinecap="round"
                  >
                    <path d="M90 250 L190 120 L470 185 L520 365 L790 350" />
                  </g>
                  <g fill="var(--color-primary)" opacity="0.16">
                    <circle cx="90" cy="250" r="34" />
                    <circle cx="190" cy="120" r="34" />
                    <circle cx="330" cy="105" r="34" />
                    <circle cx="470" cy="185" r="34" />
                    <circle cx="520" cy="365" r="34" />
                    <circle cx="610" cy="300" r="34" />
                  </g>
                  <g
                    stroke="var(--color-primary)"
                    strokeWidth="5"
                    fill="var(--color-card)"
                  >
                    <circle cx="90" cy="250" r="23" />
                    <circle cx="190" cy="120" r="23" />
                    <circle cx="330" cy="105" r="23" />
                    <circle cx="470" cy="185" r="23" />
                    <circle cx="520" cy="365" r="23" />
                    <circle cx="610" cy="300" r="23" />
                  </g>
                  <g
                    stroke="var(--color-border)"
                    strokeWidth="3"
                    fill="var(--color-card)"
                  >
                    <circle cx="220" cy="370" r="23" />
                    <circle cx="360" cy="300" r="23" />
                    <circle cx="360" cy="430" r="23" />
                    <circle cx="610" cy="115" r="23" />
                    <circle cx="790" cy="170" r="23" />
                  </g>
                  <circle
                    cx="790"
                    cy="350"
                    r="29"
                    fill="var(--color-card)"
                    stroke="var(--color-primary)"
                    strokeWidth="6"
                  />
                  <g
                    fill="var(--color-foreground)"
                    fontSize="18"
                    fontWeight="600"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <text x="90" y="250">
                      A
                    </text>
                    <text x="190" y="120">
                      B
                    </text>
                    <text x="330" y="105">
                      C
                    </text>
                    <text x="470" y="185">
                      D
                    </text>
                    <text x="220" y="370">
                      E
                    </text>
                    <text x="520" y="365">
                      F
                    </text>
                    <text x="360" y="300">
                      G
                    </text>
                    <text x="610" y="300">
                      H
                    </text>
                    <text x="360" y="430">
                      I
                    </text>
                    <text x="610" y="115">
                      J
                    </text>
                    <text x="790" y="170">
                      K
                    </text>
                    <text x="790" y="350">
                      L
                    </text>
                  </g>
                  <g fill="var(--color-primary)" fontSize="12" fontWeight="700">
                    <text x="68" y="210">
                      START
                    </text>
                    <text x="770" y="395">
                      GOAL
                    </text>
                  </g>
                </svg>
                <div className="shadow-sm rounded-md bg-card text-primary border border-primary flex absolute top-[58%] left-[68%] justify-center items-center size-10">
                  <Bot className="size-6" />
                </div>
                <div className="rounded-md bg-card text-muted-foreground text-xs border border-border flex absolute bottom-5 left-5 px-3 py-2 items-center gap-4">
                  <span>Visited A, B, C, D, E, F, H</span>
                  <span className="bg-border w-px h-3" />
                  <span className="text-primary">Frontier H</span>
                </div>
              </div>
              <div className="text-xs border-x-border border-t border-t-border border-b-border flex px-5 py-3 justify-between items-center">
                <span className="text-muted-foreground">
                  Complete · path found
                </span>
                <span className="font-mono text-foreground">
                  4.8ms measured
                </span>
              </div>
            </article>
            <article className="shadow-sm rounded-lg bg-card border border-chart-2/50 flex flex-col min-h-0 overflow-hidden">
              <div className="border-t-border border-r-border border-b border-b-border border-l-border flex px-5 py-4 justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="rounded-md bg-chart-2/15 text-chart-2 flex justify-center items-center size-9">
                    <Route className="size-5" />
                  </span>
                  <div>
                    <h2 className="font-semibold text-lg">Dijkstra</h2>
                    <p className="text-muted-foreground text-sm">
                      Weighted shortest path
                    </p>
                  </div>
                </div>
                <span className="font-medium rounded-md bg-chart-2/15 text-chart-2 text-xs px-3 py-1">
                  Complete
                </span>
              </div>
              <div className="bg-muted/30 relative p-5 flex-1 min-h-0">
                <div className="shadow-xs rounded-md bg-card text-muted-foreground text-xs border border-border flex absolute z-10 top-5 left-5 px-3 py-2 items-center gap-2">
                  <span className="rounded-full bg-chart-2 size-2" />
                  Path found
                </div>
                <svg
                  viewBox="0 0 900 500"
                  role="img"
                  aria-label="Dijkstra graph with processed nodes, priorities, and highlighted path"
                  className="size-full min-h-[390px]"
                >
                  <g
                    stroke="var(--color-border)"
                    strokeWidth="3"
                    opacity="0.75"
                  >
                    <path d="M90 250 L190 120 L330 105 L470 185 L610 115 L790 170" />
                    <path d="M90 250 L220 370 L360 300 L470 185" />
                    <path d="M220 370 L360 430 L520 365 L610 300 L790 350" />
                    <path d="M330 105 L360 300" />
                    <path d="M470 185 L520 365" />
                    <path d="M610 115 L610 300" />
                  </g>
                  <g
                    fill="none"
                    stroke="var(--color-chart-2)"
                    strokeWidth="8"
                    strokeLinecap="round"
                  >
                    <path d="M90 250 L190 120 L470 185 L520 365 L790 350" />
                  </g>
                  <g fill="var(--color-chart-2)" opacity="0.16">
                    <circle cx="90" cy="250" r="34" />
                    <circle cx="190" cy="120" r="34" />
                    <circle cx="330" cy="105" r="34" />
                    <circle cx="470" cy="185" r="34" />
                    <circle cx="520" cy="365" r="34" />
                  </g>
                  <g
                    stroke="var(--color-chart-2)"
                    strokeWidth="5"
                    fill="var(--color-card)"
                  >
                    <circle cx="90" cy="250" r="23" />
                    <circle cx="190" cy="120" r="23" />
                    <circle cx="330" cy="105" r="23" />
                    <circle cx="470" cy="185" r="23" />
                    <circle cx="520" cy="365" r="23" />
                  </g>
                  <g
                    stroke="var(--color-border)"
                    strokeWidth="3"
                    fill="var(--color-card)"
                  >
                    <circle cx="220" cy="370" r="23" />
                    <circle cx="360" cy="300" r="23" />
                    <circle cx="360" cy="430" r="23" />
                    <circle cx="610" cy="115" r="23" />
                    <circle cx="610" cy="300" r="23" />
                    <circle cx="790" cy="170" r="23" />
                  </g>
                  <circle
                    cx="790"
                    cy="350"
                    r="29"
                    fill="var(--color-card)"
                    stroke="var(--color-chart-2)"
                    strokeWidth="6"
                  />
                  <g
                    fill="var(--color-foreground)"
                    fontSize="18"
                    fontWeight="600"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <text x="90" y="250">
                      A
                    </text>
                    <text x="190" y="120">
                      B
                    </text>
                    <text x="330" y="105">
                      C
                    </text>
                    <text x="470" y="185">
                      D
                    </text>
                    <text x="220" y="370">
                      E
                    </text>
                    <text x="520" y="365">
                      F
                    </text>
                    <text x="360" y="300">
                      G
                    </text>
                    <text x="610" y="300">
                      H
                    </text>
                    <text x="360" y="430">
                      I
                    </text>
                    <text x="610" y="115">
                      J
                    </text>
                    <text x="790" y="170">
                      K
                    </text>
                    <text x="790" y="350">
                      L
                    </text>
                  </g>
                  <g fill="var(--color-chart-2)" fontSize="13" fontWeight="700">
                    <text x="112" y="235">
                      0
                    </text>
                    <text x="212" y="105">
                      2
                    </text>
                    <text x="352" y="90">
                      4
                    </text>
                    <text x="492" y="170">
                      7
                    </text>
                    <text x="542" y="350">
                      9
                    </text>
                    <text x="632" y="285">
                      11
                    </text>
                  </g>
                  <g fill="var(--color-chart-2)" fontSize="12" fontWeight="700">
                    <text x="68" y="210">
                      START
                    </text>
                    <text x="770" y="395">
                      GOAL
                    </text>
                  </g>
                </svg>
                <div className="shadow-sm rounded-md bg-card text-chart-2 border border-chart-2 flex absolute top-[65%] left-[58%] justify-center items-center size-10">
                  <Bot className="size-6" />
                </div>
                <div className="rounded-md bg-card text-muted-foreground text-xs border border-border flex absolute bottom-5 left-5 px-3 py-2 items-center gap-4">
                  <span>Processed A, B, C, D, F</span>
                  <span className="bg-border w-px h-3" />
                  <span className="text-chart-2">Priority labels active</span>
                </div>
              </div>
              <div className="text-xs border-x-border border-t border-t-border border-b-border flex px-5 py-3 justify-between items-center">
                <span className="text-muted-foreground">
                  Complete · path found
                </span>
                <span className="font-mono text-foreground">
                  6.2ms measured
                </span>
              </div>
            </article>
          </section>
          <section
            aria-label="Synchronized playback controls"
            className="shadow-sm rounded-lg bg-card border border-border flex px-5 py-3 justify-between items-center"
          >
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" aria-label="Restart">
                <RotateCcw className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Step back">
                <SkipBack className="size-4" />
              </Button>
              <Button className="px-6 gap-2 h-10">
                <Play className="size-4" />
                Play both
              </Button>
              <Button variant="ghost" size="icon" aria-label="Step forward">
                <SkipForward className="size-4" />
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground text-sm">
                Shared timeline
              </span>
              <div className="rounded-full bg-muted w-64 h-2 overflow-hidden">
                <div className="rounded-full bg-primary w-3/4 h-full" />
              </div>
              <span className="font-mono text-sm">18/24</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground text-sm">Speed</span>
              <Select defaultValue="1x">
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5x">0.5x</SelectItem>
                  <SelectItem value="1x">1x</SelectItem>
                  <SelectItem value="2x">2x</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </section>
          <section
            aria-label="Comparison metrics"
            className="shadow-sm rounded-lg bg-card border border-border overflow-hidden"
          >
            <div className="border-t-border border-r-border border-b border-b-border border-l-border px-5 py-4">
              <h2 className="font-semibold text-base">Comparison metrics</h2>
            </div>
            <table className="text-sm w-full">
              <thead className="text-left uppercase bg-muted/60 text-muted-foreground text-xs tracking-wide">
                <tr>
                  <th className="font-medium px-5 py-3">Metric</th>
                  <th className="font-medium text-primary px-5 py-3">BFS</th>
                  <th className="font-medium text-chart-2 px-5 py-3">
                    Dijkstra
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t-border border-r-border border-b border-b-border border-l-border">
                  <td className="text-muted-foreground px-5 py-2.5">
                    Path result
                  </td>
                  <td className="font-medium px-5 py-2.5">Path found</td>
                  <td className="font-medium px-5 py-2.5">Path found</td>
                </tr>
                <tr className="border-t-border border-r-border border-b border-b-border border-l-border">
                  <td className="text-muted-foreground px-5 py-2.5">
                    Total path weight
                  </td>
                  <td className="px-5 py-2.5">—</td>
                  <td className="px-5 py-2.5">14 total weight</td>
                </tr>
                <tr className="border-t-border border-r-border border-b border-b-border border-l-border">
                  <td className="text-muted-foreground px-5 py-2.5">
                    Nodes visited
                  </td>
                  <td className="px-5 py-2.5">8 nodes</td>
                  <td className="px-5 py-2.5">7 nodes</td>
                </tr>
                <tr className="border-t-border border-r-border border-b border-b-border border-l-border">
                  <td className="text-muted-foreground px-5 py-2.5">
                    Edges examined
                  </td>
                  <td className="px-5 py-2.5">11 edges</td>
                  <td className="px-5 py-2.5">14 edges</td>
                </tr>
                <tr className="border-t-border border-r-border border-b border-b-border border-l-border">
                  <td className="text-muted-foreground px-5 py-2.5">
                    Measured runtime
                  </td>
                  <td className="font-mono px-5 py-2.5">4.8ms</td>
                  <td className="font-mono px-5 py-2.5">6.2ms</td>
                </tr>
                <tr className="border-t-border border-r-border border-b border-b-border border-l-border">
                  <td className="text-muted-foreground px-5 py-2.5">
                    Theoretical time
                  </td>
                  <td className="font-mono px-5 py-2.5">O(V + E)</td>
                  <td className="font-mono px-5 py-2.5">O((V + E) log V)</td>
                </tr>
                <tr className="border-t-border border-r-border border-b border-b-border border-l-border">
                  <td className="text-muted-foreground px-5 py-2.5">
                    Space complexity
                  </td>
                  <td className="font-mono px-5 py-2.5">O(V)</td>
                  <td className="font-mono px-5 py-2.5">O(V + E)</td>
                </tr>
                <tr>
                  <td className="text-muted-foreground px-5 py-2.5">
                    Traversal steps
                  </td>
                  <td className="px-5 py-2.5">18</td>
                  <td className="px-5 py-2.5">21</td>
                </tr>
              </tbody>
            </table>
          </section>
          <section className="rounded-lg bg-primary/5 border border-primary/30 flex px-5 py-4 items-center gap-4">
            <Sparkles className="text-primary size-5" />
            <p className="text-sm leading-6">
              <span className="font-semibold">
                BFS found the route in fewer traversal steps in this unweighted
                example.
              </span>
              <span className="text-muted-foreground">
                Dijkstra guarantees the minimum-total-weight route.
              </span>
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
