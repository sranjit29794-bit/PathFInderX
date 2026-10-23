export interface GNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface GEdge {
  id: string;
  a: string;
  b: string;
  w: number;
}

export interface Graph {
  nodes: GNode[];
  edges: GEdge[];
}

export interface Neighbor {
  to: string;
  w: number;
  edgeId: string;
}

/**
 * Returns outgoing neighbors and edge weights for an undirected graph
 */
export function neighbors(graph: Graph, id: string): Neighbor[] {
  const result: Neighbor[] = [];
  for (const e of graph.edges) {
    if (e.a === id) {
      result.push({ to: e.b, w: e.w, edgeId: e.id });
    } else if (e.b === id) {
      result.push({ to: e.a, w: e.w, edgeId: e.id });
    }
  }
  return result;
}

/**
 * Adds a node to the graph if id doesn't already exist
 */
export function addNode(graph: Graph, node: GNode): Graph {
  if (graph.nodes.some((n) => n.id === node.id)) {
    return graph;
  }
  return {
    ...graph,
    nodes: [...graph.nodes, node],
  };
}

/**
 * Moves a node to new canvas coordinates
 */
export function moveNode(graph: Graph, id: string, x: number, y: number): Graph {
  return {
    ...graph,
    nodes: graph.nodes.map((n) => (n.id === id ? { ...n, x, y } : n)),
  };
}

/**
 * Adds an undirected edge between a and b.
 * Rejects self-loops and duplicate edges.
 * Weight defaults to 1 and is clamped >= 1.
 */
export function addEdge(graph: Graph, a: string, b: string, w = 1): Graph {
  if (a === b) return graph;
  // Check if edge already exists in either direction
  const exists = graph.edges.some(
    (e) => (e.a === a && e.b === b) || (e.a === b && e.b === a),
  );
  if (exists) return graph;

  const validW = Math.max(1, Math.round(w));
  const newEdge: GEdge = {
    id: `e-${a}-${b}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    a,
    b,
    w: validW,
  };
  return {
    ...graph,
    edges: [...graph.edges, newEdge],
  };
}

/**
 * Removes a node and all incident edges
 */
export function removeNode(graph: Graph, id: string): Graph {
  return {
    nodes: graph.nodes.filter((n) => n.id !== id),
    edges: graph.edges.filter((e) => e.a !== id && e.b !== id),
  };
}

/**
 * Removes an edge by its id
 */
export function removeEdge(graph: Graph, id: string): Graph {
  return {
    ...graph,
    edges: graph.edges.filter((e) => e.id !== id),
  };
}

/**
 * Sets integer weight for an edge (minimum 1)
 */
export function setWeight(graph: Graph, id: string, w: number): Graph {
  if (typeof w !== "number" || isNaN(w) || !isFinite(w) || w < 1) {
    return graph; // reject, keep previous value
  }
  const validW = Math.round(w);
  return {
    ...graph,
    edges: graph.edges.map((e) => (e.id === id ? { ...e, w: validW } : e)),
  };
}

/**
 * Computes the next natural alphabet label (A..Z, AA..ZZ)
 */
export function getNextLabel(nodes: GNode[]): string {
  const existingLabels = new Set(nodes.map((n) => n.label));
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Check 1-letter labels
  for (let i = 0; i < letters.length; i++) {
    const l = letters[i];
    if (!existingLabels.has(l)) return l;
  }
  // Check 2-letter labels
  for (let i = 0; i < letters.length; i++) {
    for (let j = 0; j < letters.length; j++) {
      const l = `${letters[i]}${letters[j]}`;
      if (!existingLabels.has(l)) return l;
    }
  }
  return `N${nodes.length + 1}`;
}

/**
 * Calculates graph topology metrics
 */
export function getGraphStats(graph: Graph) {
  const n = graph.nodes.length;
  const m = graph.edges.length;
  const maxEdges = n > 1 ? (n * (n - 1)) / 2 : 1;
  const densityPercent = n > 1 ? Math.min(100, Math.round((m / maxEdges) * 100)) : 0;
  const isWeighted = graph.edges.some((e) => e.w > 1);

  return {
    nodeCount: n,
    edgeCount: m,
    densityPercent,
    isWeighted,
    topology: "Undirected" as const,
  };
}

/**
 * Calculates real sum of edge weights along a path
 */
export function calculatePathWeight(
  graph: Graph,
  path: string[] | null,
): number | null {
  if (!path || path.length === 0) return null;
  if (path.length === 1) return 0;

  let totalWeight = 0;
  for (let i = 0; i < path.length - 1; i++) {
    const u = path[i];
    const v = path[i + 1];
    const edge = graph.edges.find(
      (e) => (e.a === u && e.b === v) || (e.a === v && e.b === u),
    );
    if (!edge) return null; // Path breaks
    totalWeight += edge.w;
  }
  return totalWeight;
}

/* =========================================================================
   PRESETS (viewBox: 0 0 1000 720)
========================================================================= */

// Seeded PRNG for deterministic random graphs
function createPrng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function () {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export type PresetKey = "weighted" | "small" | "maze" | "dense" | "random";

export interface PresetData {
  key: PresetKey;
  name: string;
  sourceId: string;
  goalId: string;
  graph: Graph;
}

export const PRESETS: Record<PresetKey, PresetData> = {
  weighted: {
    key: "weighted",
    name: "Weighted route / 13 nodes",
    sourceId: "node-A",
    goalId: "node-M",
    graph: {
      nodes: [
        { id: "node-A", label: "A", x: 90, y: 360 },
        { id: "node-B", label: "B", x: 240, y: 170 },
        { id: "node-C", label: "C", x: 420, y: 150 },
        { id: "node-D", label: "D", x: 320, y: 360 },
        { id: "node-E", label: "E", x: 550, y: 360 },
        { id: "node-F", label: "F", x: 740, y: 360 },
        { id: "node-G", label: "G", x: 240, y: 550 },
        { id: "node-H", label: "H", x: 420, y: 570 },
        { id: "node-I", label: "I", x: 620, y: 160 },
        { id: "node-J", label: "J", x: 800, y: 200 },
        { id: "node-K", label: "K", x: 620, y: 560 },
        { id: "node-L", label: "L", x: 800, y: 520 },
        { id: "node-M", label: "M", x: 920, y: 360 },
      ],
      edges: [
        // Upper light-weight path: cost = 2+2+3+3+2 = 12 (5 hops)
        { id: "e-A-B", a: "node-A", b: "node-B", w: 2 },
        { id: "e-B-C", a: "node-B", b: "node-C", w: 2 },
        { id: "e-C-I", a: "node-C", b: "node-I", w: 3 },
        { id: "e-I-J", a: "node-I", b: "node-J", w: 3 },
        { id: "e-J-M", a: "node-J", b: "node-M", w: 2 },

        // Direct middle path: heavy weights = 10+10+10 = 30 (3 hops)
        // BFS takes A -> D -> E -> M (3 hops, cost 30).
        // Dijkstra takes A -> B -> C -> I -> J -> M (5 hops, cost 12).
        { id: "e-A-D", a: "node-A", b: "node-D", w: 10 },
        { id: "e-D-E", a: "node-D", b: "node-E", w: 10 },
        { id: "e-E-M", a: "node-E", b: "node-M", w: 10 },

        // Lower path (cost = 4+4+5+4+4 = 21, 5 hops)
        { id: "e-A-G", a: "node-A", b: "node-G", w: 4 },
        { id: "e-G-H", a: "node-G", b: "node-H", w: 4 },
        { id: "e-H-K", a: "node-H", b: "node-K", w: 5 },
        { id: "e-K-L", a: "node-K", b: "node-L", w: 4 },
        { id: "e-L-M", a: "node-L", b: "node-M", w: 4 },

        // Cross connections with higher weights
        { id: "e-B-D", a: "node-B", b: "node-D", w: 8 },
        { id: "e-C-E", a: "node-C", b: "node-E", w: 7 },
        { id: "e-G-D", a: "node-G", b: "node-D", w: 8 },
        { id: "e-H-E", a: "node-H", b: "node-E", w: 7 },
        { id: "e-I-F", a: "node-I", b: "node-F", w: 9 },
        { id: "e-K-F", a: "node-K", b: "node-F", w: 9 },
        { id: "e-E-F", a: "node-E", b: "node-F", w: 8 },
      ],
    },
  },

  small: {
    key: "small",
    name: "Small example / 6 nodes",
    sourceId: "node-A",
    goalId: "node-F",
    graph: {
      nodes: [
        { id: "node-A", label: "A", x: 150, y: 360 },
        { id: "node-B", label: "B", x: 380, y: 180 },
        { id: "node-C", label: "C", x: 380, y: 540 },
        { id: "node-D", label: "D", x: 620, y: 180 },
        { id: "node-E", label: "E", x: 620, y: 540 },
        { id: "node-F", label: "F", x: 850, y: 360 },
      ],
      edges: [
        { id: "e-A-B", a: "node-A", b: "node-B", w: 4 },
        { id: "e-A-C", a: "node-A", b: "node-C", w: 2 },
        { id: "e-B-C", a: "node-B", b: "node-C", w: 1 },
        { id: "e-B-D", a: "node-B", b: "node-D", w: 5 },
        { id: "e-C-E", a: "node-C", b: "node-E", w: 8 },
        { id: "e-D-E", a: "node-D", b: "node-E", w: 2 },
        { id: "e-D-F", a: "node-D", b: "node-F", w: 6 },
        { id: "e-E-F", a: "node-E", b: "node-F", w: 3 },
      ],
    },
  },

  maze: {
    key: "maze",
    name: "Maze-like corridor / 10 nodes",
    sourceId: "node-A",
    goalId: "node-J",
    graph: {
      nodes: [
        { id: "node-A", label: "A", x: 120, y: 180 },
        { id: "node-B", label: "B", x: 320, y: 180 },
        { id: "node-C", label: "C", x: 520, y: 180 },
        { id: "node-D", label: "D", x: 720, y: 180 },
        { id: "node-E", label: "E", x: 880, y: 180 },
        { id: "node-F", label: "F", x: 880, y: 500 },
        { id: "node-G", label: "G", x: 680, y: 500 },
        { id: "node-H", label: "H", x: 480, y: 500 },
        { id: "node-I", label: "I", x: 280, y: 500 },
        { id: "node-J", label: "J", x: 120, y: 500 },
      ],
      edges: [
        { id: "e-A-B", a: "node-A", b: "node-B", w: 2 },
        { id: "e-B-C", a: "node-B", b: "node-C", w: 2 },
        { id: "e-C-D", a: "node-C", b: "node-D", w: 2 },
        { id: "e-D-E", a: "node-D", b: "node-E", w: 2 },
        { id: "e-E-F", a: "node-E", b: "node-F", w: 3 },
        { id: "e-F-G", a: "node-F", b: "node-G", w: 2 },
        { id: "e-G-H", a: "node-G", b: "node-H", w: 2 },
        { id: "e-H-I", a: "node-H", b: "node-I", w: 2 },
        { id: "e-I-J", a: "node-I", b: "node-J", w: 2 },
        // Shortcut wall with high resistance
        { id: "e-C-H", a: "node-C", b: "node-H", w: 15 },
        { id: "e-B-I", a: "node-B", b: "node-I", w: 12 },
      ],
    },
  },

  dense: {
    key: "dense",
    name: "Dense mesh / 8 nodes",
    sourceId: "node-A",
    goalId: "node-H",
    graph: {
      nodes: [
        { id: "node-A", label: "A", x: 150, y: 360 },
        { id: "node-B", label: "B", x: 320, y: 180 },
        { id: "node-C", label: "C", x: 320, y: 540 },
        { id: "node-D", label: "D", x: 500, y: 240 },
        { id: "node-E", label: "E", x: 500, y: 480 },
        { id: "node-F", label: "F", x: 680, y: 180 },
        { id: "node-G", label: "G", x: 680, y: 540 },
        { id: "node-H", label: "H", x: 850, y: 360 },
      ],
      edges: [
        { id: "e-A-B", a: "node-A", b: "node-B", w: 3 },
        { id: "e-A-C", a: "node-A", b: "node-C", w: 4 },
        { id: "e-B-C", a: "node-B", b: "node-C", w: 2 },
        { id: "e-B-D", a: "node-B", b: "node-D", w: 5 },
        { id: "e-C-E", a: "node-C", b: "node-E", w: 3 },
        { id: "e-D-E", a: "node-D", b: "node-E", w: 1 },
        { id: "e-B-E", a: "node-B", b: "node-E", w: 6 },
        { id: "e-C-D", a: "node-C", b: "node-D", w: 5 },
        { id: "e-D-F", a: "node-D", b: "node-F", w: 4 },
        { id: "e-E-G", a: "node-E", b: "node-G", w: 2 },
        { id: "e-F-G", a: "node-F", b: "node-G", w: 3 },
        { id: "e-D-G", a: "node-D", b: "node-G", w: 4 },
        { id: "e-E-F", a: "node-E", b: "node-F", w: 5 },
        { id: "e-F-H", a: "node-F", b: "node-H", w: 2 },
        { id: "e-G-H", a: "node-G", b: "node-H", w: 3 },
      ],
    },
  },

  random: {
    key: "random",
    name: "Seeded random / 9 nodes",
    sourceId: "node-A",
    goalId: "node-I",
    graph: generateSeededRandomGraph(42),
  },
};

export function generateSeededRandomGraph(seed = 42): Graph {
  const rand = createPrng(seed);
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
  const nodes: GNode[] = [];

  // Arrange in 3 tiers from left to right
  const cols = [
    [0, 1],
    [2, 3, 4],
    [5, 6, 7],
    [8],
  ];

  let letterIdx = 0;
  for (let c = 0; c < cols.length; c++) {
    const colCount = cols[c].length;
    const xBase = 120 + c * 250 + Math.floor(rand() * 40 - 20);
    for (let r = 0; r < colCount; r++) {
      const yStep = 600 / (colCount + 1);
      const yBase = yStep * (r + 1) + Math.floor(rand() * 40 - 20);
      nodes.push({
        id: `node-${letters[letterIdx]}`,
        label: letters[letterIdx],
        x: Math.round(xBase),
        y: Math.round(yBase),
      });
      letterIdx++;
    }
  }

  const edges: GEdge[] = [];
  // Connect backbone
  for (let i = 0; i < nodes.length - 1; i++) {
    const w = 1 + Math.floor(rand() * 8);
    edges.push({
      id: `e-rnd-${nodes[i].label}-${nodes[i + 1].label}`,
      a: nodes[i].id,
      b: nodes[i + 1].id,
      w,
    });
  }

  // Add a few cross edges
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 2; j < nodes.length; j++) {
      if (rand() > 0.65) {
        const w = 1 + Math.floor(rand() * 9);
        edges.push({
          id: `e-rnd-${nodes[i].label}-${nodes[j].label}`,
          a: nodes[i].id,
          b: nodes[j].id,
          w,
        });
      }
    }
  }

  return { nodes, edges };
}
