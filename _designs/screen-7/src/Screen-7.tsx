import { useNavigate } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  BarChart3,
  CircleHelp,
  Compass,
  GitBranch,
  Pause,
  Play,
  Rocket,
  RotateCcw,
  SkipBack,
  SkipForward,
} from "lucide-react";

import "./ed6c55f0-5b6c-4493-8e29-8afb25959c9f.css";
import "./Screen-7.screen.css";

export default function Screen7() {
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
              >
                Algorithm Arena
              </a>
              <a
                href="#"
                aria-current="page"
                className="font-medium text-primary text-sm flex relative px-4 items-center h-full after:bg-primary after:absolute after:inset-x-4 after:bottom-0 after:h-0.5"
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
        <main className="flex p-6 flex-col gap-6 min-h-[calc(100vh-4rem)]">
          <div className="flex justify-between items-end">
            <div>
              <div className="font-medium uppercase text-primary text-xs tracking-widest flex mb-2 items-center gap-2">
                <Activity className="size-3.5" />
                Execution replay
              </div>
              <h1 className="font-semibold text-3xl tracking-tight">
                Playback inspector
              </h1>
              <p className="text-muted-foreground text-sm mt-2">
                Trace the algorithm state, one recorded event at a time.
              </p>
            </div>
            <div className="rounded-md bg-card text-muted-foreground text-xs border border-border flex px-3 py-2 items-center gap-2">
              <GitBranch className="text-primary size-4" />
              BFS · Weighted graph off
              <span className="text-border mx-1">|</span>Source A
              <ArrowRight className="size-3" />
              Goal L
            </div>
          </div>
          <div className="grid flex-1 gap-6 grid-cols-[minmax(0,1fr)_20rem] min-h-0">
            <section className="shadow-sm rounded-lg bg-card border border-border flex flex-col min-h-0 overflow-hidden">
              <div className="border-t-border border-r-border border-b border-b-border border-l-border flex px-5 py-4 justify-between items-center">
                <div>
                  <div className="font-semibold text-sm">
                    Live execution canvas
                  </div>
                  <div className="text-muted-foreground text-xs mt-1">
                    Same graph · recorded traversal state
                  </div>
                </div>
                <div className="text-muted-foreground text-xs flex items-center gap-2">
                  <span className="rounded-full bg-primary size-2" />
                  Processing node C
                </div>
              </div>
              <div className="bg-muted/30 relative flex-1 min-h-0 overflow-hidden">
                <div className="opacity-40 bg-[linear-gradient(90deg,var(--color-border)_1px,rgba(0,_0,_0,_0)_1px),linear-gradient(180deg,var(--color-border)_1px,rgba(0,_0,_0,_0)_1px)] bg-size-[32px_32px] absolute inset-0" />
                <svg
                  viewBox="0 0 900 560"
                  aria-label="BFS graph execution visualization"
                  className="relative p-8 size-full"
                >
                  <path
                    d="M120 125 L290 90 L440 170 L610 105 L770 175 M120 125 L180 300 L330 260 L440 170 M180 300 L130 460 L330 455 L510 390 L610 105 M330 260 L510 390 L770 175 M330 455 L690 450 L770 175 M510 390 L610 105"
                    fill="none"
                    stroke="var(--color-border)"
                    strokeWidth="3"
                  />
                  <path
                    d="M330 260 L510 390"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="7"
                    strokeDasharray="10 8"
                  />
                  <path
                    d="M510 390 L610 105"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="3"
                    opacity="0.35"
                  />
                  <circle
                    cx="290"
                    cy="90"
                    r="38"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="2"
                    strokeDasharray="4 7"
                    opacity="0.8"
                  />
                  <circle
                    cx="610"
                    cy="105"
                    r="38"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="2"
                    strokeDasharray="4 7"
                    opacity="0.8"
                  />
                  <circle
                    cx="690"
                    cy="450"
                    r="38"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="2"
                    strokeDasharray="4 7"
                    opacity="0.8"
                  />
                  <g>
                    <circle
                      cx="120"
                      cy="125"
                      r="24"
                      fill="var(--color-primary)"
                    />
                    <text
                      x="120"
                      y="131"
                      textAnchor="middle"
                      fill="var(--color-primary-foreground)"
                      fontSize="16"
                      fontWeight="700"
                    >
                      A
                    </text>
                    <text
                      x="120"
                      y="88"
                      textAnchor="middle"
                      fill="var(--color-primary)"
                      fontSize="11"
                      fontWeight="700"
                    >
                      START
                    </text>
                  </g>
                  <g>
                    <circle
                      cx="290"
                      cy="90"
                      r="22"
                      fill="var(--color-card)"
                      stroke="var(--color-primary)"
                      strokeWidth="4"
                    />
                    <text
                      x="290"
                      y="96"
                      textAnchor="middle"
                      fill="var(--color-foreground)"
                      fontSize="16"
                      fontWeight="700"
                    >
                      B
                    </text>
                  </g>
                  <g>
                    <circle
                      cx="330"
                      cy="260"
                      r="29"
                      fill="var(--color-primary)"
                      opacity="0.18"
                    />
                    <circle
                      cx="330"
                      cy="260"
                      r="21"
                      fill="var(--color-card)"
                      stroke="var(--color-primary)"
                      strokeWidth="4"
                    />
                    <text
                      x="330"
                      y="266"
                      textAnchor="middle"
                      fill="var(--color-foreground)"
                      fontSize="16"
                      fontWeight="700"
                    >
                      C
                    </text>
                    <text
                      x="330"
                      y="308"
                      textAnchor="middle"
                      fill="var(--color-primary)"
                      fontSize="11"
                      fontWeight="700"
                    >
                      PROCESSING
                    </text>
                  </g>
                  <g>
                    <circle
                      cx="440"
                      cy="170"
                      r="22"
                      fill="var(--color-card)"
                      stroke="var(--color-primary)"
                      strokeWidth="4"
                    />
                    <text
                      x="440"
                      y="176"
                      textAnchor="middle"
                      fill="var(--color-foreground)"
                      fontSize="16"
                      fontWeight="700"
                    >
                      D
                    </text>
                  </g>
                  <g>
                    <circle
                      cx="180"
                      cy="300"
                      r="22"
                      fill="var(--color-card)"
                      stroke="var(--color-primary)"
                      strokeWidth="4"
                    />
                    <text
                      x="180"
                      y="306"
                      textAnchor="middle"
                      fill="var(--color-foreground)"
                      fontSize="16"
                      fontWeight="700"
                    >
                      E
                    </text>
                  </g>
                  <g>
                    <circle
                      cx="510"
                      cy="390"
                      r="22"
                      fill="var(--color-card)"
                      stroke="var(--color-primary)"
                      strokeWidth="4"
                    />
                    <text
                      x="510"
                      y="396"
                      textAnchor="middle"
                      fill="var(--color-foreground)"
                      fontSize="16"
                      fontWeight="700"
                    >
                      F
                    </text>
                  </g>
                  <g>
                    <circle
                      cx="130"
                      cy="460"
                      r="21"
                      fill="var(--color-muted)"
                      stroke="var(--color-border)"
                      strokeWidth="3"
                    />
                    <text
                      x="130"
                      y="466"
                      textAnchor="middle"
                      fill="var(--color-muted-foreground)"
                      fontSize="16"
                      fontWeight="700"
                    >
                      G
                    </text>
                  </g>
                  <g>
                    <circle
                      cx="610"
                      cy="105"
                      r="22"
                      fill="var(--color-card)"
                      stroke="var(--color-primary)"
                      strokeWidth="4"
                    />
                    <text
                      x="610"
                      y="111"
                      textAnchor="middle"
                      fill="var(--color-foreground)"
                      fontSize="16"
                      fontWeight="700"
                    >
                      H
                    </text>
                  </g>
                  <g>
                    <circle
                      cx="330"
                      cy="455"
                      r="21"
                      fill="var(--color-muted)"
                      stroke="var(--color-border)"
                      strokeWidth="3"
                    />
                    <text
                      x="330"
                      y="461"
                      textAnchor="middle"
                      fill="var(--color-muted-foreground)"
                      fontSize="16"
                      fontWeight="700"
                    >
                      I
                    </text>
                  </g>
                  <g>
                    <circle
                      cx="770"
                      cy="175"
                      r="21"
                      fill="var(--color-muted)"
                      stroke="var(--color-border)"
                      strokeWidth="3"
                    />
                    <text
                      x="770"
                      y="181"
                      textAnchor="middle"
                      fill="var(--color-muted-foreground)"
                      fontSize="16"
                      fontWeight="700"
                    >
                      J
                    </text>
                  </g>
                  <g>
                    <circle
                      cx="690"
                      cy="450"
                      r="24"
                      fill="var(--color-card)"
                      stroke="var(--color-primary)"
                      strokeWidth="4"
                    />
                    <text
                      x="690"
                      y="456"
                      textAnchor="middle"
                      fill="var(--color-foreground)"
                      fontSize="16"
                      fontWeight="700"
                    >
                      L
                    </text>
                    <text
                      x="690"
                      y="493"
                      textAnchor="middle"
                      fill="var(--color-primary)"
                      fontSize="11"
                      fontWeight="700"
                    >
                      GOAL
                    </text>
                  </g>
                  <g transform="translate(304 218)">
                    <rect
                      x="0"
                      y="0"
                      width="34"
                      height="24"
                      rx="6"
                      fill="var(--color-foreground)"
                    />
                    <circle
                      cx="8"
                      cy="27"
                      r="5"
                      fill="var(--color-foreground)"
                    />
                    <circle
                      cx="27"
                      cy="27"
                      r="5"
                      fill="var(--color-foreground)"
                    />
                    <rect
                      x="12"
                      y="-10"
                      width="10"
                      height="11"
                      rx="4"
                      fill="var(--color-primary)"
                    />
                    <circle
                      cx="17"
                      cy="-13"
                      r="3"
                      fill="var(--color-primary)"
                    />
                  </g>
                  <g transform="translate(397 318)">
                    <rect
                      width="124"
                      height="30"
                      rx="6"
                      fill="var(--color-popover)"
                      stroke="var(--color-primary)"
                    />
                    <text
                      x="62"
                      y="20"
                      textAnchor="middle"
                      fill="var(--color-popover-foreground)"
                      fontSize="12"
                      fontWeight="600"
                    >
                      examining C → F
                    </text>
                  </g>
                </svg>
                <div className="shadow-sm rounded-md bg-card/90 text-xs border border-border flex absolute bottom-5 left-5 px-4 py-3 flex-wrap items-center gap-4">
                  <span className="font-medium text-foreground">
                    State legend
                  </span>
                  <span className="text-muted-foreground flex items-center gap-2">
                    <i className="rounded-full bg-muted border border-border size-2.5" />
                    Unvisited
                  </span>
                  <span className="text-muted-foreground flex items-center gap-2">
                    <i className="rounded-full bg-card border-2 border-primary size-2.5" />
                    Discovered
                  </span>
                  <span className="text-muted-foreground flex items-center gap-2">
                    <i className="rounded-full bg-card border border-dashed border-primary size-2.5" />
                    Frontier
                  </span>
                  <span className="text-muted-foreground flex items-center gap-2">
                    <i className="ring-2 ring-primary rounded-full bg-primary/30 size-2.5" />
                    Processing
                  </span>
                  <span className="text-muted-foreground flex items-center gap-2">
                    <i className="bg-primary w-4 h-0.5" />
                    Final path
                  </span>
                </div>
              </div>
              <div className="bg-card border-x-border border-t border-t-border border-b-border px-5 py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-sm">Step/ 24</div>
                    <div className="text-muted-foreground text-xs mt-1">
                      Exploring neighbors of node C.
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      aria-label="Previous step"
                      className="rounded-md text-muted-foreground border border-border flex justify-center items-center size-9"
                    >
                      <SkipBack className="size-4" />
                    </button>
                    <button type="button" aria-label="Play or pause">
                      <Pause className="hidden size-4" />
                      <Play className="size-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next step"
                      className="rounded-md text-muted-foreground border border-border flex justify-center items-center size-9"
                    >
                      <SkipForward className="size-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="Restart playback"
                      className="rounded-md text-muted-foreground border border-border flex ml-2 justify-center items-center size-9"
                    >
                      <RotateCcw className="size-4" />
                    </button>
                  </div>
                </div>
                <div className="flex mt-4 items-center gap-4">
                  <input
                    aria-label="Execution timeline"
                    type="range"
                    min="0"
                    max="24"
                    defaultValue={8}
                    className="accent-primary flex-1 h-1"
                  />
                  <div className="rounded-md border border-border flex p-1 items-center gap-1">
                    <button type="button">0.5x</button>
                    <button type="button">1x</button>
                    <button type="button">2x</button>
                  </div>
                </div>
              </div>
            </section>
            <aside className="flex flex-col gap-4">
              <section className="shadow-sm rounded-lg bg-card border border-border p-5">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-sm">
                    Data structure inspector
                  </h2>
                  <span className="font-mono rounded-xs bg-primary/10 text-primary text-xs px-2 py-1">
                    QUEUE
                  </span>
                </div>
                <div className="flex mt-5 items-center gap-3">
                  <div className="font-semibold rounded-md bg-primary text-primary-foreground text-sm flex justify-center items-center size-10">
                    C
                  </div>
                  <div>
                    <div className="font-medium text-primary text-xs">
                      Current
                    </div>
                    <div className="text-muted-foreground text-xs">
                      being processed
                    </div>
                  </div>
                </div>
                <div className="border-x-border border-t border-t-border border-b-border mt-4 pt-4">
                  <div className="font-medium text-muted-foreground text-xs mb-2">
                    Pending
                  </div>
                  <div className="flex gap-2">
                    <span className="font-mono rounded-md bg-muted text-sm border border-border px-3 py-2">
                      D
                    </span>
                    <span className="font-mono rounded-md bg-muted text-sm border border-border px-3 py-2">
                      E
                    </span>
                    <span className="font-mono rounded-md bg-muted text-sm border border-border px-3 py-2">
                      F
                    </span>
                    <span className="font-mono rounded-md bg-muted text-sm border border-border px-3 py-2">
                      H
                    </span>
                  </div>
                </div>
              </section>
              <section className="shadow-sm rounded-lg bg-card border border-border p-5">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-sm">Pseudocode</h2>
                  <span className="text-muted-foreground text-xs">BFS</span>
                </div>
                <div className="font-mono text-xs mt-4">
                  <div className="rounded-xs text-muted-foreground flex mb-1 px-2 py-1 gap-3">
                    <span className="text-right w-4">1</span>
                    <span>queue ← [source]</span>
                  </div>
                  <div className="rounded-xs text-muted-foreground flex mb-1 px-2 py-1 gap-3">
                    <span className="text-right w-4">2</span>
                    <span>mark source discovered</span>
                  </div>
                  <div className="rounded-xs text-muted-foreground flex mb-1 px-2 py-1 gap-3">
                    <span className="text-right w-4">3</span>
                    <span>while queue not empty:</span>
                  </div>
                  <div className="rounded-xs bg-primary/10 text-primary flex mb-1 px-2 py-1 gap-3">
                    <span className="text-right w-4">4</span>
                    <span>for each neighbor of current</span>
                  </div>
                  <div className="rounded-xs text-muted-foreground flex mb-1 px-2 py-1 gap-3">
                    <span className="text-right w-4">5</span>
                    <span>if neighbor undiscovered:</span>
                  </div>
                  <div className="rounded-xs text-muted-foreground flex mb-1 px-2 py-1 gap-3">
                    <span className="text-right w-4">6</span>
                    <span>mark neighbor discovered</span>
                  </div>
                  <div className="rounded-xs text-muted-foreground flex mb-1 px-2 py-1 gap-3">
                    <span className="text-right w-4">7</span>
                    <span>enqueue neighbor</span>
                  </div>
                  <div className="rounded-xs text-muted-foreground flex px-2 py-1 gap-3">
                    <span className="text-right w-4">8</span>
                    <span>return reconstructed path</span>
                  </div>
                </div>
              </section>
              <section className="shadow-sm rounded-lg bg-card border border-border p-5">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-sm">
                    Complexity inspector
                  </h2>
                  <BarChart3 className="text-muted-foreground size-4" />
                </div>
                <div className="grid mt-4 gap-3 grid-cols-2">
                  <div className="rounded-md bg-muted p-3">
                    <div className="text-muted-foreground text-xs">Time</div>
                    <div className="font-mono font-semibold text-primary text-lg mt-1">
                      O(V + E)
                    </div>
                  </div>
                  <div className="rounded-md bg-muted p-3">
                    <div className="text-muted-foreground text-xs">Space</div>
                    <div className="font-mono font-semibold text-lg mt-1">
                      O(V)
                    </div>
                  </div>
                </div>
                <div className="text-xs grid mt-4 gap-y-3 grid-cols-2">
                  <div className="text-muted-foreground">
                    V vertices
                    <span className="font-mono text-foreground">12</span>
                  </div>
                  <div className="text-muted-foreground">
                    E edges<span className="font-mono text-foreground">16</span>
                  </div>
                  <div className="text-muted-foreground">
                    Visited<span className="font-mono text-foreground">6</span>
                  </div>
                  <div className="text-muted-foreground">
                    Edges examined
                    <span className="font-mono text-foreground">8</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-xs leading-5 border-x-border border-t border-t-border border-b-border mt-4 pt-4">
                  Each vertex is processed once; each adjacency-list edge is
                  examined at most a constant number of times.
                </p>
              </section>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
