import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CircleCheck,
  CircleDot,
  Crosshair,
  Link2,
  LoaderCircle,
  MoreHorizontal,
  MousePointer2,
  Move,
  Network,
  PanelRight,
  Play,
  Plus,
  Route,
  ScanLine,
  Settings2,
  SkipBack,
  StepForward,
  Trash2,
  TriangleAlert,
  Undo2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import "./ed6c55f0-5b6c-4493-8e29-8afb25959c9f.css";
import "./Screen-10.screen.css";

export default function Screen10() {
  return (
    <div data-appearance="light">
      <div className="bg-background text-foreground w-full h-fit h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <div className="grid mx-auto p-6 gap-6 grid-cols-[7fr_3fr] min-h-[956px] max-w-[1140px]">
          <main className="min-w-0">
            <header className="border-b flex mb-5 pb-4 justify-between items-end">
              <div>
                <div className="font-mono text-primary text-xs tracking-[0.18em] flex items-center gap-2">
                  <Route className="size-4" />
                  PATHFINDER
                </div>
                <h1 className="font-semibold text-2xl tracking-tight mt-2">{`Components & responsive behavior`}</h1>
              </div>
              <div className="text-right text-muted-foreground text-xs">
                <div>REFERENCE BOARD / 01</div>
                <div className="font-mono mt-1">1140 × 956 desktop</div>
              </div>
            </header>
            <div className="grid mb-5 gap-4 grid-cols-3">
              <Card className="shadow-xs rounded-lg bg-card border p-4">
                <div className="flex mb-3 justify-between items-center">
                  <span className="font-mono text-muted-foreground text-xs">
                    BUTTONS
                  </span>
                  <MousePointer2 className="text-muted-foreground size-4" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button className="text-xs gap-2 h-8">
                    <Play className="size-3" />
                    Run algorithm
                  </Button>
                  <Button variant="secondary" className="text-xs h-8">
                    Secondary
                  </Button>
                  <Button variant="outline" size="icon" className="size-8">
                    <Settings2 className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </div>
              </Card>
              <Card className="shadow-xs rounded-lg bg-card border p-4">
                <div className="font-mono text-muted-foreground text-xs mb-3">
                  STATUS BADGES
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-secondary text-secondary-foreground">
                    Ready
                  </Badge>
                  <Badge className="bg-primary/15 text-primary">Running</Badge>
                  <Badge className="bg-chart-3/15 text-foreground">
                    Complete
                  </Badge>
                  <Badge className="bg-destructive/15 text-destructive">
                    Error
                  </Badge>
                </div>
              </Card>
              <Card className="shadow-xs rounded-lg bg-card border p-4">
                <div className="font-mono text-muted-foreground text-xs mb-3">
                  TOOLBAR
                </div>
                <div className="rounded-md bg-muted border flex p-1 items-center gap-1">
                  <Button variant="secondary" size="icon" className="size-7">
                    <MousePointer2 className="size-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="size-7">
                    <Plus className="size-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="size-7">
                    <Link2 className="size-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="size-7">
                    <Trash2 className="size-3" />
                  </Button>
                  <div className="bg-border ml-1 w-px h-4" />
                  <Button variant="ghost" size="icon" className="size-7">
                    <Undo2 className="size-3" />
                  </Button>
                </div>
              </Card>
            </div>
            <section className="grid mb-5 gap-4 grid-cols-[1.2fr_0.8fr]">
              <Card className="shadow-xs rounded-lg bg-card border p-4">
                <div className="flex mb-4 justify-between items-center">
                  <div>
                    <div className="font-mono text-muted-foreground text-xs">
                      ALGORITHM CHECKBOX CARDS
                    </div>
                    <div className="font-medium text-sm mt-1">
                      Choose traversal modes
                    </div>
                  </div>
                  <Badge variant="outline">same graph</Badge>
                </div>
                <div>
                  <label className="rounded-md bg-accent/50 border flex mb-2 p-3 items-center gap-3">
                    <Checkbox defaultChecked={true} />
                    <div className="flex-1">
                      <div className="font-medium text-sm flex justify-between">
                        <span>Breadth-first search</span>
                        <span className="font-mono text-primary text-xs">
                          O(V + E)
                        </span>
                      </div>
                      <div className="text-muted-foreground text-xs mt-1">
                        Queue-based · unweighted shortest path
                      </div>
                    </div>
                  </label>
                  <label className="rounded-md border flex p-3 items-center gap-3">
                    <Checkbox defaultChecked={false} />
                    <div className="flex-1">
                      <div className="font-medium text-sm flex justify-between">
                        <span>Dijkstra's algorithm</span>
                        <span className="font-mono text-muted-foreground text-xs">
                          O((V+E) log V)
                        </span>
                      </div>
                      <div className="text-muted-foreground text-xs mt-1">
                        Priority queue · non-negative weights
                      </div>
                    </div>
                  </label>
                </div>
              </Card>
              <Card className="shadow-xs rounded-lg bg-card border p-4">
                <div className="font-mono text-muted-foreground text-xs mb-4">
                  CONTROLS
                </div>
                <div>
                  <div className="mb-4">
                    <div className="text-xs flex mb-2 justify-between">
                      <span>Playback speed</span>
                      <span className="font-mono text-muted-foreground">×</span>
                    </div>
                    <Slider value={[null]} min={1} max={4} step={1} />
                  </div>
                  <div className="grid gap-2 grid-cols-2">
                    <Select defaultValue="A">
                      <SelectTrigger className="text-xs h-8">
                        <SelectValue placeholder="Source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">Source · A</SelectItem>
                        <SelectItem value="B">Source · B</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="J">
                      <SelectTrigger className="text-xs h-8">
                        <SelectValue placeholder="Destination" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="J">Goal · J</SelectItem>
                        <SelectItem value="K">Goal · K</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            </section>
            <section className="grid mb-5 gap-4 grid-cols-[1fr_1fr]">
              <Card className="shadow-xs rounded-lg bg-card border p-4">
                <div className="flex mb-3 justify-between items-center">
                  <span className="font-mono text-muted-foreground text-xs">
                    NODE STATES
                  </span>
                  <CircleDot className="text-primary size-4" />
                </div>
                <div className="flex py-3 justify-around items-center">
                  <div className="text-center">
                    <div className="font-mono rounded-full bg-muted text-xs border-2 border-border flex mx-auto justify-center items-center size-10">
                      A
                    </div>
                    <div className="text-muted-foreground text-xs mt-2">
                      unvisited
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-mono rounded-full bg-primary/15 text-primary text-xs border-2 border-primary flex mx-auto justify-center items-center size-10">
                      C
                    </div>
                    <div className="text-muted-foreground text-xs mt-2">
                      frontier
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-mono rounded-full bg-chart-3/15 text-xs border-2 border-chart-3 flex mx-auto justify-center items-center size-10">
                      J
                    </div>
                    <div className="text-muted-foreground text-xs mt-2">
                      goal
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="shadow-xs rounded-lg bg-card border p-4">
                <div className="font-mono text-muted-foreground text-xs mb-3">
                  EDGE STATES
                </div>
                <div className="pt-2">
                  <div className="flex mb-4 items-center gap-3">
                    <div className="bg-border flex-1 h-px" />
                    <span className="font-mono text-muted-foreground text-xs">
                      4
                    </span>
                  </div>
                  <div className="flex mb-4 items-center gap-3">
                    <div className="bg-primary flex-1 h-0.5" />
                    <span className="font-mono text-primary text-xs">7</span>
                    <Badge className="bg-primary/15 text-primary">
                      examined
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-chart-2 flex-1 h-0.5" />
                    <span className="font-mono text-chart-2 text-xs">2</span>
                    <Badge className="bg-chart-2/15 text-foreground">
                      route
                    </Badge>
                  </div>
                </div>
              </Card>
            </section>
            <section className="grid mb-5 gap-4 grid-cols-[1fr_1fr]">
              <Card className="shadow-xs rounded-lg bg-card border p-4">
                <div className="flex mb-3 justify-between items-center">
                  <span className="font-mono text-muted-foreground text-xs">
                    CONTEXT MENU
                  </span>
                  <Button variant="outline" size="sm" className="text-xs h-7">
                    Node C<ChevronDown className="ml-2 size-3" />
                  </Button>
                </div>
                <div className="shadow-md rounded-md bg-popover text-sm border p-1 w-44">
                  <div className="rounded-sm bg-accent px-2 py-1.5">
                    Set as source
                  </div>
                  <div className="px-2 py-1.5">Set as destination</div>
                  <div className="border-t my-1" />
                  <div className="text-destructive px-2 py-1.5">
                    Delete node
                  </div>
                </div>
              </Card>
              <Card className="shadow-xs rounded-lg bg-card border p-4">
                <div className="flex mb-3 justify-between items-center">
                  <span className="font-mono text-muted-foreground text-xs">
                    INSPECTOR
                  </span>
                  <PanelRight className="text-muted-foreground size-4" />
                </div>
                <div className="text-xs">
                  <div className="flex mb-2 justify-between">
                    <span className="text-muted-foreground">
                      Selected element
                    </span>
                    <span className="font-mono">NODE_C</span>
                  </div>
                  <div className="flex mb-2 justify-between">
                    <span className="text-muted-foreground">Position</span>
                    <span className="font-mono">x 428 · y 212</span>
                  </div>
                  <div className="flex mb-2 justify-between">
                    <span className="text-muted-foreground">Connections</span>
                    <span className="font-mono">4 edges</span>
                  </div>
                  <div className="flex pt-2 gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="text-xs flex-1 h-7"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs flex-1 h-7"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            </section>
            <section className="grid mb-5 gap-4 grid-cols-[1fr_1fr]">
              <Card className="shadow-xs rounded-lg bg-card border p-4">
                <div className="flex mb-3 justify-between items-center">
                  <span className="font-mono text-muted-foreground text-xs">
                    QUEUE DISPLAY
                  </span>
                  <Badge variant="outline">BFS</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-mono rounded-md bg-muted text-sm border px-3 py-2">
                    C
                  </div>
                  <ChevronRight className="text-muted-foreground size-4" />
                  <div className="font-mono rounded-md text-sm border px-3 py-2">
                    E
                  </div>
                  <ChevronRight className="text-muted-foreground size-4" />
                  <div className="font-mono rounded-md text-sm border px-3 py-2">
                    F
                  </div>
                  <span className="text-muted-foreground text-xs ml-auto">
                    head
                  </span>
                </div>
              </Card>
              <Card className="shadow-xs rounded-lg bg-card border p-4">
                <div className="font-mono text-muted-foreground text-xs mb-3">
                  PSEUDOCODE / ACTIVE LINE
                </div>
                <div className="font-mono rounded-md bg-muted text-xs p-3">
                  <div className="text-muted-foreground mb-1">
                    01 queue ← [source]
                  </div>
                  <div className="rounded-sm bg-primary/15 text-primary mb-1 px-2 py-1">
                    02 while queue is not empty
                  </div>
                  <div className="text-muted-foreground mb-1">
                    03 current ← dequeue()
                  </div>
                  <div className="text-muted-foreground">
                    04 explore neighbors
                  </div>
                </div>
              </Card>
            </section>
            <section className="grid mb-5 gap-3 grid-cols-4">
              <Card className="shadow-xs rounded-lg bg-card border p-3">
                <div className="text-muted-foreground text-xs">
                  Vertices visited
                </div>
                <div className="font-semibold text-xl mt-1">07</div>
              </Card>
              <Card className="shadow-xs rounded-lg bg-card border p-3">
                <div className="text-muted-foreground text-xs">
                  Edges examined
                </div>
                <div className="font-semibold text-xl mt-1">11</div>
              </Card>
              <Card className="shadow-xs rounded-lg bg-card border p-3">
                <div className="text-muted-foreground text-xs">Path weight</div>
                <div className="font-semibold text-primary text-xl mt-1">
                  18
                </div>
              </Card>
              <Card className="shadow-xs rounded-lg bg-card border p-3">
                <div className="text-muted-foreground text-xs">Runtime</div>
                <div className="font-semibold text-xl mt-1">12ms</div>
              </Card>
            </section>
            <section className="grid mb-5 gap-3 grid-cols-4">
              <Card className="rounded-lg bg-muted/40 border border-dashed p-4">
                <Network className="text-muted-foreground size-5" />
                <div className="font-medium text-sm mt-3">
                  Build a graph to begin
                </div>
                <div className="text-muted-foreground text-xs mt-1">
                  Add nodes or choose a preset.
                </div>
              </Card>
              <Card className="rounded-lg bg-destructive/5 border border-destructive/40 p-4">
                <TriangleAlert className="text-destructive size-5" />
                <div className="font-medium text-sm mt-3">
                  Edge weights must be non-negative
                </div>
              </Card>
              <Card className="rounded-lg bg-muted/40 border p-4">
                <LoaderCircle className="animate-spin text-primary size-5" />
                <div className="font-medium text-sm mt-3">
                  Recording traversal…
                </div>
              </Card>
              <Card className="rounded-lg bg-chart-3/5 border border-chart-3/40 p-4">
                <CircleCheck className="text-chart-3 size-5" />
                <div className="font-medium text-sm mt-3">Route found</div>
                <div className="text-muted-foreground text-xs mt-1">
                  7 nodes · 18 total weight
                </div>
              </Card>
            </section>
            <section className="shadow-xs rounded-lg bg-card border flex p-4 justify-between items-center">
              <div className="flex items-center gap-4">
                <div>
                  <div className="font-mono text-muted-foreground text-xs">
                    SIGNATURE ROVER
                  </div>
                  <div className="text-muted-foreground text-xs mt-1">
                    Small enough for graph canvas, clear enough to read.
                  </div>
                </div>
                <div className="flex items-end gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <div className="rounded-sm bg-muted border-2 border-primary flex relative justify-center items-center size-8">
                      <Crosshair className="text-primary size-4" />
                    </div>
                    <span className="font-mono text-muted-foreground text-[10px]">
                      30px
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="rounded-md bg-muted border-2 border-primary flex relative justify-center items-center size-14">
                      <Crosshair className="text-primary size-7" />
                    </div>
                    <span className="font-mono text-muted-foreground text-[10px]">
                      60px
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-muted-foreground text-xs flex items-center gap-2">
                <ScanLine className="text-primary size-4" />
                scanning node C
              </div>
            </section>
          </main>
          <aside className="min-w-0">
            <Card className="shadow-sm rounded-lg bg-card border mb-4 overflow-hidden">
              <div className="bg-muted border-b flex px-4 py-3 justify-between items-center">
                <div className="font-mono text-xs tracking-[0.12em]">
                  RESPONSIVE CROP
                </div>
                <Badge variant="outline" className="font-mono text-[10px]">
                  1280 × 800
                </Badge>
              </div>
              <div className="bg-sidebar p-3">
                <div className="shadow-xs rounded-md bg-card border">
                  <div className="border-b flex px-3 py-2 justify-between items-center">
                    <div className="font-mono font-semibold text-[10px] flex items-center gap-2">
                      <Route className="text-primary size-3" />
                      PATHFINDER / Graph Studio
                    </div>
                    <Button size="sm" className="text-[10px] px-2 h-6">
                      Run
                    </Button>
                  </div>
                  <div className="grid grid-cols-[28px_1fr]">
                    <div className="bg-muted border-r flex py-3 flex-col items-center gap-2">
                      <MousePointer2 className="text-primary size-3" />
                      <Plus className="text-muted-foreground size-3" />
                      <Link2 className="text-muted-foreground size-3" />
                      <Trash2 className="text-muted-foreground size-3" />
                      <Move className="text-muted-foreground size-3" />
                    </div>
                    <div className="bg-background relative h-64 overflow-hidden">
                      <div className="opacity-40 bg-[linear-gradient(90deg,var(--color-border)_1px,rgba(0,_0,_0,_0)_1px),linear-gradient(180deg,var(--color-border)_1px,rgba(0,_0,_0,_0)_1px)] bg-size-[20px_20px] absolute inset-0" />
                      <svg
                        viewBox="0 0 280 180"
                        className="absolute inset-0 size-full"
                      >
                        <path
                          d="M35 125 L88 58 L145 108 L210 48 L250 125 M88 58 L210 48 M88 58 L145 108 M35 125 L145 108"
                          fill="none"
                          stroke="var(--color-border)"
                          strokeWidth="2"
                        />
                        <path
                          d="M145 108 L210 48"
                          fill="none"
                          stroke="var(--color-primary)"
                          strokeWidth="3"
                        />
                      </svg>
                      <div className="font-mono rounded-full bg-chart-3/15 text-[8px] border border-chart-3 flex absolute top-[115px] left-[28px] justify-center items-center size-5">
                        A
                      </div>
                      <div className="font-mono rounded-full bg-primary/15 text-[8px] border border-primary flex absolute top-[50px] left-[80px] justify-center items-center size-5">
                        C
                      </div>
                      <div className="font-mono rounded-full bg-muted text-[8px] border flex absolute top-[100px] left-[137px] justify-center items-center size-5">
                        F
                      </div>
                      <div className="font-mono rounded-full bg-chart-3/15 text-[8px] border border-chart-3 flex absolute top-[40px] left-[202px] justify-center items-center size-5">
                        J
                      </div>
                      <div className="rounded-sm bg-card/80 text-muted-foreground text-[9px] border absolute bottom-2 left-2 px-2 py-1">
                        Graph canvas · 10 nodes · weighted
                      </div>
                    </div>
                  </div>
                  <div className="bg-muted border-t px-3 py-2">
                    <div className="text-[10px] flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <SkipBack className="size-3" />
                        <Play className="text-primary size-3" />
                        <StepForward className="size-3" />
                        <span className="font-mono text-muted-foreground">
                          08 / 24
                        </span>
                      </div>
                      <span className="text-primary">Ready to explore</span>
                    </div>
                    <div className="rounded-full bg-border mt-2 h-1">
                      <div className="rounded-full bg-primary w-1/3 h-1" />
                    </div>
                  </div>
                  <div className="text-muted-foreground text-[10px] border-t px-3 py-2">
                    <div className="flex justify-between items-center">
                      <span>Inspector</span>
                      <ChevronUp className="size-3" />
                    </div>
                    <div className="rounded-sm bg-muted mt-2 w-2/3 h-2" />
                    <div className="rounded-sm bg-muted mt-1 w-1/2 h-2" />
                  </div>
                </div>
              </div>
            </Card>
            <div className="mb-4 px-1">
              <div className="flex mb-3 items-start gap-2">
                <div className="rounded-full bg-primary mt-1 size-2" />
                <div>
                  <div className="font-medium text-sm">Inspector collapses</div>
                  <div className="text-muted-foreground text-xs">
                    Bottom sheet preserves canvas height.
                  </div>
                </div>
              </div>
              <div className="flex mb-3 items-start gap-2">
                <div className="rounded-full bg-primary mt-1 size-2" />
                <div>
                  <div className="font-medium text-sm">
                    Graph remains primary
                  </div>
                  <div className="text-muted-foreground text-xs">
                    Tools and traversal states stay visible.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-primary mt-1 size-2" />
                <div>
                  <div className="font-medium text-sm">Toolbar condenses</div>
                  <div className="text-muted-foreground text-xs">
                    Icon-first controls fit compact widths.
                  </div>
                </div>
              </div>
            </div>
            <Card className="shadow-xs rounded-lg bg-card border mb-4 p-4">
              <div className="font-mono text-muted-foreground text-xs mb-3">
                TOKENS
              </div>
              <div className="text-xs grid gap-3 grid-cols-2">
                <div>
                  <div className="text-muted-foreground">Spacing</div>
                  <div className="font-mono flex mt-2 gap-2">
                    <span>08</span>
                    <span>12</span>
                    <span>16</span>
                    <span>24</span>
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Radius</div>
                  <div className="font-mono flex mt-2 gap-2">
                    <span>06</span>
                    <span>08</span>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-muted-foreground">Type scale</div>
                  <div className="font-mono flex mt-2 justify-between items-end">
                    <span className="text-xs">12</span>
                    <span className="text-sm">14</span>
                    <span className="text-base">16</span>
                    <span className="text-2xl">24</span>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="shadow-xs rounded-lg bg-card border p-4">
              <div className="flex mb-3 justify-between items-center">
                <span className="font-mono text-muted-foreground text-xs">
                  REFERENCE VIEW
                </span>
                <Tabs defaultValue="components">
                  <TabsList className="h-7">
                    <TabsTrigger
                      value="components"
                      className="text-[10px] px-2 h-6"
                    >
                      Components
                    </TabsTrigger>
                    <TabsTrigger
                      value="responsive"
                      className="text-[10px] px-2 h-6"
                    >
                      Responsive
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="text-muted-foreground text-xs">
                Flat UI, crisp borders, restrained cyan emphasis, and
                implementation-ready states.
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
