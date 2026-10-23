import { useNavigate } from "react-router-dom";
import {
  Activity,
  Compass,
  ListChecks,
  MousePointer2,
  Play,
  SplitSquareHorizontal,
} from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-1 mx-auto px-6 py-10 max-w-7xl w-full">
        {/* Hero Section */}
        <section className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="max-w-xl">
            <p className="font-semibold text-primary text-xs tracking-[0.2em] mb-4">
              PATHFINDER / GRAPH ALGORITHM LAB
            </p>
            <h1 className="font-semibold text-foreground text-4xl sm:text-5xl leading-tight tracking-tight max-w-lg">
              Every algorithm has a path.
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-7 mt-5 max-w-md">
              Build graphs. Explore algorithms. Watch the logic unfold in
              real-time.
            </p>
            <div className="flex flex-wrap mt-8 items-center gap-3">
              <Button
                size="lg"
                className="gap-2 font-semibold shadow-xs active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-primary"
                onClick={() => navigate("/studio")}
              >
                <Play className="size-4" />
                Launch Graph Studio
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 font-semibold shadow-xs active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-primary"
                onClick={() => navigate("/arena")}
              >
                <Compass className="size-4" />
                Algorithm Arena
              </Button>
            </div>
            <p className="text-muted-foreground text-xs mt-5">
              No account required · Pure client-side visual execution
            </p>
          </div>

          {/* Graph Visual Showcase */}
          <div className="shadow-sm rounded-lg bg-card border border-border relative overflow-hidden">
            <div className="bg-muted border-b border-border flex px-5 py-3 justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-primary size-2 animate-pulse" />
                <span className="font-semibold text-card-foreground text-xs tracking-wide">
                  SHORTEST PATH / PREVIEW
                </span>
              </div>
              <span className="font-mono text-muted-foreground text-xs">
                11 NODES · 14 EDGES
              </span>
            </div>
            <div className="bg-background relative p-5 h-100">
              <svg
                viewBox="0 0 760 390"
                role="img"
                aria-label="Graph visualization preview"
                className="size-full"
              >
                {/* Default Edges */}
                <g fill="none" stroke="var(--color-border)" strokeWidth="2">
                  <path d="M80 90 L190 55 L315 105 L430 60 L575 100 L690 55" />
                  <path d="M80 90 L145 205 L260 185 L315 105" />
                  <path d="M145 205 L190 315 L345 300 L430 225 L575 250 L690 315" />
                  <path d="M260 185 L430 225" />
                  <path d="M430 60 L430 225" />
                  <path d="M575 100 L575 250" />
                  <path d="M345 300 L575 250" />
                </g>
                {/* Alternative Route */}
                <g
                  fill="none"
                  stroke="var(--color-chart-2)"
                  strokeDasharray="8 7"
                  strokeWidth="4"
                  opacity="0.85"
                >
                  <path d="M80 90 L145 205 L260 185 L430 225 L575 250 L690 315" />
                </g>
                {/* Shortest Path Route */}
                <g
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeLinecap="round"
                  strokeWidth="5"
                >
                  <path d="M80 90 L190 55 L315 105 L430 60 L575 100 L690 55" />
                </g>
                {/* Nodes */}
                <g
                  fill="var(--color-card)"
                  stroke="var(--color-border)"
                  strokeWidth="2.5"
                >
                  <circle
                    cx="80"
                    cy="90"
                    r="18"
                    fill="var(--color-primary)"
                    stroke="var(--color-primary)"
                  />
                  <circle cx="190" cy="55" r="15" />
                  <circle cx="315" cy="105" r="15" />
                  <circle cx="430" cy="60" r="15" />
                  <circle cx="575" cy="100" r="15" />
                  <circle
                    cx="690"
                    cy="55"
                    r="18"
                    fill="var(--color-chart-3)"
                    stroke="var(--color-chart-3)"
                  />
                  <circle cx="145" cy="205" r="15" />
                  <circle cx="260" cy="185" r="15" />
                  <circle cx="430" cy="225" r="15" />
                  <circle cx="190" cy="315" r="15" />
                  <circle cx="575" cy="250" r="15" />
                  <circle cx="345" cy="300" r="15" />
                  <circle cx="690" cy="315" r="15" />
                </g>
                {/* Node Labels */}
                <g
                  fill="var(--color-foreground)"
                  fontFamily="var(--font-mono)"
                  fontSize="12"
                  fontWeight="600"
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  <text x="80" y="90" fill="var(--color-primary-foreground)">
                    A
                  </text>
                  <text x="190" y="55">
                    B
                  </text>
                  <text x="315" y="105">
                    C
                  </text>
                  <text x="430" y="60">
                    D
                  </text>
                  <text x="575" y="100">
                    E
                  </text>
                  <text x="690" y="55" fill="var(--color-card)">
                    F
                  </text>
                  <text x="145" y="205">
                    G
                  </text>
                  <text x="260" y="185">
                    H
                  </text>
                  <text x="430" y="225">
                    I
                  </text>
                  <text x="190" y="315">
                    J
                  </text>
                  <text x="345" y="300">
                    K
                  </text>
                  <text x="575" y="250">
                    L
                  </text>
                  <text x="690" y="315">
                    M
                  </text>
                </g>
                {/* START / GOAL Badges */}
                <g
                  fill="var(--color-primary)"
                  fontFamily="var(--font-mono)"
                  fontSize="11"
                  fontWeight="700"
                >
                  <text x="62" y="58">
                    START
                  </text>
                </g>
                <g
                  fill="var(--color-chart-3)"
                  fontFamily="var(--font-mono)"
                  fontSize="11"
                  fontWeight="700"
                >
                  <text x="666" y="28">
                    GOAL
                  </text>
                </g>
              </svg>
              {/* Legend */}
              <div className="shadow-xs bg-card/95 text-xs border border-border flex absolute bottom-4 left-5 px-3 py-2 items-center gap-4 rounded-md">
                <span className="text-card-foreground flex items-center gap-2">
                  <span className="bg-primary w-5 h-0.5 rounded-full" />
                  Shortest path
                </span>
                <span className="text-muted-foreground flex items-center gap-2">
                  <span className="bg-chart-2 w-5 h-0.5 rounded-full" />
                  Alternative route
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Row */}
        <section
          aria-label="Capabilities"
          className="bg-card border border-border rounded-lg grid mt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x"
        >
          <div className="flex px-6 py-5 items-center gap-3">
            <MousePointer2 className="text-primary size-5 shrink-0" />
            <span className="font-medium text-sm">
              Interactive graph editing
            </span>
          </div>
          <div className="flex px-6 py-5 items-center gap-3">
            <Activity className="text-primary size-5 shrink-0" />
            <span className="font-medium text-sm">Real-time traversal</span>
          </div>
          <div className="flex px-6 py-5 items-center gap-3">
            <SplitSquareHorizontal className="text-primary size-5 shrink-0" />
            <span className="font-medium text-sm">
              Side-by-side comparison
            </span>
          </div>
          <div className="flex px-6 py-5 items-center gap-3">
            <ListChecks className="text-primary size-5 shrink-0" />
            <span className="font-medium text-sm">Step-by-step playback</span>
          </div>
        </section>

        {/* Workflow Steps */}
        <section className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <p className="font-semibold text-primary text-xs tracking-[0.18em]">
                THE WORKFLOW
              </p>
              <h2 className="font-semibold text-2xl tracking-tight mt-1">
                From graph to insight
              </h2>
            </div>
            <span className="text-muted-foreground text-sm">
              A clearer way to understand how algorithms explore graphs.
            </span>
          </div>
          <div className="grid mt-6 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-card border border-border rounded-lg flex p-5 items-center gap-4">
              <div className="font-semibold rounded-md bg-primary text-primary-foreground text-sm flex justify-center items-center shrink-0 size-9 font-mono">
                01
              </div>
              <div>
                <h3 className="font-semibold text-sm">Build</h3>
                <p className="text-muted-foreground text-xs mt-1">
                  Shape nodes, weights, and directed routes on an infinite canvas.
                </p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg flex p-5 items-center gap-4">
              <div className="font-semibold rounded-md bg-primary text-primary-foreground text-sm flex justify-center items-center shrink-0 size-9 font-mono">
                02
              </div>
              <div>
                <h3 className="font-semibold text-sm">Run</h3>
                <p className="text-muted-foreground text-xs mt-1">
                  Watch BFS, DFS, Dijkstra, or A* step through frontier and visited sets.
                </p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg flex p-5 items-center gap-4">
              <div className="font-semibold rounded-md bg-primary text-primary-foreground text-sm flex justify-center items-center shrink-0 size-9 font-mono">
                03
              </div>
              <div>
                <h3 className="font-semibold text-sm">Understand</h3>
                <p className="text-muted-foreground text-xs mt-1">
                  Compare metrics, operations, and cost paths side-by-side.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Landing;
