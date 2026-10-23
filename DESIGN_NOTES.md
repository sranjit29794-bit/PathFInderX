# PATHFINDER — Design Notes & Visual Specifications

> **Art Direction**: **Flat 2D / Tactical Technical**  
> *Distilled from `_designs/screen-1` (Identity & Style Guide) and `_designs/screen-3` (Graph Studio), evaluated under the `impeccable` craft floor and `design-taste-frontend` anti-slop guidelines.*

---

## 1. Core Visual Principles & Art Direction

Pathfinder avoids generic AI dashboard tropes (gratuitous gradients, floating glass panels, pill badge clusters, and decorative hairline grid ornamentation). Instead, it adopts a **tactical technical** aesthetic inspired by laboratory instruments, telemetry displays, and vector charting systems:

- **Flat 2D Precision**: Zero faux-3D skeuomorphism or unmotivated drop shadows on resting surfaces. Elevation is communicated through crisp single-tone background steps and structured 1px borders.
- **Form Follows Telemetry**: Every pixel, badge, and number represents genuine computational state from the graph engine or traversal algorithms—never hardcoded or decorative mockup filler.
- **High Information Density with Calm Contrast**: Dark laboratory surfaces accented with high-chroma tactical indicators (Electric Cyan, Amber, Lime).

---

## 2. Visual Rules to Keep

### 2.1 Color Tokens & Semantic Roles
Retain the OKLCH token mapping defined in `screen-1` and `theme.css`:

| Token | Name | OKLCH / Hex Equiv. | Semantic Application |
| :--- | :--- | :--- | :--- |
| `--foreground` | **Graphite** | `#11161B` (light) / `#ECEEEF` (dark) | Primary typography, deep structural chassis, prominent headings. |
| `--card` / `--sidebar` | **Panel** | `#1A2128` | Tool rails, inspector cards, toolbar bars, node circle fill. |
| `--border` | **Border** | `#2B353D` | Structural boundaries, unvisited edges, input borders. |
| `--background` | **Warm White / Field** | `#F3F1EA` (light) / `#12171C` (dark) | Canvas background field, workspace canvas. |
| `--muted-foreground`| **Cool Gray** | `#94A3AD` | Subheadings, coordinate captions, secondary telemetry labels. |
| `--primary` | **Electric Cyan** | `#4DE1E8` | **Primary Action / Start Node / Selected State**: Active tool, source node (`START`), examined traversal paths. |
| `--chart-2` | **Amber** | `#F4B45E` | **Frontier / In-Progress**: Algorithm exploration queue, discovery wave, alternative pathing. |
| `--chart-3` | **Lime** | `#A8D66D` | **Goal / Final Shortest Path**: Destination node (`GOAL`), finalized solution route, success state. |
| `--destructive` | **Error Red** | `#E56B6F` | Deletion tools, destructive actions, disconnected node errors. |

---

### 2.2 Typography System
Strict two-family typography pairing:
1. **UI & Display Face**: `Space Grotesk`
   - Applications: Product wordmark, page titles, section headings, navigation links, button labels, and inspector category titles.
   - Style: Font weight 500–700, tight tracking (`tracking-tight` to `tracking-wider` on uppercase headers).
2. **Data & Telemetry Face**: `JetBrains Mono`
   - Applications: Node letter labels, edge weight badges, coordinates (`x 640 · y 302`), execution steps, code blocks, and statistics percentages.
   - Style: Font weight 600–700, tabular numerals for instant vertical visual alignment.

---

### 2.3 Graph Primitives: Node & Edge State Machine

#### Node States ($r = 22\text{px}$)
1. **Unvisited (Default)**:
   - Fill: `var(--color-card)`, Stroke: `var(--color-border)` ($2.5\text{px}$). Text: `var(--color-foreground)`.
2. **Selected**:
   - Stroke: `var(--color-primary)` ($4\text{px}$).
   - Outer accent: Concentric rotating dashed ring ($r = 34\text{px}$, stroke `$2\text{px}$, `stroke-dasharray="5 5"`).
3. **Source (START)**:
   - Fill & Stroke: `var(--color-primary)`. Text: `var(--color-primary-foreground)`.
   - Header Pill: `START` badge floating at $y - 32\text{px}$ in `JetBrains Mono` 9px bold.
4. **Goal (GOAL)**:
   - Fill & Stroke: `var(--color-chart-3)`. Text: `var(--color-primary-foreground)`.
   - Header Pill: `GOAL` badge floating at $y - 32\text{px}$ in `JetBrains Mono` 9px bold.
5. **Frontier (Discovered Queue)**:
   - Fill: `oklch(from var(--color-chart-2) l c h / 0.18)`, Stroke: `var(--color-chart-2)` ($3\text{px}$). Text: `var(--color-chart-2)`.
6. **Visited / Processed**:
   - Fill: `oklch(from var(--color-primary) l c h / 0.15)`, Stroke: `var(--color-primary)` ($3\text{px}$). Text: `var(--color-primary)`.
7. **Final Solution Path**:
   - Fill: `var(--color-chart-3)`, Stroke: `var(--color-chart-3)` ($4\text{px}$). Text: `var(--color-primary-foreground)`.

#### Edge States & Weight Labels
1. **Default**: Stroke: `var(--color-border)` ($2.5\text{px}$, linecap round).
2. **Frontier Exploration**: Stroke: `var(--color-chart-2)` ($4\text{px}$, dashed or glowing).
3. **Traversed Edge**: Stroke: `var(--color-primary)` ($3.5\text{px}$).
4. **Solution Path**: Stroke: `var(--color-chart-3)` or `var(--color-primary)` ($5\text{px}$, solid).
5. **Weight Badge**: Small pill at edge midpoint $((x_1+x_2)/2, (y_1+y_2)/2)$:
   - $28\text{px} \times 20\text{px}$, rounded $5\text{px}$, fill `var(--color-card)`, border `var(--color-border)`.
   - Text in `JetBrains Mono` 11px bold. Selected edges highlight border to `var(--color-primary)`.
   - Interactive click target: Wide $20\text{px}$ invisible stroke for reliable touch/mouse selection.

---

### 2.4 Signature Rover Look (`screen-1`)
Retain the distinct 2D tactical robotic rover defined in `screen-1` rather than the simplified icon box from `screen-3`:
- **Chassis**: Low-slung dark rectangular body (`bg-card` / `bg-foreground`, border `border-border`, rounded 6px).
- **Wheels / Treads**: Dual circular wheels with distinct rim hubs positioned at chassis base.
- **Sensor Mast**: Vertical telemetry antenna with illuminated Electric Cyan beacon emitter on top.
- **Directional Scanner / Headlight**: Forward-facing Amber/Cyan sensor ray indicating active search vector.
- **States**:
  - `IDLE`: Resting on the source node before execution.
  - `SCANNING / TRAVERSING`: Animated sweep radar or beam pointing toward candidate neighbor nodes during step expansion.

---

### 2.5 Spacing, Layout Rhythm & Dimensions
- **Viewport Resilience**: Pure fluid flexbox layout (`h-screen overflow-hidden` with `flex-1 min-h-0`). Never enforce fixed heights like `1016px` or `1080px`.
- **Canvas Ratio**: Standardized $1000 \times 720$ viewBox coordinates with coordinate projection matrix (`getScreenCTM().inverse()`) ensuring pixel-perfect drag and drop across all screen sizes.
- **Toolbar Rhythm**: Consistent 52px (h-13) subheader toolbar, 56px (w-14) tool rail, and 300px (w-75) inspector panel.

---

## 3. Inconsistencies & Weaknesses in Mockups to Improve

| Element in Mockup | Mockup Flaw / Anti-Pattern | Required Engineering & Design Fix |
| :--- | :--- | :--- |
| **Start / Goal Hues** | `screen-1` used Lime for Start and Amber for Goal; `screen-2` and `screen-3` used Cyan for Start and Lime for Goal. | **Standardize universally**: **Cyan (`primary`) = START / Source**; **Lime (`chart-3`) = GOAL / Destination**; **Amber (`chart-2`) = Frontier / Alternative Path**. |
| **Fake UI Ornaments** | Fake "Operational" green dot, non-functional Undo/Redo buttons, and dummy "100%" zoom labels in `screen-3`. | **Remove or disable honestly**: Removed fake operational badges. Working actions (Reset, Presets, Run) have clear triggers; unbuilt features (Pan/Zoom, Undo) are explicitly disabled with descriptive `title="Not in this build"` tooltips. |
| **Hardcoded Data & Node Typos** | `screen-3` hardcoded "12 nodes · 16 edges" when the SVG actually had 13 nodes, duplicate "J" node labels, and a fake "24%" density. | **100% computed metrics**: Dynamic `getGraphStats(graph)` computes node count, edge count, density percentage, and topology directly from memory. |
| **Static Context Menu** | `screen-3` had an absolute hardcoded popover fixed at `top-[42%] left-[42%]` for Node F. | **Dynamic Inspector**: Selection context opens in the right Inspector panel and inline midpoint input on the canvas, reacting dynamically to whichever element is clicked. |
| **Rover Degradation** | `screen-3` replaced the crafted rover from `screen-1` with a generic box and Lucide icon. | **Restore the signature tactical rover** with scanning pulse and traversal positioning. |
| **Fixed Height Hack** | `Screen-N.screen.css` used `.h-screen { height: 1080px !important; }` causing layout breakage on standard laptops. | **Eliminate hack**: Use standard Tailwind `h-screen`, `flex-1`, and `min-h-0` for responsive fit. |

---

## 4. Anti-Slop Implementation Checklist

- [x] **No arbitrary colored shadows**: Surface separation achieved solely via OKLCH tonal background steps and clean 1px borders.
- [x] **No fake metrics**: Node and edge numbers, density, and algorithm steps compute dynamically.
- [x] **No dead clicks**: Every active control executes state changes; pending controls have disabled styling and clear tooltips.
- [x] **Honest Typography**: Space Grotesk for human UI, JetBrains Mono for machine telemetry.
- [x] **Unified State Language**: Unvisited, Frontier, Active, Visited, and Path states remain consistent between Studio and Arena.
