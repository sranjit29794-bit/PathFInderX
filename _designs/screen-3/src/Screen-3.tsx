import { useNavigate } from "react-router-dom";
import {
  Check,
  ChevronRight,
  CircleDot,
  CircleHelp,
  Compass,
  Download,
  Flag,
  Hand,
  Link2,
  Map,
  MoreHorizontal,
  MousePointer2,
  Move,
  Pause,
  Pencil,
  Play,
  Plus,
  Redo2,
  Rocket,
  RotateCcw,
  ScanLine,
  SkipBack,
  SkipForward,
  Trash2,
  Undo2,
  ZoomIn,
  ZoomOut,
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
import "./Screen-3.screen.css";

export default function Screen3() {
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
                className="font-medium transition-colors text-muted-foreground text-sm flex px-4 items-center h-full hover:text-foreground"
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
              >
                <Rocket aria-hidden="true" className="size-4" />
                <span>Launch Studio</span>
              </button>
            </div>
          </div>
        </header>
        <main className="bg-background flex flex-col h-[1016px]">
          <div className="bg-card border-t-border border-r-border border-b border-b-border border-l-border flex px-5 items-center shrink-0 gap-4 h-13">
            <div className="flex items-center gap-2 min-w-48">
              <Map className="text-primary size-4" />
              <span className="font-semibold text-sm">Untitled expedition</span>
            </div>
            <div className="bg-border w-px h-5" />
            <Select defaultValue="weighted">
              <SelectTrigger className="bg-background text-xs border-input w-56 h-8">
                <SelectValue placeholder="Choose preset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="random">Random graph</SelectItem>
                <SelectItem value="small">Small example graph</SelectItem>
                <SelectItem value="weighted">
                  Weighted route / 12 nodes
                </SelectItem>
                <SelectItem value="maze">Maze-like graph</SelectItem>
                <SelectItem value="dense">Dense graph</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex ml-2 items-center gap-1">
              <Button variant="ghost" size="icon" aria-label="Undo">
                <Undo2 className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Redo">
                <Redo2 className="size-4" />
              </Button>
            </div>
            <Button variant="ghost" className="text-xs gap-2">
              <RotateCcw className="size-4" />
              Reset graph
            </Button>
            <Button variant="ghost" className="text-xs gap-2">
              <Download className="size-4" />
              Export
            </Button>
            <Button
              className="font-semibold bg-primary text-primary-foreground text-xs ml-auto px-4 gap-2 hover:bg-primary/90"
              onClick={() => navigate("/screen-7")}
            >
              <Play className="fill-primary-foreground size-4" />
              Run algorithm
            </Button>
          </div>
          <div className="flex flex-1 min-h-0">
            <aside className="bg-sidebar border-y-border border-r border-r-border border-l-border flex py-3 flex-col items-center shrink-0 gap-2 w-14">
              <Button variant="ghost" size="icon" aria-label="Select tool">
                <MousePointer2 className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Add node">
                <Plus className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Connect nodes">
                <Link2 className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Delete node or edge"
              >
                <Trash2 className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Move graph elements"
              >
                <Move className="size-4" />
              </Button>
              <div className="bg-border my-1 w-7 h-px" />
              <Button variant="ghost" size="icon" aria-label="Pan and zoom">
                <Hand className="size-4" />
              </Button>
              <div className="text-muted-foreground flex mt-auto flex-col items-center gap-2">
                <Button variant="ghost" size="icon" aria-label="Zoom in">
                  <ZoomIn className="size-4" />
                </Button>
                <span className="font-mono text-[10px]">100%</span>
                <Button variant="ghost" size="icon" aria-label="Zoom out">
                  <ZoomOut className="size-4" />
                </Button>
              </div>
            </aside>
            <section
              aria-label="Graph canvas"
              className="bg-muted/20 relative flex-1 min-w-0 overflow-hidden"
            >
              <div className="opacity-60 bg-[linear-gradient(90deg,var(--color-border)_1px,rgba(0,_0,_0,_0)_1px),linear-gradient(180deg,var(--color-border)_1px,rgba(0,_0,_0,_0)_1px)] bg-size-[32px_32px] absolute inset-0" />
              <div className="shadow-xs rounded-md bg-card/90 text-xs border border-border flex absolute top-5 left-5 px-3 py-2 items-center gap-2">
                <span className="rounded-full bg-primary size-2" />
                <span className="font-medium">Weighted route</span>
                <span className="text-muted-foreground">
                  · 12 nodes · 16 edges
                </span>
              </div>
              <svg
                viewBox="0 0 1000 720"
                role="img"
                aria-label="Weighted graph from node A to node L"
                className="absolute inset-0 size-full"
              >
                <g
                  stroke="var(--color-muted-foreground)"
                  strokeWidth="2"
                  opacity="0.55"
                  fill="none"
                >
                  <path d="M120 160 L290 115 L470 180 L640 125 L835 185" />
                  <path d="M120 160 L235 330 L390 285 L555 355 L735 290 L835 185" />
                  <path d="M235 330 L205 535 L390 620 L555 515 L735 610 L835 510" />
                  <path d="M390 285 L390 620" />
                  <path d="M555 355 L555 515" />
                  <path d="M735 290 L835 510" />
                  <path d="M640 125 L735 290" />
                  <path d="M470 180 L555 355" />
                  <path d="M835 185 L835 510" />
                </g>
                <g stroke="var(--color-chart-1)" strokeWidth="5" fill="none">
                  <path d="M120 160 L235 330 L390 285 L555 355 L735 290 L835 185" />
                </g>
                <path
                  d="M390 285 L555 515"
                  stroke="var(--color-chart-2)"
                  strokeWidth="4"
                  fill="none"
                />
                <g
                  fontSize="12"
                  fontFamily="ui-monospace, monospace"
                  textAnchor="middle"
                >
                  <g fill="var(--color-muted-foreground)">
                    <text x="205" y="145">
                      4
                    </text>
                    <text x="380" y="135">
                      7
                    </text>
                    <text x="550" y="145">
                      3
                    </text>
                    <text x="735" y="145">
                      8
                    </text>
                    <text x="175" y="255">
                      6
                    </text>
                    <text x="315" y="305">
                      2
                    </text>
                    <text x="470" y="330">
                      5
                    </text>
                    <text x="645" y="310">
                      4
                    </text>
                    <text x="205" y="445">
                      9
                    </text>
                    <text x="295" y="625">
                      3
                    </text>
                    <text x="470" y="575">
                      6
                    </text>
                    <text x="645" y="585">
                      2
                    </text>
                    <text x="390" y="455">
                      8
                    </text>
                    <text x="555" y="445">
                      4
                    </text>
                    <text x="790" y="405">
                      7
                    </text>
                  </g>
                </g>
                <g>
                  <circle
                    cx="120"
                    cy="160"
                    r="26"
                    fill="var(--color-card)"
                    stroke="var(--color-chart-3)"
                    strokeWidth="4"
                  />
                  <text
                    x="120"
                    y="165"
                    textAnchor="middle"
                    fontSize="16"
                    fontWeight="700"
                    fill="var(--color-foreground)"
                  >
                    A
                  </text>
                  <text
                    x="120"
                    y="118"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fill="var(--color-chart-3)"
                  >
                    START
                  </text>
                  <circle
                    cx="835"
                    cy="185"
                    r="26"
                    fill="var(--color-card)"
                    stroke="var(--color-chart-3)"
                    strokeWidth="4"
                  />
                  <text
                    x="835"
                    y="190"
                    textAnchor="middle"
                    fontSize="16"
                    fontWeight="700"
                    fill="var(--color-foreground)"
                  >
                    L
                  </text>
                  <text
                    x="835"
                    y="143"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fill="var(--color-chart-3)"
                  >
                    GOAL
                  </text>
                  <circle
                    cx="290"
                    cy="115"
                    r="22"
                    fill="var(--color-card)"
                    stroke="var(--color-border)"
                    strokeWidth="3"
                  />
                  <text
                    x="290"
                    y="120"
                    textAnchor="middle"
                    fontSize="15"
                    fontWeight="700"
                    fill="var(--color-foreground)"
                  >
                    B
                  </text>
                  <circle
                    cx="470"
                    cy="180"
                    r="22"
                    fill="var(--color-card)"
                    stroke="var(--color-border)"
                    strokeWidth="3"
                  />
                  <text
                    x="470"
                    y="185"
                    textAnchor="middle"
                    fontSize="15"
                    fontWeight="700"
                    fill="var(--color-foreground)"
                  >
                    C
                  </text>
                  <circle
                    cx="235"
                    cy="330"
                    r="22"
                    fill="var(--color-card)"
                    stroke="var(--color-border)"
                    strokeWidth="3"
                  />
                  <text
                    x="235"
                    y="335"
                    textAnchor="middle"
                    fontSize="15"
                    fontWeight="700"
                    fill="var(--color-foreground)"
                  >
                    D
                  </text>
                  <circle
                    cx="640"
                    cy="125"
                    r="22"
                    fill="var(--color-card)"
                    stroke="var(--color-border)"
                    strokeWidth="3"
                  />
                  <text
                    x="640"
                    y="130"
                    textAnchor="middle"
                    fontSize="15"
                    fontWeight="700"
                    fill="var(--color-foreground)"
                  >
                    E
                  </text>
                  <circle
                    cx="390"
                    cy="285"
                    r="30"
                    fill="var(--color-card)"
                    stroke="var(--color-primary)"
                    strokeWidth="5"
                  />
                  <circle
                    cx="390"
                    cy="285"
                    r="37"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="2"
                    strokeDasharray="5 6"
                  />
                  <text
                    x="390"
                    y="290"
                    textAnchor="middle"
                    fontSize="16"
                    fontWeight="700"
                    fill="var(--color-foreground)"
                  >
                    F
                  </text>
                  <circle
                    cx="555"
                    cy="355"
                    r="22"
                    fill="var(--color-card)"
                    stroke="var(--color-border)"
                    strokeWidth="3"
                  />
                  <text
                    x="555"
                    y="360"
                    textAnchor="middle"
                    fontSize="15"
                    fontWeight="700"
                    fill="var(--color-foreground)"
                  >
                    G
                  </text>
                  <circle
                    cx="735"
                    cy="290"
                    r="22"
                    fill="var(--color-card)"
                    stroke="var(--color-border)"
                    strokeWidth="3"
                  />
                  <text
                    x="735"
                    y="295"
                    textAnchor="middle"
                    fontSize="15"
                    fontWeight="700"
                    fill="var(--color-foreground)"
                  >
                    H
                  </text>
                  <circle
                    cx="205"
                    cy="535"
                    r="22"
                    fill="var(--color-card)"
                    stroke="var(--color-border)"
                    strokeWidth="3"
                  />
                  <text
                    x="205"
                    y="540"
                    textAnchor="middle"
                    fontSize="15"
                    fontWeight="700"
                    fill="var(--color-foreground)"
                  >
                    I
                  </text>
                  <circle
                    cx="390"
                    cy="620"
                    r="22"
                    fill="var(--color-card)"
                    stroke="var(--color-border)"
                    strokeWidth="3"
                  />
                  <text
                    x="390"
                    y="625"
                    textAnchor="middle"
                    fontSize="15"
                    fontWeight="700"
                    fill="var(--color-foreground)"
                  >
                    J
                  </text>
                  <circle
                    cx="555"
                    cy="515"
                    r="22"
                    fill="var(--color-card)"
                    stroke="var(--color-border)"
                    strokeWidth="3"
                  />
                  <text
                    x="555"
                    y="520"
                    textAnchor="middle"
                    fontSize="15"
                    fontWeight="700"
                    fill="var(--color-foreground)"
                  >
                    K
                  </text>
                  <circle
                    cx="835"
                    cy="510"
                    r="22"
                    fill="var(--color-card)"
                    stroke="var(--color-border)"
                    strokeWidth="3"
                  />
                  <text
                    x="835"
                    y="515"
                    textAnchor="middle"
                    fontSize="15"
                    fontWeight="700"
                    fill="var(--color-foreground)"
                  >
                    J
                  </text>
                </g>
              </svg>
              <div className="flex absolute top-[36%] left-[38%] justify-center items-center w-16 h-12">
                <div className="rounded-full bg-primary/10 border border-primary/60 absolute size-14" />
                <div className="shadow-sm rounded-md bg-card border border-border flex relative justify-center items-center w-11 h-7">
                  <ScanLine className="text-primary size-4" />
                  <span className="rounded-full bg-foreground absolute -bottom-2 left-2 w-2 h-1.5" />
                  <span className="rounded-full bg-foreground absolute right-2 -bottom-2 w-2 h-1.5" />
                </div>
              </div>
              <div className="shadow-md rounded-md bg-popover text-popover-foreground border border-primary/60 absolute top-[42%] left-[42%] p-3 w-44">
                <div className="flex mb-2 justify-between items-center">
                  <span className="font-semibold text-sm">Node F</span>
                  <MoreHorizontal className="text-muted-foreground size-4" />
                </div>
                <div className="text-muted-foreground text-xs">
                  <button
                    type="button"
                    className="text-left rounded-sm flex mb-1 px-2 py-1.5 items-center gap-2 w-full hover:bg-accent hover:text-accent-foreground"
                  >
                    <CircleDot className="size-3.5" />
                    Set as source
                  </button>
                  <button
                    type="button"
                    className="text-left rounded-sm flex mb-1 px-2 py-1.5 items-center gap-2 w-full hover:bg-accent hover:text-accent-foreground"
                  >
                    <Flag className="size-3.5" />
                    Set as destination
                  </button>
                  <button
                    type="button"
                    className="text-left rounded-sm text-destructive flex px-2 py-1.5 items-center gap-2 w-full hover:bg-accent"
                  >
                    <Trash2 className="size-3.5" />
                    Delete node
                  </button>
                </div>
              </div>
            </section>
            <aside className="bg-card border-y-border border-r-border border-l border-l-border shrink-0 w-[300px] overflow-y-auto">
              <div className="border-t-border border-r-border border-b border-b-border border-l-border p-4">
                <div className="flex mb-3 justify-between items-center">
                  <h2 className="font-semibold text-sm">Selected element</h2>
                  <span className="font-mono rounded-xs bg-primary/10 text-primary text-[10px] px-2 py-1">
                    NODE
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="font-semibold rounded-md bg-primary/10 text-primary border border-primary flex justify-center items-center size-9">
                    F
                  </div>
                  <div>
                    <p className="font-medium text-sm">Node F</p>
                    <p className="font-mono text-muted-foreground text-xs">
                      x 640 · y 302
                    </p>
                  </div>
                </div>
                <div className="flex mt-3 gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="text-xs flex-1 gap-2"
                  >
                    <Pencil className="size-3.5" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive text-xs flex-1 gap-2"
                  >
                    <Trash2 className="size-3.5" />
                    Delete
                  </Button>
                </div>
              </div>
              <div className="border-t-border border-r-border border-b border-b-border border-l-border p-4">
                <h2 className="font-semibold text-sm mb-3">
                  Start and destination
                </h2>
                <div>
                  <div className="mb-3">
                    <label className="text-muted-foreground text-xs block mb-1">
                      Source node
                    </label>
                    <Select defaultValue="A">
                      <SelectTrigger className="text-xs h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="F">F</SelectItem>
                        <SelectItem value="L">L</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-xs block mb-1">
                      Destination node
                    </label>
                    <Select defaultValue="L">
                      <SelectTrigger className="text-xs h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="F">F</SelectItem>
                        <SelectItem value="L">L</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="border-t-border border-r-border border-b border-b-border border-l-border p-4">
                <h2 className="font-semibold text-sm mb-3">Graph statistics</h2>
                <div className="text-xs grid gap-y-3 grid-cols-2">
                  <div>
                    <span className="text-muted-foreground block">Nodes</span>
                    <span className="font-mono font-medium">12</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Edges</span>
                    <span className="font-mono font-medium">16</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">
                      Topology
                    </span>
                    <span className="font-medium">Undirected</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Weights</span>
                    <span className="font-medium">Weighted</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Density</span>
                    <span className="font-mono font-medium">24%</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-sm mb-3">Graph presets</h2>
                <div>
                  <button
                    type="button"
                    className="text-left rounded-sm text-muted-foreground text-xs flex mb-1 p-2 justify-between items-center w-full hover:bg-accent hover:text-accent-foreground"
                  >
                    Random graph
                    <ChevronRight className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    className="text-left rounded-sm text-muted-foreground text-xs flex mb-1 p-2 justify-between items-center w-full hover:bg-accent hover:text-accent-foreground"
                  >
                    Small example graph
                    <ChevronRight className="size-3.5" />
                  </button>
                  <button type="button" className="mb-1">
                    Weighted graph
                    <Check className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    className="text-left rounded-sm text-muted-foreground text-xs flex mb-1 p-2 justify-between items-center w-full hover:bg-accent hover:text-accent-foreground"
                  >
                    Maze-like graph
                    <ChevronRight className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    className="text-left rounded-sm text-muted-foreground text-xs flex p-2 justify-between items-center w-full hover:bg-accent hover:text-accent-foreground"
                  >
                    Dense graph
                    <ChevronRight className="size-3.5" />
                  </button>
                </div>
              </div>
            </aside>
          </div>
          <div className="bg-card border-x-border border-t border-t-border border-b-border flex px-5 items-center shrink-0 gap-5 h-16">
            <div className="w-40">
              <p className="font-semibold text-xs">Ready to explore</p>
              <p className="text-muted-foreground text-[10px] mt-1">
                Weighted route · Dijkstra
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" aria-label="Restart">
                <RotateCcw className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Previous step">
                <SkipBack className="size-4" />
              </Button>
              <Button
                size="icon"
                aria-label="Play or pause"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Pause className="hidden size-4" />
                <Play className="fill-primary-foreground size-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Next step">
                <SkipForward className="size-4" />
              </Button>
            </div>
            <div className="flex items-center flex-1 gap-3 min-w-0">
              <span className="font-mono text-muted-foreground text-xs" />
              <div className="rounded-full bg-muted relative flex-1 h-1.5">
                <div className="rounded-full bg-primary absolute top-0 left-0 w-0 h-1.5" />
                <div className="rounded-full bg-card border-2 border-primary absolute -top-1 left-0 size-3.5" />
              </div>
              <span className="text-muted-foreground text-xs">24 steps</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-xs">Speed</span>
              <Select defaultValue="1x">
                <SelectTrigger className="text-xs w-20 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5x">0.5x</SelectItem>
                  <SelectItem value="1x">1x</SelectItem>
                  <SelectItem value="2x">2x</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
