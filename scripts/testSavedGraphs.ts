import {
  saveGraph,
  listGraphs,
  getGraph,
  renameGraph,
  deleteGraph,
  exportGraphJson,
  importGraphJson,
  saveDraft,
  loadDraft,
} from "../src/lib/savedGraphs";

const storage = new Map<string, string>();
(globalThis as unknown as { window: unknown }).window = {
  localStorage: {
    getItem: (k: string) => storage.get(k) ?? null,
    setItem: (k: string, v: string) => storage.set(k, v),
    removeItem: (k: string) => storage.delete(k),
  },
};

console.log("Starting savedGraphs test suite...");

// 1. Initial list empty
if (listGraphs().length !== 0) throw new Error("Initial list should be empty");

// 2. Save graph 1
const g1 = {
  nodes: [
    { id: "n1", label: "A", x: 100, y: 100 },
    { id: "n2", label: "B", x: 200, y: 200 },
  ],
  edges: [{ id: "e1", a: "n1", b: "n2", w: 5 }],
};
const saved1 = saveGraph("Test 1", g1, "n1", "n2");
if (saved1.name !== "Test 1") throw new Error("Saved graph name mismatch");
if (listGraphs().length !== 1) throw new Error("Expected 1 graph");

// 3. Save graph 2 (Test 2)
const g2 = {
  nodes: [
    { id: "n1", label: "A", x: 100, y: 100 },
    { id: "n2", label: "B", x: 200, y: 200 },
    { id: "n3", label: "C", x: 300, y: 300 },
  ],
  edges: [
    { id: "e1", a: "n1", b: "n2", w: 5 },
    { id: "e2", a: "n2", b: "n3", w: 2 },
  ],
};
const saved2 = saveGraph("Test 2", g2, "n1", "n3");
if (listGraphs().length !== 2) throw new Error("Expected 2 graphs");

// 4. Overwrite saved 1
const saved1Updated = saveGraph("Test 1 Updated", g1, "n2", "n1", saved1.id);
if (saved1Updated.id !== saved1.id) throw new Error("ID must be stable on overwrite");
if (saved1Updated.name !== "Test 1 Updated") throw new Error("Name must be updated");
if (listGraphs().length !== 2) throw new Error("List count must remain 2");

// 5. Rename
const renamed = renameGraph(saved2.id, "Test 2 Renamed");
if (renamed?.name !== "Test 2 Renamed") throw new Error("Rename failed");

// 6. Export and Import JSON
const exported = exportGraphJson(saved2);
const importSuccess = importGraphJson(exported);
if (!importSuccess.success) throw new Error("Import valid JSON failed");

// 7. Malformed JSON rejection
const badJsonRes = importGraphJson("{ bad json ");
if (badJsonRes.success) throw new Error("Malformed JSON must fail");
console.log("Malformed JSON rejected:", badJsonRes.error);

// 8. Invalid node reference in edges rejection
const invalidEdgeJson = JSON.stringify({
  graph: {
    nodes: [{ id: "n1", label: "A", x: 10, y: 10 }],
    edges: [{ id: "e1", a: "n1", b: "unknown_node", w: 2 }],
  },
});
const invalidEdgeRes = importGraphJson(invalidEdgeJson);
if (invalidEdgeRes.success) throw new Error("Invalid edge must fail");
console.log("Invalid edge reference rejected:", invalidEdgeRes.error);

// 9. Invalid weight (< 1 or non-integer) rejection
const invalidWeightJson = JSON.stringify({
  graph: {
    nodes: [
      { id: "n1", label: "A", x: 10, y: 10 },
      { id: "n2", label: "B", x: 20, y: 20 },
    ],
    edges: [{ id: "e1", a: "n1", b: "n2", w: 0 }],
  },
});
const invalidWeightRes = importGraphJson(invalidWeightJson);
if (invalidWeightRes.success) throw new Error("Zero weight must fail");
console.log("Invalid weight rejected:", invalidWeightRes.error);

// 10. Delete graph
const delRes = deleteGraph(saved1.id);
if (!delRes) throw new Error("Delete failed");
if (listGraphs().length !== 1) throw new Error("Expected 1 graph after delete");
if (getGraph(saved1.id) !== null) throw new Error("Deleted graph still found");

// 11. Draft autosave and load
saveDraft({ graph: g1, sourceId: "n1", goalId: "n2", activeSavedId: saved2.id });
const draftLoaded = loadDraft();
if (draftLoaded?.sourceId !== "n1") throw new Error("Draft sourceId mismatch");
if (draftLoaded?.activeSavedId !== saved2.id) throw new Error("Draft activeSavedId mismatch");

console.log("SUCCESS: All savedGraphs test scenarios passed cleanly!");
