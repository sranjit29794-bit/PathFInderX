import * as React from "react";
import {
  FolderOpen,
  Plus,
  Trash2,
  Edit2,
  Download,
  Upload,
  Check,
  X,
  AlertTriangle,
  Clock,
  Sparkles,
  FileText,
  Search,
} from "lucide-react";
import {
  type SavedGraph,
  listGraphs,
  renameGraph,
  deleteGraph,
  exportGraphJson,
  importGraphJson,
  formatRelativeTime,
} from "@/lib/savedGraphs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SavedGraphsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeSavedId: string | null;
  onLoadGraph: (saved: SavedGraph) => void;
  onToast: (message: string, type?: "success" | "error" | "info") => void;
  onOpenSaveAs?: () => void;
}

export function SavedGraphsModal(props: SavedGraphsModalProps) {
  if (!props.isOpen) return null;
  return <SavedGraphsModalContent {...props} />;
}

function SavedGraphsModalContent({
  onClose,
  activeSavedId,
  onLoadGraph,
  onToast,
  onOpenSaveAs,
}: SavedGraphsModalProps) {
  const [graphs, setGraphs] = React.useState<SavedGraph[]>(() => listGraphs());
  const [searchQuery, setSearchQuery] = React.useState("");
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editingName, setEditingName] = React.useState("");
  const [confirmDeleteId, setConfirmDeleteId] = React.useState<string | null>(null);
  const [importError, setImportError] = React.useState<string | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  // Refresh saved graphs list
  const refreshList = React.useCallback(() => {
    setGraphs(listGraphs());
  }, []);

  const filteredGraphs = graphs.filter((g) =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase().trim()),
  );

  const handleStartRename = (g: SavedGraph) => {
    setEditingId(g.id);
    setEditingName(g.name);
    setConfirmDeleteId(null);
  };

  const handleCommitRename = (id: string) => {
    const trimmed = editingName.trim().slice(0, 40);
    if (!trimmed) {
      onToast("Graph name cannot be empty", "error");
      return;
    }
    const updated = renameGraph(id, trimmed);
    if (updated) {
      refreshList();
      setEditingId(null);
      onToast(`Renamed to "${updated.name}"`, "success");
    }
  };

  const handleDelete = (id: string, name: string) => {
    deleteGraph(id);
    refreshList();
    setConfirmDeleteId(null);
    onToast(`Deleted "${name}"`, "info");
  };

  const handleExport = (saved: SavedGraph) => {
    try {
      const jsonStr = exportGraphJson(saved);
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const safeName = saved.name.replace(/[^a-z0-9_-]/gi, "_").toLowerCase();
      a.href = url;
      a.download = `pathfinder_${safeName}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      onToast(`Exported "${saved.name}" as JSON`, "success");
    } catch (err) {
      console.error(err);
      onToast("Failed to export JSON", "error");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const res = importGraphJson(text);
      if (!res.success) {
        setImportError(res.error);
        onToast("Import failed: " + res.error, "error");
        return;
      }

      // Add to list by saving it
      const saved = res.data;
      // Write into storage
      const existing = listGraphs();
      existing.unshift(saved);
      try {
        window.localStorage.setItem("pathfinder.savedGraphs.v1", JSON.stringify(existing));
      } catch (writeErr) {
        console.error(writeErr);
      }

      refreshList();
      onToast(`Imported "${saved.name}" successfully`, "success");
    } catch {
      setImportError("Could not read file. Please ensure it is valid JSON.");
      onToast("Failed to read file", "error");
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="saved-graphs-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-card border border-border shadow-2xl rounded-xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <FolderOpen className="size-5" />
            </div>
            <div>
              <h2 id="saved-graphs-title" className="text-base font-bold text-foreground">
                My Graphs
              </h2>
              <p className="text-xs text-muted-foreground">
                Manage, load, export, and import your saved graph topologies
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button
              variant="outline"
              size="sm"
              className="text-xs gap-1.5 h-8 font-medium cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              title="Import a graph from a JSON file"
            >
              <Upload className="size-3.5" />
              Import JSON
            </Button>
            {onOpenSaveAs && (
              <Button
                variant="default"
                size="sm"
                className="text-xs gap-1.5 h-8 font-semibold cursor-pointer"
                onClick={() => {
                  onClose();
                  onOpenSaveAs();
                }}
              >
                <Plus className="size-3.5" />
                Save Current
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground hover:text-foreground cursor-pointer ml-1"
              onClick={onClose}
              title="Close modal"
            >
              <X className="size-4" />
            </Button>
          </div>
        </div>

        {/* Import Error Banner */}
        {importError && (
          <div className="px-6 py-2.5 bg-destructive/10 border-b border-destructive/20 text-destructive text-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-4 shrink-0" />
              <span>{importError}</span>
            </div>
            <button
              type="button"
              onClick={() => setImportError(null)}
              className="text-destructive/80 hover:text-destructive text-xs font-semibold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Search Bar */}
        <div className="px-6 pt-4 pb-2">
          <div className="relative">
            <Search className="size-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search saved graphs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background border border-input rounded-md pl-9 pr-3 py-1.5 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Graphs List */}
        <div className="flex-1 overflow-y-auto px-6 py-2 space-y-2.5 min-h-55">
          {graphs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
              <FileText className="size-10 stroke-[1.5] mb-2.5 opacity-40" />
              <p className="text-sm font-semibold text-foreground">No saved graphs yet</p>
              <p className="text-xs text-muted-foreground max-w-xs mt-1">
                Customize any graph in Studio and click <strong>"Save as..."</strong> to save it
                here for easy access.
              </p>
              {onOpenSaveAs && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 gap-1.5 text-xs cursor-pointer"
                  onClick={() => {
                    onClose();
                    onOpenSaveAs();
                  }}
                >
                  <Plus className="size-3.5" />
                  Save current graph now
                </Button>
              )}
            </div>
          ) : filteredGraphs.length === 0 ? (
            <div className="py-8 text-center text-xs text-muted-foreground">
              No saved graphs match "{searchQuery}".
            </div>
          ) : (
            filteredGraphs.map((g) => {
              const isActive = g.id === activeSavedId;
              const isEditing = editingId === g.id;
              const isDeleting = confirmDeleteId === g.id;

              return (
                <div
                  key={g.id}
                  className={`border rounded-lg p-3 transition-colors flex flex-col gap-2 ${
                    isActive
                      ? "border-primary/50 bg-primary/5"
                      : "border-border bg-card/60 hover:border-primary/30"
                  }`}
                >
                  {/* Row content */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      {isEditing ? (
                        <div className="flex items-center gap-1.5 max-w-sm">
                          <input
                            type="text"
                            maxLength={40}
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleCommitRename(g.id);
                              if (e.key === "Escape") setEditingId(null);
                            }}
                            autoFocus
                            className="text-xs font-semibold px-2 py-1 bg-background border border-primary rounded focus:outline-none flex-1"
                          />
                          <Button
                            variant="default"
                            size="icon"
                            className="size-7 shrink-0 cursor-pointer"
                            onClick={() => handleCommitRename(g.id)}
                            title="Save name"
                          >
                            <Check className="size-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7 shrink-0 cursor-pointer"
                            onClick={() => setEditingId(null)}
                            title="Cancel rename"
                          >
                            <X className="size-3.5" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-foreground truncate max-w-60">
                            {g.name}
                          </span>
                          {isActive && (
                            <Badge
                              variant="outline"
                              className="text-[10px] py-0 px-1.5 border-primary/40 text-primary font-bold uppercase tracking-wider bg-primary/10"
                            >
                              Active in Studio
                            </Badge>
                          )}
                        </div>
                      )}

                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-1">
                        <span>
                          {g.graph.nodes.length} nodes · {g.graph.edges.length} edges
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="size-3 opacity-60" />
                          {formatRelativeTime(g.updatedAt)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Button
                        variant={isActive ? "secondary" : "default"}
                        size="sm"
                        className="text-xs h-7 px-2.5 font-medium cursor-pointer"
                        onClick={() => onLoadGraph(g)}
                        title="Load this graph into Studio"
                      >
                        Load
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7 text-muted-foreground hover:text-foreground cursor-pointer"
                        onClick={() => handleStartRename(g)}
                        title="Rename graph"
                      >
                        <Edit2 className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7 text-muted-foreground hover:text-foreground cursor-pointer"
                        onClick={() => handleExport(g)}
                        title="Export JSON"
                      >
                        <Download className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7 text-muted-foreground hover:text-destructive cursor-pointer"
                        onClick={() => setConfirmDeleteId(g.id)}
                        title="Delete graph"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </div>

                  {/* Confirm Delete Banner */}
                  {isDeleting && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded p-2 mt-1 flex items-center justify-between gap-2 text-xs">
                      <span className="text-destructive font-medium">
                        Delete "{g.name}"? This cannot be undone.
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Button
                          variant="destructive"
                          size="sm"
                          className="h-6 px-2 text-xs cursor-pointer"
                          onClick={() => handleDelete(g.id, g.name)}
                        >
                          Confirm Delete
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs cursor-pointer"
                          onClick={() => setConfirmDeleteId(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-border bg-muted/10 flex items-center justify-between text-xs text-muted-foreground">
          <span>{graphs.length} saved graph{graphs.length === 1 ? "" : "s"} stored in browser</span>
          <Button variant="ghost" size="sm" className="h-7 text-xs cursor-pointer" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

interface SaveGraphModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  initialName?: string;
  isSaveAs?: boolean;
}

export function SaveGraphModal({
  isOpen,
  onClose,
  onSave,
  initialName = "",
  isSaveAs = false,
}: SaveGraphModalProps) {
  const [name, setName] = React.useState(initialName || "My Graph");

  const duplicateWarning = React.useMemo(() => {
    if (!isOpen) return false;
    const trimmed = name.trim();
    if (!trimmed) return false;
    const all = listGraphs();
    return all.some((g) => g.name.toLowerCase() === trimmed.toLowerCase());
  }, [name, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim().slice(0, 40);
    if (!trimmed) return;
    onSave(trimmed);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="save-graph-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-card border border-border shadow-2xl rounded-xl w-full max-w-md p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Sparkles className="size-5" />
          </div>
          <div>
            <h2 id="save-graph-title" className="text-base font-bold text-foreground">
              {isSaveAs ? "Save Graph As" : "Save Graph"}
            </h2>
            <p className="text-xs text-muted-foreground">
              Give your graph a memorable name (max 40 characters)
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-1.5">
            <label htmlFor="graph-name-input" className="text-xs font-semibold text-foreground">
              Graph Name
            </label>
            <input
              id="graph-name-input"
              type="text"
              required
              maxLength={40}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Sparse Grid Network"
              autoFocus
              className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {duplicateWarning && (
              <p className="text-[11px] text-amber-500 flex items-center gap-1 mt-1 font-medium">
                <AlertTriangle className="size-3" />
                A graph with this name already exists; duplicate names are allowed.
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-xs h-8 cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              size="sm"
              disabled={!name.trim()}
              className="text-xs h-8 font-semibold cursor-pointer"
            >
              Save Graph
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
