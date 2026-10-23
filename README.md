# PATHFINDER

> **Interactive Graph Algorithm Laboratory**  
> A high-craft visual laboratory built with Vite, React 19, TypeScript, and Tailwind CSS v4. Explore graph traversal, inspect step-by-step frontier state, replay traversals with an autonomous robotic rover, compare algorithms side-by-side on identical graph topologies, and analyze completed comparative runs.

---

## 1. What is PATHFINDER?

PATHFINDER is an interactive laboratory for exploring, testing, and comparing graph search algorithms. Unlike typical visualizers that use hardcoded mock numbers or rigid grid tiles, PATHFINDER features:

- **Freeform Vector Graph Canvas**: Interactive node positioning, dynamic edge weighting, real-time node connection, drag-and-drop mechanics, and deletion tools.
- **Pure Algorithm Engine**: Algorithms are pure, immutable TypeScript functions operating on deep-frozen graph topologies, returning snapshot sequences of `Step[]` records.
- **Step-by-Step Replay & Rover**: Time-travel scrub bar, variable playback speed (`0.5x`, `1x`, `2x`), live queue/stack/priority-queue inspection, active pseudocode line tracking, and an autonomous robotic exploration rover.
- **Comparative Algorithm Arena**: Dual-canvas synchronized playback running two distinct algorithms (e.g. Breadth-First Search vs. Dijkstra's Algorithm, or DFS vs. BFS) simultaneously on the exact same graph.
- **Run Complete Results (`/arena/results`)**: Comprehensive post-run analysis including mini route diagrams, metrics table, workload distribution bars, dynamic interpretation, and CSV/JSON export.
- **Field Guide & Learn (`/learn`)**: Data-driven interactive guide with real engine walkthrough frames, strategy comparisons, and technical architecture notes.
- **Tactical Technical Craft**: Built following strict anti-slop guidelines with accessible contrast, Space Grotesk display typography, JetBrains Mono data telemetry, and OKLCH color palettes.

---

## 2. Quick Start

### Prerequisites
- **Node.js**: v18+ (v20+ or v22+ recommended)
- **npm**: v9+

### Installation & Development
```bash
# Clone and enter directory
cd PathFInderX

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

Open your browser at `http://localhost:5173/` to launch PATHFINDER.

### Production Build & Preview
```bash
# Type check and generate production bundle
npm run build

# Preview production build locally with SPA routing
npm run preview
```

### Automated Test Suites
```bash
# Run algorithm correctness test suite (32 tests)
npx tsx scripts/test-algorithms.ts

# Run graph invariant and hardening test suite (9 tests)
npx tsx scripts/test-hardening.ts
```

---

## 3. Routes & Navigation

| Route | View | Description |
|---|---|---|
| `/` | Landing | Hero showcase, interactive feature cards, and launch CTAs |
| `/studio` | Graph Studio | Interactive graph canvas, toolbar, element inspector, playback bar, and saved graph manager |
| `/studio?algo=<id>` | Graph Studio | Deep-link preselecting a runnable algorithm (e.g., `bfs`, `dfs`, `dijkstra`) |
| `/arena` | Algorithm Arena | Dual-canvas synchronized comparison laboratory with shared timeline playback |
| `/arena/results` | Run Complete | Side-by-side route diagrams, metrics matrix, workload bars, dynamic insight, and CSV/JSON export |
| `/learn` | Algorithm Guide | Visual field guide with live engine-generated mini walkthrough frames and comparison table |
| `/learn?algo=<id>` | Algorithm Guide | Deep-link to a specific algorithm section with active state and URL history preservation |

---

## 4. Storage Architecture & Keys

PATHFINDER uses safe browser storage wrappers that fail gracefully when storage is blocked or disabled:

| Key | Storage | Description |
|---|---|---|
| `pathfinder.savedGraphs.v1` | `localStorage` | Array of user-saved graphs (`SavedGraph[]`) with timestamps, deep-copied on read and write |
| `pathfinder.draft.v1` | `localStorage` | Autosaved working draft (`DraftState`) with 500ms debounce, restored on first load |
| `pathfinder.arena.selectedGraph` | `sessionStorage` | Remembers the selected graph for Arena comparative runs |

> [!NOTE]
> If browser storage is disabled or blocked (e.g., incognito security policies), the application remains 100% functional without crashing. Saving operations safely catch storage failures and display a clear error notification to the user.

---

## 5. Project Architecture & Structure

```text
PathFInderX/
├── src/
│   ├── components/            # Reusable UI & canvas components
│   │   ├── ui/                # Accessible primitive badges, buttons
│   │   ├── GraphCanvas.tsx    # Responsive SVG graph viewport (nodes, edges, weights, tags)
│   │   ├── Header.tsx         # Global navigation header with active indicator
│   │   ├── Rover.tsx          # 2D robotic rover with scanning pulse and traversal coordinates
│   │   └── SavedGraphsModal.tsx # Manage, rename, delete, import, and export saved graphs
│   ├── hooks/
│   │   └── usePlayback.ts     # Independent playback timer hook (play, pause, seek, speed)
│   ├── lib/
│   │   ├── algorithms/        # Pure algorithmic engine
│   │   │   ├── types.ts       # NodeState, Step, RunResult, AlgorithmMeta contracts
│   │   │   ├── bfs.ts         # Breadth-First Search step generator
│   │   │   ├── dfs.ts         # Depth-First Search step generator (iterative, deterministic)
│   │   │   ├── dijkstra.ts    # Dijkstra's Algorithm step generator (min-heap)
│   │   │   └── index.ts       # Algorithm registry and runAlgorithm() dispatcher
│   │   ├── graph.ts           # Core graph types (GNode, GEdge, Graph), presets, helpers
│   │   ├── savedGraphs.ts     # LocalStorage persistence, export/import JSON, draft autosave
│   │   └── utils.ts           # Tailwind clsx/twMerge utility
│   ├── content/
│   │   └── algorithms.ts      # Typed field guide content & live walkthrough frame extractor
│   ├── pages/
│   │   ├── Landing.tsx        # Hero landing page with SVG showcase & feature overview
│   │   ├── Studio.tsx         # Full-featured graph studio, tools, inspector tabs, playback bar
│   │   ├── Arena.tsx          # Dual algorithm comparison laboratory & synchronized playback
│   │   ├── ArenaResults.tsx   # Run complete breakdown, route diagrams, workload bars & exports
│   │   └── Learn.tsx          # Interactive algorithm guide with live mini-walkthrough frames
│   ├── state/
│   │   ├── GraphProvider.tsx  # Shared graph context provided above React Router
│   │   └── ArenaContext.tsx   # Shared Arena runs context and useArenaRuns hook
│   ├── App.tsx                # App routes (/, /studio, /arena, /arena/results, /learn)
│   ├── main.tsx               # React 19 root bootstrap
│   └── theme.css              # Tailwind v4 token mapping (OKLCH palette, font tokens)
├── scripts/
│   ├── test-algorithms.ts     # Automated engine unit test suite (32 tests)
│   └── test-hardening.ts      # Automated edge case & invariant test suite (9 tests)
├── _designs/                  # Reference visual designs (excluded from build & lint)
└── package.json
```

---

## 6. How to Add a New Algorithm

The algorithm engine is strictly separated from the React rendering layer. To add a new algorithm (e.g. `A* Search`):

### 1. Implement `run()`
Create a new file under `src/lib/algorithms/<name>.ts` exporting an 8-line pseudocode array and a `run()` function conforming to:
```typescript
export function run(
  graph: Graph,
  sourceId: string,
  goalId: string,
): RunResult {
  // 1. Validate inputs (throw typed AlgorithmError if node missing or invalid)
  // 2. Clone state structures (dist, parent, nodeStates)
  // 3. For each traversal step, capture an immutable snapshot Step object:
  //    - index: number
  //    - line: number (0-based line of pseudocode to highlight)
  //    - message: string (human-readable explanation for inspector)
  //    - current: string | null
  //    - examinedEdge: { edgeId, from, to } | null
  //    - nodeStates: Record<string, NodeState>
  //    - dist: Record<string, number | null>
  //    - parent: Record<string, string | null>
  //    - structure: { kind: 'queue' | 'stack' | 'priority-queue', items: [...] }
  //    - visitedCount, edgesExamined
  //    - path: string[] | null (final step only)
  //    - done: boolean, found: boolean
  // 4. Return complete RunResult
}
```

### 2. Register in `src/lib/algorithms/index.ts`
- Add metadata to the `ALGORITHMS` array:
  ```typescript
  {
    id: "astar",
    name: "A* Search",
    shortDesc: "Combines path cost with a geometric heuristic to direct search toward the goal.",
    kind: "Heuristic",
    timeComplexity: "Heuristic-dependent",
    spaceComplexity: "O(V)",
    enabled: true,
  }
  ```
- Add a case branch to `runAlgorithm()`:
  ```typescript
  case "astar":
    return runAStar(graph, sourceId, goalId);
  ```

Because Studio, Arena, and ArenaResults consume snapshots via `RunResult`, your new algorithm will instantly work across all canvas states, the robotic Rover, the scrubber bar, live queues/stacks, pseudocode highlighting, and side-by-side Arena comparison.

---

## 7. How to Add a Learn Entry

To document an algorithm on the `/learn` page:

1. Open `src/content/algorithms.ts`.
2. Add an object conforming to `AlgorithmLearnContent` to `LEARN_ALGORITHMS`:
   ```typescript
   {
     id: "astar",
     name: "A* Search",
     tagline: "Heuristic-guided search",
     kind: "Weighted",
     strategy: "Heuristic-guided priority queue",
     structureName: "Priority queue",
     howItWorks: [
       { title: "Score by f(n) = g(n) + h(n)", text: "..." },
       { title: "Prioritize target direction", text: "..." },
       { title: "Optimal termination", text: "..." },
     ],
     bestFor: "Goal-directed pathfinding on spatial coordinate networks",
     strengths: "Explores significantly fewer vertices by directing search toward destination",
     limitations: "Requires an admissible heuristic function",
     weighted: true,
     time: "Heuristic-dependent",
     space: "O(V)",
     runnable: true,
     implementationNote: "...",
   }
   ```
3. `getWalkthroughFrames()` in `src/content/algorithms.ts` will automatically execute `runAlgorithm(id, LEARN_EXAMPLE_GRAPH, "node-A", "node-F")` and render the 3 live walkthrough canvas frames, progression row, comparison table entry, and implementation note.

---

## 8. Known Limitations

- **Heuristic Search**: A* Search is staged in the registry as upcoming ("Coming soon"); BFS, Dijkstra, and DFS are fully implemented and verified.
- **Undo / Redo**: Multi-step history undo/redo is not implemented in this build (buttons are disabled with tooltip indicators).
- **Pan & Zoom**: The canvas operates on a standardized $1000 \times 720$ coordinate system with SVG aspect-ratio scaling; viewport drag-pan and mousewheel zooming are inactive.
- **Execution Runtime**: Measured runtimes (`measuredMs`) reflect real client-side execution via `performance.now()` for that specific browser run only; they will vary across devices and loads.