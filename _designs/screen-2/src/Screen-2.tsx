import { useNavigate } from "react-router-dom";
import {
  Activity,
  CircleHelp,
  Compass,
  ListChecks,
  MousePointer2,
  Play,
  Rocket,
  SplitSquareHorizontal,
} from "lucide-react";

import "./ed6c55f0-5b6c-4493-8e29-8afb25959c9f.css";
import "./Screen-2.screen.css";

export default function Screen2() {
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
                className="font-medium transition-colors text-muted-foreground text-sm flex px-4 items-center h-full hover:text-foreground"
                onClick={() => navigate("/screen-3")}
              >
                Graph Studio
              </a>
              <a
                href="#"
                className="font-medium transition-colors text-muted-foreground text-sm flex px-4 items-center h-full hover:text-foreground"
                onClick={() => navigate("/screen-5")}
              >
                Algorithm Arena
              </a>
              <a
                href="#"
                className="font-medium transition-colors text-muted-foreground text-sm flex px-4 items-center h-full hover:text-foreground"
                onClick={() => navigate("/screen-8")}
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
              <div
                aria-label="System status: operational"
                className="text-muted-foreground text-xs flex items-center gap-2"
              >
                <span
                  aria-hidden="true"
                  className="rounded-full bg-primary size-2"
                />
                <span>Operational</span>
              </div>
              <button
                type="button"
                aria-label="Help"
                className="transition-colors rounded-md text-muted-foreground flex justify-center items-center size-9 hover:bg-accent hover:text-foreground"
              >
                <CircleHelp aria-hidden="true" className="size-4" />
              </button>
              <button
                type="button"
                className="font-semibold transition-colors rounded-md bg-primary text-primary-foreground text-sm flex px-3.5 items-center gap-2 h-9 hover:bg-primary/90"
                onClick={() => navigate("/screen-3")}
              >
                <Rocket aria-hidden="true" className="size-4" />
                <span>Launch Studio</span>
              </button>
            </div>
          </div>
        </header>
        <main className="mx-auto px-8 py-10 max-w-7xl">
          <section className="grid items-center gap-12 grid-cols-[0.8fr_1.2fr]">
            <div className="max-w-xl">
              <p className="font-semibold text-primary text-xs tracking-[0.2em] mb-5">
                PATHFINDER / GRAPH ALGORITHM LAB
              </p>
              <h1 className="font-semibold text-foreground text-5xl leading-tight tracking-tight max-w-lg">
                Every algorithm has a path.
              </h1>
              <p className="text-muted-foreground text-lg leading-7 mt-5 max-w-md">
                Build graphs. Explore algorithms. Watch the logic unfold.
              </p>
              <div className="flex mt-8 items-center gap-3">
                <button
                  type="button"
                  className="font-semibold transition-colors rounded-md bg-primary text-primary-foreground text-sm inline-flex px-5 items-center gap-2 h-11 hover:bg-primary/90"
                  onClick={() => navigate("/screen-3")}
                >
                  <Play className="size-4" />
                  Launch Graph Studio
                </button>
                <button
                  type="button"
                  className="font-semibold transition-colors rounded-md bg-card text-card-foreground text-sm border border-border inline-flex px-5 items-center gap-2 h-11 hover:bg-accent"
                  onClick={() => navigate("/screen-8")}
                >
                  <Compass className="size-4" />
                  Explore Algorithms
                </button>
              </div>
              <p className="text-muted-foreground text-xs mt-5">
                No account required · Runs in your browser
              </p>
            </div>
            <div className="shadow-sm rounded-lg bg-card border border-border relative overflow-hidden">
              <div className="bg-muted border-t-border border-r-border border-b border-b-border border-l-border flex px-5 py-3 justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary size-2" />
                  <span className="font-semibold text-card-foreground text-xs tracking-wide">
                    SHORTEST PATH / LIVE PREVIEW
                  </span>
                </div>
                <span className="font-mono text-muted-foreground text-xs">
                  11 NODES · 14 EDGES
                </span>
              </div>
              <div className="bg-background bg-[linear-gradient(90deg,var(--color-border)_1px,rgba(0,_0,_0,_0)_1px),linear-gradient(180deg,var(--color-border)_1px,rgba(0,_0,_0,_0)_1px)] bg-size-[32px_32px] relative p-5 h-[430px]">
                <svg
                  viewBox="0 0 760 390"
                  role="img"
                  aria-label="Graph with eleven connected nodes and highlighted routes"
                  className="size-full"
                >
                  <g fill="none" stroke="var(--color-border)" strokeWidth="2">
                    <path d="M80 90 L190 55 L315 105 L430 60 L575 100 L690 55" />
                    <path d="M80 90 L145 205 L260 185 L315 105" />
                    <path d="M145 205 L190 315 L345 300 L430 225 L575 250 L690 315" />
                    <path d="M260 185 L430 225" />
                    <path d="M430 60 L430 225" />
                    <path d="M575 100 L575 250" />
                    <path d="M345 300 L575 250" />
                  </g>
                  <g
                    fill="none"
                    stroke="var(--color-chart-2)"
                    strokeDasharray="8 7"
                    strokeWidth="5"
                    opacity="0.9"
                  >
                    <path d="M80 90 L145 205 L260 185 L430 225 L575 250 L690 315" />
                  </g>
                  <g
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeLinecap="round"
                    strokeWidth="6"
                  >
                    <path d="M80 90 L190 55 L315 105 L430 60 L575 100 L690 55" />
                  </g>
                  <g
                    fill="var(--color-card)"
                    stroke="var(--color-border)"
                    strokeWidth="3"
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
                  <g
                    fill="var(--color-foreground)"
                    fontFamily="monospace"
                    fontSize="12"
                    textAnchor="middle"
                  >
                    <text x="80" y="95">
                      A
                    </text>
                    <text x="190" y="60">
                      B
                    </text>
                    <text x="315" y="110">
                      C
                    </text>
                    <text x="430" y="65">
                      D
                    </text>
                    <text x="575" y="105">
                      E
                    </text>
                    <text x="690" y="60">
                      F
                    </text>
                    <text x="145" y="210">
                      G
                    </text>
                    <text x="260" y="190">
                      H
                    </text>
                    <text x="430" y="230">
                      I
                    </text>
                    <text x="190" y="320">
                      J
                    </text>
                    <text x="345" y="305">
                      K
                    </text>
                    <text x="575" y="255">
                      L
                    </text>
                    <text x="690" y="320">
                      M
                    </text>
                  </g>
                  <g
                    fill="var(--color-primary)"
                    fontFamily="sans-serif"
                    fontSize="11"
                    fontWeight="600"
                  >
                    <text x="62" y="58">
                      START
                    </text>
                  </g>
                  <g
                    fill="var(--color-chart-3)"
                    fontFamily="sans-serif"
                    fontSize="11"
                    fontWeight="600"
                  >
                    <text x="666" y="28">
                      GOAL
                    </text>
                  </g>
                  <g transform="translate(420 48)">
                    <circle
                      cx="0"
                      cy="0"
                      r="28"
                      fill="none"
                      stroke="var(--color-primary)"
                      strokeDasharray="4 5"
                      strokeWidth="2"
                      opacity="0.7"
                    />
                    <rect
                      x="-14"
                      y="-10"
                      width="28"
                      height="17"
                      rx="4"
                      fill="var(--color-foreground)"
                      stroke="var(--color-primary)"
                      strokeWidth="2"
                    />
                    <circle
                      cx="-8"
                      cy="11"
                      r="4"
                      fill="var(--color-muted-foreground)"
                    />
                    <circle
                      cx="8"
                      cy="11"
                      r="4"
                      fill="var(--color-muted-foreground)"
                    />
                    <rect
                      x="-5"
                      y="-17"
                      width="10"
                      height="7"
                      rx="2"
                      fill="var(--color-primary)"
                    />
                    <circle cx="0" cy="-20" r="3" fill="var(--color-primary)" />
                  </g>
                </svg>
                <div className="shadow-xs bg-card/90 text-xs border border-border flex absolute bottom-4 left-5 px-3 py-2 items-center gap-4">
                  <span className="text-card-foreground flex items-center gap-2">
                    <span className="bg-primary w-5 h-0.5" />
                    Shortest path
                  </span>
                  <span className="text-muted-foreground flex items-center gap-2">
                    <span className="bg-chart-2 w-5 h-0.5" />
                    Alternative route
                  </span>
                </div>
              </div>
            </div>
          </section>
          <section
            aria-label="Capabilities"
            className="bg-card border-x-border border-y border-y-border grid mt-10 grid-cols-4"
          >
            <div className="border-y-border border-r border-r-border border-l-border flex px-6 py-5 items-center gap-3">
              <MousePointer2 className="text-primary size-5" />
              <span className="font-medium text-sm">
                Interactive graph editing
              </span>
            </div>
            <div className="border-y-border border-r border-r-border border-l-border flex px-6 py-5 items-center gap-3">
              <Activity className="text-primary size-5" />
              <span className="font-medium text-sm">Real-time traversal</span>
            </div>
            <div className="border-y-border border-r border-r-border border-l-border flex px-6 py-5 items-center gap-3">
              <SplitSquareHorizontal className="text-primary size-5" />
              <span className="font-medium text-sm">
                Side-by-side comparison
              </span>
            </div>
            <div className="flex px-6 py-5 items-center gap-3">
              <ListChecks className="text-primary size-5" />
              <span className="font-medium text-sm">Step-by-step playback</span>
            </div>
          </section>
          <section className="border-x-border border-t border-t-border border-b-border mt-10 pt-7">
            <div className="flex justify-between items-end">
              <div>
                <p className="font-semibold text-primary text-xs tracking-[0.18em]">
                  THE WORKFLOW
                </p>
                <h2 className="font-semibold text-2xl tracking-tight mt-2">
                  From graph to insight
                </h2>
              </div>
              <span className="text-muted-foreground text-sm">
                A clearer way to learn what algorithms do.
              </span>
            </div>
            <div className="grid mt-6 gap-6 grid-cols-3">
              <div className="bg-card border border-border flex p-4 items-center gap-4">
                <div className="font-semibold rounded-md bg-primary text-primary-foreground text-sm flex justify-center items-center shrink-0 size-9">
                  01
                </div>
                <div>
                  <h3 className="font-semibold">Build</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Shape a graph and define its route.
                  </p>
                </div>
                <div className="bg-muted border border-border grid ml-auto justify-items-center items-center grid-cols-3 size-12">
                  <span className="rounded-full bg-primary size-2" />
                  <span className="rounded-full bg-muted-foreground size-2" />
                  <span className="rounded-full bg-muted-foreground size-2" />
                  <span className="bg-border col-span-3 w-8 h-px" />
                </div>
              </div>
              <div className="bg-card border border-border flex p-4 items-center gap-4">
                <div className="font-semibold rounded-md bg-primary text-primary-foreground text-sm flex justify-center items-center shrink-0 size-9">
                  02
                </div>
                <div>
                  <h3 className="font-semibold">Run</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Watch the rover traverse each step.
                  </p>
                </div>
                <div className="bg-muted border border-border grid ml-auto justify-items-center items-center grid-cols-3 size-12">
                  <span className="rounded-full bg-primary size-2" />
                  <span className="rounded-full bg-primary size-2" />
                  <span className="rounded-full bg-chart-2 size-2" />
                  <span className="bg-primary col-span-3 w-8 h-px" />
                </div>
              </div>
              <div className="bg-card border border-border flex p-4 items-center gap-4">
                <div className="font-semibold rounded-md bg-primary text-primary-foreground text-sm flex justify-center items-center shrink-0 size-9">
                  03
                </div>
                <div>
                  <h3 className="font-semibold">Understand</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Compare behavior and reveal why.
                  </p>
                </div>
                <div className="bg-muted border border-border grid ml-auto justify-items-center items-center grid-cols-3 size-12">
                  <span className="rounded-full bg-chart-3 size-2" />
                  <span className="rounded-full bg-primary size-2" />
                  <span className="rounded-full bg-chart-3 size-2" />
                  <span className="bg-chart-3 col-span-3 w-8 h-px" />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
