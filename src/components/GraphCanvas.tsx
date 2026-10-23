import * as React from "react";
import { type Graph } from "@/lib/graph";
import { useGraph } from "@/state/GraphProvider";
import { cn } from "@/lib/utils";

interface GraphCanvasProps {
  graph: Graph;
  sourceId?: string | null;
  goalId?: string | null;
  nodeStates?: Record<string, string>;
  edgeStates?: Record<string, string>;
  examinedEdge?: { edgeId: string; from: string; to: string } | null;
  pathEdges?: string[] | null;
  interactive?: boolean;
  showLegend?: boolean;
  children?: React.ReactNode;
}

export function GraphCanvas({
  graph,
  sourceId,
  goalId,
  nodeStates = {},
  edgeStates = {},
  examinedEdge = null,
  pathEdges = null,
  interactive = true,
  showLegend = true,
  children,
}: GraphCanvasProps) {
  const {
    state,
    setSelection,
    addNode,
    moveNode,
    addEdge,
    removeNode,
    removeEdge,
    setWeight,
  } = useGraph();

  const svgRef = React.useRef<SVGSVGElement | null>(null);

  // Dragging state
  const [draggingNodeId, setDraggingNodeId] = React.useState<string | null>(null);
  const [dragOffset, setDragOffset] = React.useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // Connecting state
  const [connectSourceId, setConnectSourceId] = React.useState<string | null>(null);
  const [cursorPos, setCursorPos] = React.useState<{ x: number; y: number } | null>(null);

  // Inline weight editing state
  const [editingEdgeId, setEditingEdgeId] = React.useState<string | null>(null);
  const [editWeightVal, setEditWeightVal] = React.useState<string>("");
  const weightInputRef = React.useRef<HTMLInputElement | null>(null);

  // Convert screen coordinates to SVG viewBox coords (0 0 1000 720)
  const getSvgCoordinates = React.useCallback(
    (e: React.MouseEvent | MouseEvent) => {
      if (!svgRef.current) return { x: 0, y: 0 };
      const svg = svgRef.current;
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const ctm = svg.getScreenCTM();
      if (ctm) {
        const inverse = ctm.inverse();
        const transformed = pt.matrixTransform(inverse);
        return {
          x: Math.max(25, Math.min(975, transformed.x)),
          y: Math.max(25, Math.min(695, transformed.y)),
        };
      }
      return { x: 0, y: 0 };
    },
    [],
  );

  // Keyboard navigation & deletion
  React.useEffect(() => {
    if (!interactive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if an input is active
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "SELECT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "Delete" || e.key === "Backspace") {
        if (state.selection?.type === "node") {
          removeNode(state.selection.id);
        } else if (state.selection?.type === "edge") {
          removeEdge(state.selection.id);
        }
      } else if (e.key === "Escape") {
        setConnectSourceId(null);
        setEditingEdgeId(null);
        setSelection(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [interactive, state.selection, removeNode, removeEdge, setSelection]);

  // Global mouse move & up listeners during dragging
  React.useEffect(() => {
    if (!draggingNodeId || !interactive) return;

    const handleWindowMouseMove = (e: MouseEvent) => {
      const coords = getSvgCoordinates(e);
      moveNode(
        draggingNodeId,
        coords.x - dragOffset.x,
        coords.y - dragOffset.y,
      );
    };

    const handleWindowMouseUp = () => {
      setDraggingNodeId(null);
    };

    window.addEventListener("mousemove", handleWindowMouseMove);
    window.addEventListener("mouseup", handleWindowMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("mouseup", handleWindowMouseUp);
    };
  }, [draggingNodeId, dragOffset, getSvgCoordinates, moveNode, interactive]);

  // Focus weight input when opening inline edit
  React.useEffect(() => {
    if (editingEdgeId && weightInputRef.current) {
      weightInputRef.current.focus();
      weightInputRef.current.select();
    }
  }, [editingEdgeId]);

  // Canvas background clicks
  const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
    // Only handle if clicking canvas directly
    if (e.target !== svgRef.current && (e.target as SVGElement).id !== "canvas-bg") {
      return;
    }

    if (!interactive) return;

    if (state.tool === "add") {
      const coords = getSvgCoordinates(e);
      addNode(coords.x, coords.y);
    } else {
      setSelection(null);
      setConnectSourceId(null);
      setEditingEdgeId(null);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (connectSourceId && interactive) {
      const coords = getSvgCoordinates(e);
      setCursorPos(coords);
    }
  };

  // Node event handlers
  const handleNodeMouseDown = (
    e: React.MouseEvent,
    node: { id: string; x: number; y: number },
  ) => {
    if (!interactive) return;
    e.stopPropagation();

    if (state.tool === "delete") {
      removeNode(node.id);
      return;
    }

    if (state.tool === "connect") {
      if (!connectSourceId) {
        setConnectSourceId(node.id);
      } else if (connectSourceId !== node.id) {
        addEdge(connectSourceId, node.id, 1);
        setConnectSourceId(null);
        setCursorPos(null);
      }
      return;
    }

    // Select tool or default drag
    setSelection({ type: "node", id: node.id });
    const coords = getSvgCoordinates(e);
    setDragOffset({
      x: coords.x - node.x,
      y: coords.y - node.y,
    });
    setDraggingNodeId(node.id);
  };

  // Edge event handlers
  const handleEdgeClick = (
    e: React.MouseEvent,
    edge: { id: string; w: number },
  ) => {
    if (!interactive) return;
    e.stopPropagation();

    if (state.tool === "delete") {
      removeEdge(edge.id);
      return;
    }

    setSelection({ type: "edge", id: edge.id });
    setEditingEdgeId(edge.id);
    setEditWeightVal(String(edge.w));
  };

  const handleCommitWeight = (edgeId: string) => {
    const trimmed = editWeightVal.trim();
    if (trimmed !== "") {
      const parsed = parseInt(trimmed, 10);
      if (!isNaN(parsed) && parsed >= 1) {
        setWeight(edgeId, parsed);
      }
    }
    setEditingEdgeId(null);
  };

  // Map node lookup
  const nodeMap = React.useMemo(() => {
    const map = new Map<string, { id: string; label: string; x: number; y: number }>();
    for (const n of graph.nodes) {
      map.set(n.id, n);
    }
    return map;
  }, [graph.nodes]);

  const sourceNode = connectSourceId ? nodeMap.get(connectSourceId) : null;

  return (
    <div className="relative size-full overflow-hidden select-none">
      {/* Background Grid Pattern */}
      <div
        className="opacity-40 absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(90deg, var(--color-border) 1px, transparent 1px), linear-gradient(180deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <svg
        ref={svgRef}
        viewBox="0 0 1000 720"
        className={cn(
          "size-full block",
          interactive && state.tool === "add" && "cursor-crosshair",
          interactive && state.tool === "connect" && "cursor-cell",
          interactive && state.tool === "delete" && "cursor-pointer",
        )}
        onClick={handleCanvasClick}
        onMouseMove={handleCanvasMouseMove}
      >
        <defs>
          <filter id="canvas-pill-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.12" />
          </filter>
          <filter id="canvas-badge-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="#000000" floodOpacity="0.16" />
          </filter>
        </defs>

        <rect
          id="canvas-bg"
          x="0"
          y="0"
          width="1000"
          height="720"
          fill="transparent"
        />

        {/* 1. EDGES */}
        <g id="edges-layer">
          {graph.edges.map((edge) => {
            const na = nodeMap.get(edge.a);
            const nb = nodeMap.get(edge.b);
            if (!na || !nb) return null;

            const isSelected =
              state.selection?.type === "edge" && state.selection.id === edge.id;
            const edgeState = edgeStates[edge.id];
            const isPathEdge =
              pathEdges?.includes(edge.id) || edgeState === "path";
            const isExamined =
              examinedEdge &&
              (examinedEdge.edgeId === edge.id ||
                (examinedEdge.from === edge.a && examinedEdge.to === edge.b) ||
                (examinedEdge.from === edge.b && examinedEdge.to === edge.a));

            let strokeColor = "var(--color-border)";
            let strokeWidth = 2.5;

            if (isPathEdge) {
              strokeColor = "var(--color-chart-3)";
              strokeWidth = 5;
            } else if (isExamined) {
              strokeColor = "var(--color-primary)";
              strokeWidth = 5;
            } else if (edgeState === "frontier") {
              strokeColor = "var(--color-chart-2)";
              strokeWidth = 4;
            } else if (edgeState === "traversed") {
              strokeColor = "var(--color-primary)";
              strokeWidth = 3.5;
            } else if (isSelected) {
              strokeColor = "var(--color-foreground)";
              strokeWidth = 4;
            }

            const midX = (na.x + nb.x) / 2;
            const midY = (na.y + nb.y) / 2;

            return (
              <g key={edge.id} className="group">
                {/* Wide invisible hit-target */}
                <line
                  x1={na.x}
                  y1={na.y}
                  x2={nb.x}
                  y2={nb.y}
                  stroke="transparent"
                  strokeWidth="20"
                  className="cursor-pointer"
                  onClick={(e) => handleEdgeClick(e, edge)}
                />

                {/* Visible Edge Line */}
                <line
                  x1={na.x}
                  y1={na.y}
                  x2={nb.x}
                  y2={nb.y}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  className={cn(
                    "transition-colors pointer-events-none",
                    isExamined && "animate-pulse",
                  )}
                />

                {/* Weight Label Pill at Midpoint */}
                <g
                  transform={`translate(${midX}, ${midY})`}
                  className="cursor-pointer"
                  onClick={(e) => handleEdgeClick(e, edge)}
                >
                  <rect
                    x="-15"
                    y="-10"
                    width="30"
                    height="20"
                    rx="5"
                    ry="5"
                    fill="var(--color-card)"
                    stroke={
                      isPathEdge
                        ? "var(--color-chart-3)"
                        : isExamined
                          ? "var(--color-primary)"
                          : isSelected
                            ? "var(--color-foreground)"
                            : "var(--color-border)"
                    }
                    strokeWidth={isSelected || isPathEdge || isExamined ? "2" : "1.5"}
                    filter="url(#canvas-pill-shadow)"
                    className="transition-colors"
                  />
                  <text
                    x="0"
                    y="0.5"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontFamily="var(--font-mono)"
                    fontSize="11"
                    fontWeight="700"
                    fill={
                      isPathEdge
                        ? "var(--color-chart-3)"
                        : isExamined
                          ? "var(--color-primary)"
                          : isSelected
                            ? "var(--color-foreground)"
                            : "var(--color-foreground)"
                    }
                  >
                    {edge.w}
                  </text>
                </g>

                {/* Examined Edge Inspection Pill */}
                {isExamined && (
                  <g
                    transform={`translate(${midX}, ${midY - 18})`}
                    className="pointer-events-none"
                  >
                    <rect
                      x="-48"
                      y="-11"
                      width="96"
                      height="22"
                      rx="6"
                      fill="var(--color-popover)"
                      stroke="var(--color-primary)"
                      strokeWidth="1.5"
                      className="shadow-md"
                    />
                    <text
                      x="0"
                      y="1"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="10"
                      fontWeight="600"
                      fill="var(--color-popover-foreground)"
                      fontFamily="var(--font-mono)"
                    >
                      examining {na.label} ↔ {nb.label}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </g>

        {/* Dynamic Connect Preview Line */}
        {connectSourceId && sourceNode && cursorPos && (
          <line
            x1={sourceNode.x}
            y1={sourceNode.y}
            x2={cursorPos.x}
            y2={cursorPos.y}
            stroke="var(--color-primary)"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            className="pointer-events-none animate-pulse"
          />
        )}

        {/* 2. NODES */}
        <g id="nodes-layer">
          {graph.nodes.map((node) => {
            const effectiveSourceId =
              sourceId !== undefined ? sourceId : state.sourceId;
            const effectiveGoalId =
              goalId !== undefined ? goalId : state.goalId;
            const isSource = node.id === effectiveSourceId;
            const isGoal = node.id === effectiveGoalId;
            const isSelected =
              state.selection?.type === "node" && state.selection.id === node.id;
            const isConnectSource = node.id === connectSourceId;
            const nodeState = nodeStates[node.id];

            let fillColor = "var(--color-card)";
            let strokeColor = "var(--color-border)";
            let strokeWidth = 2.5;
            let strokeDasharray: string | undefined = undefined;
            let textColor = "var(--color-foreground)";

            if (nodeState === "current") {
              fillColor = "var(--color-primary)";
              strokeColor = "var(--color-primary)";
              strokeWidth = 3.5;
              textColor = "var(--color-primary-foreground)";
            } else if (nodeState === "processed") {
              fillColor = "oklch(from var(--color-primary) l c h / 0.15)";
              strokeColor = "var(--color-primary)";
              strokeWidth = 2.5;
              textColor = "var(--color-primary)";
            } else if (nodeState === "frontier") {
              fillColor = "var(--color-card)";
              strokeColor = "var(--color-primary)";
              strokeWidth = 2.5;
              strokeDasharray = "4 3";
              textColor = "var(--color-foreground)";
            } else if (nodeState === "discovered") {
              fillColor = "var(--color-card)";
              strokeColor = "var(--color-primary)";
              strokeWidth = 3;
              textColor = "var(--color-foreground)";
            } else if (nodeState === "unvisited") {
              fillColor = "var(--color-muted)";
              strokeColor = "var(--color-border)";
              strokeWidth = 2;
              textColor = "var(--color-muted-foreground)";
            } else {
              // Default view without active nodeStates
              if (isSource) {
                fillColor = "var(--color-primary)";
                strokeColor = "var(--color-primary)";
                textColor = "var(--color-primary-foreground)";
              } else if (isGoal) {
                fillColor = "var(--color-chart-3)";
                strokeColor = "var(--color-chart-3)";
                textColor = "var(--color-primary-foreground)";
              }
            }

            return (
              <g
                key={node.id}
                className={cn(
                  "cursor-pointer select-none",
                  draggingNodeId === node.id && "cursor-grabbing",
                )}
                onMouseDown={(e) => handleNodeMouseDown(e, node)}
              >
                {/* Selected-node highlight: centered on node cx/cy (r = nodeRadius + 7 = 29), no CSS transitions or transforms */}
                {(isSelected || isConnectSource) && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="29"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="2"
                    strokeDasharray="4 3"
                    className="pointer-events-none"
                  />
                )}

                {/* Current Node Halo: static SVG circle at node cx/cy */}
                {nodeState === "current" && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="26"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="2"
                    opacity="0.6"
                    className="pointer-events-none"
                  />
                )}

                {/* Main Node Body */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="22"
                  fill={fillColor}
                  stroke={isSelected ? "var(--color-primary)" : strokeColor}
                  strokeWidth={isSelected ? 4 : strokeWidth}
                  strokeDasharray={strokeDasharray}
                  className="transition-colors shadow-sm"
                />

                {/* Node Label (Font Mono) */}
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontFamily="var(--font-mono)"
                  fontSize="15"
                  fontWeight="700"
                  fill={textColor}
                  className="pointer-events-none"
                >
                  {node.label}
                </text>

                {/* START / GOAL Tag */}
                {isSource && (
                  <g
                    transform={`translate(${node.x}, ${node.y - 35})`}
                    className="pointer-events-none"
                  >
                    <rect
                      x="-22"
                      y="-9"
                      width="44"
                      height="18"
                      rx="4"
                      ry="4"
                      fill="var(--color-primary)"
                      filter="url(#canvas-badge-shadow)"
                    />
                    <polygon
                      points="-4,9 4,9 0,13"
                      fill="var(--color-primary)"
                    />
                    <text
                      x="0"
                      y="1"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontFamily="var(--font-mono)"
                      fontSize="9"
                      fontWeight="800"
                      fill="var(--color-primary-foreground)"
                      letterSpacing="0.06em"
                    >
                      START
                    </text>
                  </g>
                )}

                {isGoal && (
                  <g
                    transform={`translate(${node.x}, ${node.y - 35})`}
                    className="pointer-events-none"
                  >
                    <rect
                      x="-20"
                      y="-9"
                      width="40"
                      height="18"
                      rx="4"
                      ry="4"
                      fill="var(--color-chart-3)"
                      filter="url(#canvas-badge-shadow)"
                    />
                    <polygon
                      points="-4,9 4,9 0,13"
                      fill="var(--color-chart-3)"
                    />
                    <text
                      x="0"
                      y="1"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontFamily="var(--font-mono)"
                      fontSize="9"
                      fontWeight="800"
                      fill="var(--color-primary-foreground)"
                      letterSpacing="0.06em"
                    >
                      GOAL
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </g>

        {/* 3. OVERLAYS (Rover, Animation paths, etc.) */}
        {children}
      </svg>

      {/* State Legend (Bottom-Left) */}
      {showLegend && (
        <div className="shadow-sm rounded-md bg-card/90 backdrop-blur-xs text-xs border border-border flex absolute bottom-4 left-4 px-3.5 py-2 flex-wrap items-center gap-3.5 pointer-events-none z-10">
          <span className="font-semibold text-foreground text-[11px] tracking-wide uppercase">
            State legend
          </span>
          <span className="text-muted-foreground flex items-center gap-1.5 text-[11px]">
            <i className="rounded-full bg-muted border border-border size-2.5 inline-block" />
            Unvisited
          </span>
          <span className="text-muted-foreground flex items-center gap-1.5 text-[11px]">
            <i className="rounded-full bg-card border-2 border-primary size-2.5 inline-block" />
            Discovered
          </span>
          <span className="text-muted-foreground flex items-center gap-1.5 text-[11px]">
            <i className="rounded-full bg-card border border-dashed border-primary size-2.5 inline-block" />
            Frontier
          </span>
          <span className="text-muted-foreground flex items-center gap-1.5 text-[11px]">
            <i className="ring-2 ring-primary rounded-full bg-primary/40 size-2.5 inline-block" />
            Current
          </span>
          <span className="text-muted-foreground flex items-center gap-1.5 text-[11px]">
            <i className="rounded-full bg-primary/20 border border-primary size-2.5 inline-block" />
            Processed
          </span>
          <span className="text-muted-foreground flex items-center gap-1.5 text-[11px]">
            <i className="bg-chart-3 w-3.5 h-1 rounded-full inline-block" />
            Final path
          </span>
        </div>
      )}

      {/* Inline Edge Weight Input Overlay */}
      {editingEdgeId && (
        (() => {
          const edge = graph.edges.find((e) => e.id === editingEdgeId);
          if (!edge) return null;
          const na = nodeMap.get(edge.a);
          const nb = nodeMap.get(edge.b);
          if (!na || !nb) return null;

          const midXPercent = ((na.x + nb.x) / 2 / 1000) * 100;
          const midYPercent = ((na.y + nb.y) / 2 / 720) * 100;

          return (
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 bg-popover text-popover-foreground border border-primary shadow-lg rounded-md p-2 flex items-center gap-1.5 z-30"
              style={{
                left: `${midXPercent}%`,
                top: `${midYPercent}%`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="font-mono text-xs text-muted-foreground">W:</span>
              <input
                ref={weightInputRef}
                type="number"
                min="1"
                max="99"
                value={editWeightVal}
                onChange={(e) => setEditWeightVal(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCommitWeight(edge.id);
                  } else if (e.key === "Escape") {
                    setEditingEdgeId(null);
                  }
                }}
                className="w-14 h-7 text-xs font-mono font-bold bg-background text-foreground border border-input rounded px-1.5 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="button"
                className="h-7 px-2 text-xs font-semibold bg-primary text-primary-foreground rounded hover:bg-primary/90"
                onClick={() => handleCommitWeight(edge.id)}
              >
                Save
              </button>
            </div>
          );
        })()
      )}
    </div>
  );
}

export default GraphCanvas;
