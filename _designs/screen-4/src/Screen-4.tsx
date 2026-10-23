import { useNavigate } from "react-router-dom";
import {
  CircleCheck,
  CircleDot,
  CircleHelp,
  Compass,
  Flag,
  GripVertical,
  Layers3,
  Move,
  Rocket,
  Trash2,
} from "lucide-react";

import "./ed6c55f0-5b6c-4493-8e29-8afb25959c9f.css";
import "./Screen-4.screen.css";

export default function Screen4() {
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
                aria-current="page"
                className="font-medium text-primary text-sm flex relative px-4 items-center h-full after:bg-primary after:absolute after:inset-x-4 after:bottom-0 after:h-0.5"
                onClick={() => navigate("/screen-3")}
              >
                Graph Studio
              </a>
              <a
                href="#"
                className="font-medium text-muted-foreground text-sm flex px-4 items-center h-full"
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
        <main className="flex mx-auto p-8 flex-col gap-6 max-w-7xl">
          <div className="flex justify-between items-end">
            <div>
              <div className="font-medium uppercase text-primary text-xs tracking-[0.18em] flex mb-2 items-center gap-2">
                <Layers3 className="size-4" />
                Graph Studio interaction states
              </div>
              <h1 className="font-semibold text-3xl tracking-tight">
                A graph editor in motion
              </h1>
              <p className="text-muted-foreground text-sm mt-2">
                Realistic editing states for the same weighted graph, source,
                and destination workflow.
              </p>
            </div>
            <div className="rounded-md bg-card text-muted-foreground text-xs border border-border flex px-3 py-2 items-center gap-2">
              <CircleCheck className="text-primary size-4" />
              Prototype state board
            </div>
          </div>
          <section className="grid gap-6 grid-cols-2">
            <article className="shadow-sm rounded-lg bg-card border border-border overflow-hidden">
              <div className="border-t-border border-r-border border-b border-b-border border-l-border flex px-5 py-4 justify-between items-start">
                <div>
                  <div className="font-medium uppercase text-primary text-xs tracking-[0.16em] mb-1">
                    State 01
                  </div>
                  <h2 className="font-semibold text-lg">Node selected</h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Inspect a node and choose its role in the graph.
                  </p>
                </div>
                <span className="font-medium rounded-md bg-primary/10 text-primary text-xs px-2 py-1">
                  Selection
                </span>
              </div>
              <div className="rounded-md bg-muted/50 border border-border relative m-5 h-56 overflow-hidden">
                <div
                  style={{
                    backgroundImage:
                      "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                  className="opacity-60 absolute inset-0"
                />
                <svg
                  viewBox="0 0 400 220"
                  aria-label="Ten node graph with node C selected"
                  className="absolute inset-0 size-full"
                >
                  <line
                    x1="45"
                    y1="48"
                    x2="120"
                    y2="90"
                    stroke="var(--color-border)"
                    strokeWidth="2"
                  />
                  <line
                    x1="120"
                    y1="90"
                    x2="190"
                    y2="45"
                    stroke="var(--color-border)"
                    strokeWidth="2"
                  />
                  <line
                    x1="120"
                    y1="90"
                    x2="170"
                    y2="165"
                    stroke="var(--color-border)"
                    strokeWidth="2"
                  />
                  <line
                    x1="190"
                    y1="45"
                    x2="275"
                    y2="80"
                    stroke="var(--color-border)"
                    strokeWidth="2"
                  />
                  <line
                    x1="170"
                    y1="165"
                    x2="260"
                    y2="155"
                    stroke="var(--color-border)"
                    strokeWidth="2"
                  />
                  <line
                    x1="275"
                    y1="80"
                    x2="350"
                    y2="45"
                    stroke="var(--color-border)"
                    strokeWidth="2"
                  />
                  <line
                    x1="275"
                    y1="80"
                    x2="330"
                    y2="145"
                    stroke="var(--color-border)"
                    strokeWidth="2"
                  />
                  <line
                    x1="260"
                    y1="155"
                    x2="330"
                    y2="145"
                    stroke="var(--color-border)"
                    strokeWidth="2"
                  />
                  <line
                    x1="45"
                    y1="48"
                    x2="170"
                    y2="165"
                    stroke="var(--color-border)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="45"
                    cy="48"
                    r="14"
                    fill="var(--color-card)"
                    stroke="var(--color-muted-foreground)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="120"
                    cy="90"
                    r="14"
                    fill="var(--color-card)"
                    stroke="var(--color-muted-foreground)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="190"
                    cy="45"
                    r="18"
                    fill="var(--color-primary)"
                    fillOpacity=".15"
                    stroke="var(--color-primary)"
                    strokeWidth="3"
                  />
                  <circle
                    cx="170"
                    cy="165"
                    r="14"
                    fill="var(--color-card)"
                    stroke="var(--color-muted-foreground)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="275"
                    cy="80"
                    r="14"
                    fill="var(--color-card)"
                    stroke="var(--color-muted-foreground)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="260"
                    cy="155"
                    r="14"
                    fill="var(--color-card)"
                    stroke="var(--color-muted-foreground)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="350"
                    cy="45"
                    r="14"
                    fill="var(--color-card)"
                    stroke="var(--color-muted-foreground)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="330"
                    cy="145"
                    r="14"
                    fill="var(--color-card)"
                    stroke="var(--color-muted-foreground)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="65"
                    cy="175"
                    r="14"
                    fill="var(--color-card)"
                    stroke="var(--color-muted-foreground)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="365"
                    cy="185"
                    r="14"
                    fill="var(--color-card)"
                    stroke="var(--color-muted-foreground)"
                    strokeWidth="2"
                  />
                  <g
                    fill="var(--color-foreground)"
                    fontSize="11"
                    textAnchor="middle"
                  >
                    <text x="45" y="52">
                      A
                    </text>
                    <text x="120" y="94">
                      B
                    </text>
                    <text x="190" y="49">
                      C
                    </text>
                    <text x="170" y="169">
                      D
                    </text>
                    <text x="275" y="84">
                      E
                    </text>
                    <text x="260" y="159">
                      F
                    </text>
                    <text x="350" y="49">
                      G
                    </text>
                    <text x="330" y="149">
                      H
                    </text>
                    <text x="65" y="179">
                      J
                    </text>
                    <text x="365" y="189">
                      L
                    </text>
                  </g>
                </svg>
                <div className="shadow-md rounded-md bg-popover border border-border absolute top-6 left-1/2 p-2 w-40">
                  <div className="border-t-border border-r-border border-b border-b-border border-l-border flex mb-1 pb-2 justify-between items-center">
                    <span className="font-mono font-semibold text-xs">
                      NODE C
                    </span>
                    <GripVertical className="text-muted-foreground size-3" />
                  </div>
                  <button
                    type="button"
                    className="text-left rounded-sm text-xs flex px-2 py-1.5 items-center gap-2 w-full hover:bg-accent"
                  >
                    <CircleDot className="text-primary size-3" />
                    Set source
                  </button>
                  <button
                    type="button"
                    className="text-left rounded-sm text-xs flex px-2 py-1.5 items-center gap-2 w-full hover:bg-accent"
                  >
                    <Flag className="text-primary size-3" />
                    Set destination
                  </button>
                  <button
                    type="button"
                    className="text-left rounded-sm text-destructive text-xs flex px-2 py-1.5 items-center gap-2 w-full hover:bg-accent"
                  >
                    <Trash2 className="size-3" />
                    Delete
                  </button>
                  <button
                    type="button"
                    className="text-muted-foreground text-[11px] border-x-border border-t border-t-border border-b-border flex mt-1 pt-2 justify-center items-center gap-2 w-full"
                  >
                    <Move className="size-3" />
                    Drag node
                  </button>
                </div>
              </div>
              <div className="text-muted-foreground text-xs flex px-5 pb-5 justify-between items-center">
                <span>Node C · 2 connected edges</span>
                <span className="font-mono text-primary">selectedAction:</span>
              </div>
            </article>
            <article className="shadow-sm rounded-lg bg-card border border-border overflow-hidden">
              <div className="border-t-border border-r-border border-b border-b-border border-l-border flex px-5 py-4 justify-between items-start">
                <div>
                  <div className="font-medium uppercase text-primary text-xs tracking-[0.16em] mb-1">
                    State 02
                  </div>
                  <h2 className="font-semibold text-lg">Edge weight editing</h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Edit a weighted connection without leaving the canvas.
                  </p>
                </div>
                <span className="font-medium rounded-md bg-secondary text-secondary-foreground text-xs px-2 py-1">
                  Inline edit
                </span>
              </div>
              <div className="rounded-md bg-muted/50 border border-border relative m-5 h-56 overflow-hidden">
                <svg
                  viewBox="0 0 400 220"
                  className="absolute inset-0 size-full"
                >
                  <line
                    x1="45"
                    y1="48"
                    x2="120"
                    y2="90"
                    stroke="var(--color-border)"
                    strokeWidth="2"
                  />
                  <line
                    x1="120"
                    y1="90"
                    x2="190"
                    y2="45"
                    stroke="var(--color-border)"
                    strokeWidth="2"
                  />
                  <line
                    x1="120"
                    y1="90"
                    x2="170"
                    y2="165"
                    stroke="var(--color-border)"
                    strokeWidth="2"
                  />
                  <line
                    x1="190"
                    y1="45"
                    x2="275"
                    y2="80"
                    stroke="var(--color-border)"
                    strokeWidth="2"
                  />
                  <line
                    x1="170"
                    y1="165"
                    x2="260"
                    y2="155"
                    stroke="var(--color-foreground)"
                    strokeWidth="5"
                  />
                  <line
                    x1="275"
                    y1="80"
                    x2="350"
                    y2="45"
                    stroke="var(--color-border)"
                    strokeWidth="2"
                  />
                  <line
                    x1="275"
                    y1="80"
                    x2="330"
                    y2="145"
                    stroke="var(--color-border)"
                    strokeWidth="2"
                  />
                  <line
                    x1="260"
                    y1="155"
                    x2="330"
                    y2="145"
                    stroke="var(--color-border)"
                    strokeWidth="2"
                  />
                  <line
                    x1="45"
                    y1="48"
                    x2="170"
                    y2="165"
                    stroke="var(--color-border)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="45"
                    cy="48"
                    r="14"
                    fill="var(--color-card)"
                    stroke="var(--color-muted-foreground)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="120"
                    cy="90"
                    r="14"
                    fill="var(--color-card)"
                    stroke="var(--color-muted-foreground)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="190"
                    cy="45"
                    r="14"
                    fill="var(--color-card)"
                    stroke="var(--color-muted-foreground)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="170"
                    cy="165"
                    r="14"
                    fill="var(--color-card)"
                    stroke="var(--color-muted-foreground)"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
}
