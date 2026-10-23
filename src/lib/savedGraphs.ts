import { type Graph, type GNode, type GEdge } from "@/lib/graph";

export interface SavedGraph {
  id: string;
  name: string;
  graph: Graph;
  sourceId: string | null;
  goalId: string | null;
  createdAt: number;
  updatedAt: number;
}

export interface DraftState {
  graph: Graph;
  sourceId: string | null;
  goalId: string | null;
  activeSavedId: string | null;
}

export const SAVED_GRAPHS_STORAGE_KEY = "pathfinder.savedGraphs.v1";
export const DRAFT_STORAGE_KEY = "pathfinder.draft.v1";

/**
 * Safely deep copies an object so that stored graphs cannot be mutated.
 */
export function deepCopy<T>(obj: T): T {
  try {
    if (typeof structuredClone === "function") {
      return structuredClone(obj);
    }
  } catch {
    // fallback
  }
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Lists all saved graphs from localStorage.
 * Always safe; returns empty array if missing or on error.
 */
export function listGraphs(): SavedGraph[] {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return [];
    }
    const raw = window.localStorage.getItem(SAVED_GRAPHS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item) => deepCopy(item));
  } catch (err) {
    console.warn("Failed to load saved graphs:", err);
    return [];
  }
}

/**
 * Retrieves a single saved graph by ID.
 */
export function getGraph(id: string): SavedGraph | null {
  const all = listGraphs();
  const found = all.find((g) => g.id === id);
  return found ? deepCopy(found) : null;
}

/**
 * Saves a graph to localStorage (creates new or overwrites existing).
 */
export function saveGraph(
  name: string,
  graph: Graph,
  sourceId: string | null,
  goalId: string | null,
  existingId?: string,
): SavedGraph {
  const all = listGraphs();
  const trimmedName = name.trim().slice(0, 40) || "Untitled Graph";
  const now = Date.now();

  let targetId = existingId;
  const existingIndex = targetId ? all.findIndex((g) => g.id === targetId) : -1;

  let savedItem: SavedGraph;

  if (existingIndex >= 0 && targetId) {
    const prev = all[existingIndex];
    savedItem = {
      id: targetId,
      name: trimmedName,
      graph: deepCopy(graph),
      sourceId,
      goalId,
      createdAt: prev.createdAt || now,
      updatedAt: now,
    };
    all[existingIndex] = savedItem;
  } else {
    targetId = `graph-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    savedItem = {
      id: targetId,
      name: trimmedName,
      graph: deepCopy(graph),
      sourceId,
      goalId,
      createdAt: now,
      updatedAt: now,
    };
    all.unshift(savedItem);
  }

  try {
    if (typeof window === "undefined" || !window.localStorage) {
      throw new Error("Browser storage is disabled or unavailable.");
    }
    window.localStorage.setItem(SAVED_GRAPHS_STORAGE_KEY, JSON.stringify(all));
  } catch (err) {
    console.error("Failed to write saved graph to localStorage:", err);
    throw new Error(
      "Browser storage is disabled or blocked. Please enable localStorage in browser settings to save graphs.",
    );
  }

  return deepCopy(savedItem);
}

/**
 * Renames an existing saved graph.
 */
export function renameGraph(id: string, name: string): SavedGraph | null {
  const all = listGraphs();
  const index = all.findIndex((g) => g.id === id);
  if (index === -1) return null;

  const trimmedName = name.trim().slice(0, 40) || "Untitled Graph";
  const updated: SavedGraph = {
    ...all[index],
    name: trimmedName,
    updatedAt: Date.now(),
  };

  all[index] = updated;

  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(SAVED_GRAPHS_STORAGE_KEY, JSON.stringify(all));
    }
  } catch (err) {
    console.error("Failed to update graph name in localStorage:", err);
  }

  return deepCopy(updated);
}

/**
 * Deletes a saved graph by ID.
 */
export function deleteGraph(id: string): boolean {
  const all = listGraphs();
  const filtered = all.filter((g) => g.id !== id);
  if (filtered.length === all.length) return false;

  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(SAVED_GRAPHS_STORAGE_KEY, JSON.stringify(filtered));
    }
  } catch (err) {
    console.error("Failed to delete graph from localStorage:", err);
  }

  return true;
}

/**
 * Formats a saved graph as a JSON string for export.
 */
export function exportGraphJson(saved: SavedGraph): string {
  return JSON.stringify(saved, null, 2);
}

export type ImportResult =
  | { success: true; data: SavedGraph }
  | { success: false; error: string };

/**
 * Validates and imports a graph from JSON text.
 * Rejects invalid files with a readable error.
 */
export function importGraphJson(text: string): ImportResult {
  if (!text || typeof text !== "string" || !text.trim()) {
    return { success: false, error: "The provided file is empty." };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { success: false, error: "Invalid JSON format. Check file syntax." };
  }

  if (!parsed || typeof parsed !== "object") {
    return { success: false, error: "Root JSON value must be an object." };
  }

  const rawObj = parsed as Record<string, unknown>;

  // Determine graph container
  let rawGraph: unknown;
  if ("graph" in rawObj && typeof rawObj.graph === "object" && rawObj.graph !== null) {
    rawGraph = rawObj.graph;
  } else if ("nodes" in rawObj && "edges" in rawObj) {
    rawGraph = rawObj;
  } else {
    return {
      success: false,
      error: "Missing required 'graph' or 'nodes' and 'edges' properties.",
    };
  }

  const graphObj = rawGraph as Record<string, unknown>;
  if (!Array.isArray(graphObj.nodes)) {
    return { success: false, error: "'nodes' must be an array of vertex objects." };
  }
  if (!Array.isArray(graphObj.edges)) {
    return { success: false, error: "'edges' must be an array of edge objects." };
  }

  // Validate nodes
  const nodeIds = new Set<string>();
  const validatedNodes: GNode[] = [];

  for (let i = 0; i < graphObj.nodes.length; i++) {
    const n = graphObj.nodes[i];
    if (!n || typeof n !== "object") {
      return { success: false, error: `Node at index ${i} is not a valid object.` };
    }
    const nodeItem = n as Record<string, unknown>;

    if (typeof nodeItem.id !== "string" || !nodeItem.id.trim()) {
      return { success: false, error: `Node at index ${i} has an invalid or missing 'id'.` };
    }
    if (nodeIds.has(nodeItem.id)) {
      return { success: false, error: `Duplicate node ID '${nodeItem.id}' found.` };
    }
    if (typeof nodeItem.label !== "string" || !nodeItem.label.trim()) {
      return { success: false, error: `Node '${nodeItem.id}' has an invalid or missing 'label'.` };
    }
    if (typeof nodeItem.x !== "number" || !Number.isFinite(nodeItem.x)) {
      return { success: false, error: `Node '${nodeItem.id}' has an invalid numeric 'x' coordinate.` };
    }
    if (typeof nodeItem.y !== "number" || !Number.isFinite(nodeItem.y)) {
      return { success: false, error: `Node '${nodeItem.id}' has an invalid numeric 'y' coordinate.` };
    }

    nodeIds.add(nodeItem.id);
    validatedNodes.push({
      id: nodeItem.id,
      label: nodeItem.label,
      x: nodeItem.x,
      y: nodeItem.y,
    });
  }

  // Validate edges
  const edgeIds = new Set<string>();
  const validatedEdges: GEdge[] = [];

  for (let i = 0; i < graphObj.edges.length; i++) {
    const e = graphObj.edges[i];
    if (!e || typeof e !== "object") {
      return { success: false, error: `Edge at index ${i} is not a valid object.` };
    }
    const edgeItem = e as Record<string, unknown>;

    if (typeof edgeItem.id !== "string" || !edgeItem.id.trim()) {
      return { success: false, error: `Edge at index ${i} has an invalid or missing 'id'.` };
    }
    if (edgeIds.has(edgeItem.id)) {
      return { success: false, error: `Duplicate edge ID '${edgeItem.id}' found.` };
    }
    if (typeof edgeItem.a !== "string" || !nodeIds.has(edgeItem.a)) {
      return {
        success: false,
        error: `Edge '${edgeItem.id}' references unknown source node '${String(edgeItem.a)}'.`,
      };
    }
    if (typeof edgeItem.b !== "string" || !nodeIds.has(edgeItem.b)) {
      return {
        success: false,
        error: `Edge '${edgeItem.id}' references unknown target node '${String(edgeItem.b)}'.`,
      };
    }
    if (
      typeof edgeItem.w !== "number" ||
      !Number.isInteger(edgeItem.w) ||
      edgeItem.w < 1
    ) {
      return {
        success: false,
        error: `Edge '${edgeItem.id}' weight must be an integer >= 1 (got ${String(edgeItem.w)}).`,
      };
    }

    edgeIds.add(edgeItem.id);
    validatedEdges.push({
      id: edgeItem.id,
      a: edgeItem.a,
      b: edgeItem.b,
      w: edgeItem.w,
    });
  }

  // Validate source and goal
  let sourceId: string | null = null;
  if (typeof rawObj.sourceId === "string" && nodeIds.has(rawObj.sourceId)) {
    sourceId = rawObj.sourceId;
  }

  let goalId: string | null = null;
  if (typeof rawObj.goalId === "string" && nodeIds.has(rawObj.goalId)) {
    goalId = rawObj.goalId;
  }

  // Derive name
  let name = "Imported Graph";
  if (typeof rawObj.name === "string" && rawObj.name.trim()) {
    name = rawObj.name.trim().slice(0, 40);
  }

  const now = Date.now();
  const newSavedGraph: SavedGraph = {
    id: `graph-${now.toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    name,
    graph: {
      nodes: validatedNodes,
      edges: validatedEdges,
    },
    sourceId,
    goalId,
    createdAt: typeof rawObj.createdAt === "number" ? rawObj.createdAt : now,
    updatedAt: now,
  };

  return { success: true, data: newSavedGraph };
}

/**
 * Saves current draft state to localStorage.
 */
export function saveDraft(draft: DraftState): void {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    }
  } catch (err) {
    console.warn("Failed to write draft to localStorage:", err);
  }
}

/**
 * Restores draft state from localStorage on startup.
 */
export function loadDraft(): DraftState | null {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return null;
    }
    const raw = window.localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;

    // Validate draft has valid graph
    if (!parsed.graph || !Array.isArray(parsed.graph.nodes) || !Array.isArray(parsed.graph.edges)) {
      return null;
    }

    return {
      graph: deepCopy(parsed.graph),
      sourceId: typeof parsed.sourceId === "string" ? parsed.sourceId : null,
      goalId: typeof parsed.goalId === "string" ? parsed.goalId : null,
      activeSavedId: typeof parsed.activeSavedId === "string" ? parsed.activeSavedId : null,
    };
  } catch (err) {
    console.warn("Failed to load draft from localStorage:", err);
    return null;
  }
}

/**
 * Clears draft from localStorage.
 */
export function clearDraft(): void {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.removeItem(DRAFT_STORAGE_KEY);
    }
  } catch (err) {
    console.warn("Failed to clear draft:", err);
  }
}

/**
 * Formats relative time (e.g. "just now", "5m ago", "2h ago", "3d ago").
 */
export function formatRelativeTime(timestamp: number): string {
  if (!timestamp) return "unknown";
  const diffSec = Math.floor((Date.now() - timestamp) / 1000);
  if (diffSec < 10) return "just now";
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}h ago`;
  const diffDays = Math.floor(diffHour / 24);
  return `${diffDays}d ago`;
}
