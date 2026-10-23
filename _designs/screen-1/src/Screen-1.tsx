import {
  Compass,
  Crosshair,
  GitBranch,
  MoveUpRight,
  Play,
  Route,
  Settings2,
  Undo2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import "./ed6c55f0-5b6c-4493-8e29-8afb25959c9f.css";
import "./Screen-1.screen.css";

export default function Screen1() {
  return (
    <div data-appearance="light">
      <div className="bg-background text-foreground w-full h-fit h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <div className="bg-foreground text-background p-8 min-h-screen">
          <header className="border-t-background/20 border-r-background/20 border-b border-b-background/20 border-l-background/20 flex pb-6 justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-primary/10 text-primary border border-primary flex justify-center items-center size-12">
                <Compass className="size-7" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="font-semibold text-2xl tracking-[0.18em]">
                    PATHFINDER
                  </h1>
                  <Badge className="rounded-md bg-primary/10 text-primary border border-primary/40">
                    IDENTITY / 01
                  </Badge>
                </div>
                <p className="text-background/60 text-sm mt-1">
                  Interactive Algorithm Laboratory
                </p>
              </div>
            </div>
            <div className="font-mono text-right text-background/50 text-xs flex items-center gap-8">
              <div>
                <div className="text-background/30">ART DIRECTION</div>
                <div className="text-background mt-1">
                  FLAT 2D / TACTICAL TECHNICAL
                </div>
              </div>
              <div>
                <div className="text-background/30">CANVAS</div>
                <div className="text-background mt-1">1600 × 1000</div>
              </div>
              <div>
                <div className="text-background/30">VERSION</div>
                <div className="text-primary mt-1">01.0</div>
              </div>
            </div>
          </header>
          <main className="grid mt-6 gap-6 grid-cols-12">
            <section className="rounded-lg bg-background/5 border border-background/20 p-6 col-span-4">
              <div className="flex mb-5 justify-between items-center">
                <h2 className="font-semibold uppercase text-sm tracking-[0.16em]">
                  Color system
                </h2>
                <span className="font-mono text-background/40 text-xs">
                  09 TOKENS
                </span>
              </div>
              <div className="grid gap-3 grid-cols-3">
                <div className="rounded-md border border-background/15 overflow-hidden">
                  <div className="bg-foreground h-16" />
                  <div className="bg-background/5 p-2">
                    <div className="font-medium text-xs">Graphite</div>
                    <div className="font-mono text-background/50 text-[10px] mt-1">
                      #11161B
                    </div>
                  </div>
                </div>
                <div className="rounded-md border border-background/15 overflow-hidden">
                  <div className="bg-card h-16" />
                  <div className="bg-background/5 p-2">
                    <div className="font-medium text-xs">Panel</div>
                    <div className="font-mono text-background/50 text-[10px] mt-1">
                      #1A2128
                    </div>
                  </div>
                </div>
                <div className="rounded-md border border-background/15 overflow-hidden">
                  <div className="bg-border h-16" />
                  <div className="bg-background/5 p-2">
                    <div className="font-medium text-xs">Border</div>
                    <div className="font-mono text-background/50 text-[10px] mt-1">
                      #2B353D
                    </div>
                  </div>
                </div>
                <div className="rounded-md border border-background/15 overflow-hidden">
                  <div className="bg-background h-16" />
                  <div className="bg-background/5 p-2">
                    <div className="font-medium text-xs">Warm White</div>
                    <div className="font-mono text-background/50 text-[10px] mt-1">
                      #F3F1EA
                    </div>
                  </div>
                </div>
                <div className="rounded-md border border-background/15 overflow-hidden">
                  <div className="bg-muted-foreground h-16" />
                  <div className="bg-background/5 p-2">
                    <div className="font-medium text-xs">Cool Gray</div>
                    <div className="font-mono text-background/50 text-[10px] mt-1">
                      #94A3AD
                    </div>
                  </div>
                </div>
                <div className="rounded-md border border-background/15 overflow-hidden">
                  <div className="bg-primary h-16" />
                  <div className="bg-background/5 p-2">
                    <div className="font-medium text-xs">Electric Cyan</div>
                    <div className="font-mono text-background/50 text-[10px] mt-1">
                      #4DE1E8
                    </div>
                  </div>
                </div>
                <div className="rounded-md border border-background/15 overflow-hidden">
                  <div className="bg-chart-2 h-16" />
                  <div className="bg-background/5 p-2">
                    <div className="font-medium text-xs">Amber</div>
                    <div className="font-mono text-background/50 text-[10px] mt-1">
                      #F4B45E
                    </div>
                  </div>
                </div>
                <div className="rounded-md border border-background/15 overflow-hidden">
                  <div className="bg-chart-3 h-16" />
                  <div className="bg-background/5 p-2">
                    <div className="font-medium text-xs">Lime</div>
                    <div className="font-mono text-background/50 text-[10px] mt-1">
                      #A8D66D
                    </div>
                  </div>
                </div>
                <div className="rounded-md border border-background/15 overflow-hidden">
                  <div className="bg-destructive h-16" />
                  <div className="bg-background/5 p-2">
                    <div className="font-medium text-xs">Error Red</div>
                    <div className="font-mono text-background/50 text-[10px] mt-1">
                      #E56B6F
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="rounded-lg bg-background/5 border border-background/20 p-6 col-span-4">
              <div className="flex mb-5 justify-between items-center">
                <h2 className="font-semibold uppercase text-sm tracking-[0.16em]">{`Type & controls`}</h2>
                <span className="font-mono text-background/40 text-xs">
                  SYSTEM SAMPLES
                </span>
              </div>
              <div>
                <div className="border-t-background/15 border-r-background/15 border-b border-b-background/15 border-l-background/15 mb-5 pb-4">
                  <div className="font-semibold text-2xl tracking-tight">
                    Space Grotesk
                  </div>
                  <div className="text-background/50 text-xs mt-1">
                    Display / UI headings / navigation
                  </div>
                </div>
                <div className="font-mono border-t-background/15 border-r-background/15 border-b border-b-background/15 border-l-background/15 mb-5 pb-4">
                  <div className="text-lg">JetBrains Mono</div>
                  <div className="text-background/50 text-xs mt-1">
                    Code / metrics / node labels
                  </div>
                </div>
                <div className="flex mb-5 flex-wrap items-center gap-2">
                  <Button className="rounded-md bg-primary text-primary-foreground">
                    Run algorithm
                    <Play className="ml-2 size-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-md bg-transparent text-background border-background/30"
                  >
                    Edit graph
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-md bg-transparent text-background border-background/30"
                  >
                    <Undo2 className="size-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-md bg-transparent text-background border-background/30"
                  >
                    <Settings2 className="size-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className="rounded-md bg-primary/15 text-primary">
                    Ready
                  </Badge>
                  <Badge className="rounded-md bg-chart-2/15 text-chart-2">
                    Running
                  </Badge>
                  <Badge className="rounded-md bg-chart-3/15 text-chart-3">
                    Complete
                  </Badge>
                  <Badge className="rounded-md bg-destructive/15 text-destructive">
                    Error
                  </Badge>
                </div>
              </div>
            </section>
            <section className="rounded-lg bg-background/5 border border-background/20 p-6 col-span-4">
              <div className="flex mb-5 justify-between items-center">
                <h2 className="font-semibold uppercase text-sm tracking-[0.16em]">
                  Graph primitives
                </h2>
                <span className="font-mono text-background/40 text-xs">
                  NODE / EDGE STATES
                </span>
              </div>
              <div className="grid gap-4 grid-cols-3">
                <div className="flex flex-col items-center gap-2">
                  <div className="font-mono rounded-full text-background/60 text-xs border border-background/40 flex justify-center items-center size-10">
                    A
                  </div>
                  <span className="text-background/50 text-[10px]">
                    unvisited
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="font-mono rounded-full bg-primary/15 text-primary text-xs border-2 border-primary flex justify-center items-center size-10">
                    B
                  </div>
                  <span className="text-background/50 text-[10px]">
                    selected
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="font-mono rounded-full bg-chart-3/15 text-chart-3 text-[9px] border-2 border-chart-3 flex justify-center items-center size-10">
                    START
                  </div>
                  <span className="text-background/50 text-[10px]">source</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="font-mono rounded-full bg-chart-2/15 text-chart-2 text-[9px] border-2 border-chart-2 flex justify-center items-center size-10">
                    GOAL
                  </div>
                  <span className="text-background/50 text-[10px]">goal</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="font-mono rounded-full bg-chart-2/10 text-chart-2 text-xs border border-chart-2 flex justify-center items-center size-10">
                    C
                  </div>
                  <span className="text-background/50 text-[10px]">
                    frontier
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="font-mono rounded-full bg-primary/10 text-primary text-xs border border-primary/50 flex justify-center items-center size-10">
                    D
                  </div>
                  <span className="text-background/50 text-[10px]">
                    processed
                  </span>
                </div>
              </div>
              <div className="font-mono text-xs mt-6">
                <div className="flex mb-3 items-center gap-3">
                  <div className="bg-background/35 flex-1 h-px" />
                  <span className="text-background/50">default</span>
                </div>
                <div className="flex mb-3 items-center gap-3">
                  <div className="bg-primary/60 flex-1 h-0.5" />
                  <span className="text-primary">examined</span>
                </div>
                <div className="flex mb-3 items-center gap-3">
                  <div className="bg-chart-2 flex-1 h-1" />
                  <span className="text-chart-2">selected</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-chart-3 flex-1 h-1" />
                  <span className="text-chart-3">final path</span>
                </div>
              </div>
            </section>
            <section className="rounded-lg bg-background/5 border border-background/20 p-6 col-span-7">
              <div className="flex mb-5 justify-between items-center">
                <h2 className="font-semibold uppercase text-sm tracking-[0.16em]">
                  Signature rover
                </h2>
                <span className="font-mono text-background/40 text-xs">
                  REUSABLE VISUAL ELEMENT
                </span>
              </div>
              <div className="flex justify-around items-end">
                <div className="flex flex-col items-center gap-3">
                  <div className="flex relative justify-center items-end w-24 h-20">
                    <div className="shadow-sm rounded-md bg-foreground border border-background/40 absolute bottom-2 w-16 h-8">
                      <div className="bg-background/20 border-x border-x-primary border-y-primary absolute -top-4 left-7 w-1 h-5" />
                      <div className="rounded-full bg-primary absolute -top-6 left-6 size-3" />
                      <div className="rounded-full bg-chart-2 absolute top-2 -right-3 size-3" />
                      <div className="rounded-full bg-foreground border-2 border-background/50 absolute -bottom-2 left-1 size-4" />
                      <div className="rounded-full bg-foreground border-2 border-background/50 absolute right-1 -bottom-2 size-4" />
                    </div>
                  </div>
                  <span className="font-mono text-background/50 text-xs">
                    56px / IDLE
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="flex relative justify-center items-end w-36 h-28">
                    <div className="shadow-sm rounded-lg bg-foreground border border-background/40 absolute bottom-2 w-24 h-12">
                      <div className="bg-background/20 border-x border-x-primary border-y-primary absolute -top-8 left-11 w-1 h-9" />
                      <div className="rounded-full bg-primary/20 border-2 border-primary absolute -top-10 left-9 size-5" />
                      <div className="rounded-full bg-chart-2 absolute top-3 -right-5 size-5" />
                      <div className="rounded-full bg-foreground border-2 border-background/50 absolute -bottom-3 left-2 size-7" />
                      <div className="rounded-full bg-foreground border-2 border-background/50 absolute right-2 -bottom-3 size-7" />
                      <div className="bg-primary/60 absolute top-3 left-3 w-10 h-2" />
                    </div>
                  </div>
                  <span className="font-mono text-background/50 text-xs">
                    110px / SCANNING
                  </span>
                </div>
                <div className="text-xs">
                  <div className="flex mb-2 items-center gap-2">
                    <span className="rounded-full bg-background/50 size-2" />
                    Idle at source
                  </div>
                  <div className="flex mb-2 items-center gap-2">
                    <span className="rounded-full bg-primary size-2" />
                    Scanning node
                  </div>
                  <div className="flex mb-2 items-center gap-2">
                    <span className="rounded-full bg-chart-2 size-2" />
                    Traversing edge
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-chart-3 size-2" />
                    Complete at goal
                  </div>
                </div>
              </div>
            </section>
            <section className="rounded-lg bg-background/5 border border-background/20 p-6 col-span-5">
              <div className="flex mb-5 justify-between items-center">
                <h2 className="font-semibold uppercase text-sm tracking-[0.16em]">{`Tokens & icon language`}</h2>
                <span className="font-mono text-background/40 text-xs">
                  IMPLEMENTATION READY
                </span>
              </div>
              <div className="grid gap-6 grid-cols-2">
                <div>
                  <div className="text-background/50 text-xs mb-3">
                    Spacing scale
                  </div>
                  <div className="font-mono text-xs">
                    <div className="flex mb-2 items-center gap-3">
                      <span className="text-background/40 w-8">04</span>
                      <div className="bg-primary w-4 h-1" />
                    </div>
                    <div className="flex mb-2 items-center gap-3">
                      <span className="text-background/40 w-8">08</span>
                      <div className="bg-primary w-8 h-1" />
                    </div>
                    <div className="flex mb-2 items-center gap-3">
                      <span className="text-background/40 w-8">16</span>
                      <div className="bg-primary w-16 h-1" />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-background/40 w-8">24</span>
                      <div className="bg-primary w-24 h-1" />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-background/50 text-xs mb-3">
                    Radius scale
                  </div>
                  <div className="font-mono text-xs">
                    <div className="flex mb-2 items-center gap-3">
                      <span className="text-background/40 w-8">XS</span>
                      <div className="rounded-xs border border-primary size-6" />
                    </div>
                    <div className="flex mb-2 items-center gap-3">
                      <span className="text-background/40 w-8">SM</span>
                      <div className="rounded-sm border border-primary size-6" />
                    </div>
                    <div className="flex mb-2 items-center gap-3">
                      <span className="text-background/40 w-8">MD</span>
                      <div className="rounded-md border border-primary size-6" />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-background/40 w-8">LG</span>
                      <div className="rounded-lg border border-primary size-6" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-background/70 border-x-background/15 border-t border-t-background/15 border-b-background/15 flex mt-6 pt-5 items-center gap-5">
                <MoveUpRight className="text-primary size-4" />
                <GitBranch className="text-chart-2 size-4" />
                <Crosshair className="text-chart-3 size-4" />
                <Route className="text-primary size-4" />
                <span className="font-mono text-xs">
                  Lucide / 1.5px / precise utility icons
                </span>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
