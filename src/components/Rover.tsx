import * as React from "react";

export interface RoverProps {
  x: number;
  y: number;
  isProcessing?: boolean;
  isPlaying?: boolean;
  hasRun?: boolean;
  speed?: number;
}

/**
 * Autonomous Exploration Rover glyph rendered inside the GraphCanvas SVG.
 * Strictly positioned from graph node data coordinates plus fixed offset.
 * Applies CSS transition on transform ONLY when actively playing a run,
 * and renders with zero transition on initial mount so it never slides from (0,0).
 */
export function Rover({
  x,
  y,
  isProcessing = false,
  isPlaying = false,
  hasRun = false,
  speed = 1,
}: RoverProps) {
  // Track initial mount state to prevent sliding in from (0,0)
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    // Enable transition only after initial render has positioned the rover at target coordinates
    const timer = setTimeout(() => {
      setHasMounted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // When no run exists, render no rover at all
  if (!hasRun) return null;

  // Fixed offset to the upper-right of node center (node radius is 22)
  const offsetX = 26;
  const offsetY = -28;
  const targetX = x + offsetX;
  const targetY = y + offsetY;

  // Transition duration scales with playback speed
  const transitionMs = Math.max(120, Math.min(800, Math.round(450 / speed)));

  // CSS transition on transform ONLY when actively playing a run
  const transitionStyle =
    hasMounted && isPlaying
      ? `transform ${transitionMs}ms cubic-bezier(0.2, 0.8, 0.2, 1)`
      : "none";

  return (
    <g
      className="pointer-events-none select-none"
      style={{
        transform: `translate(${targetX}px, ${targetY}px)`,
        transition: transitionStyle,
      }}
    >
      {/* Processing Scan Cone & Concentric Radar Ring (Centered on Rover, NO orbit) */}
      {isProcessing && (
        <g>
          {/* Directional tactical sensor cone pointing leftward toward the examined node */}
          <path
            d="M 10 16 L -18 4 L -18 28 Z"
            fill="var(--color-primary)"
            fillOpacity="0.2"
            className="animate-pulse"
          />
          {/* Concentric stationary radar ring */}
          <circle
            cx="16"
            cy="16"
            r="22"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.8"
          />
          <circle
            cx="16"
            cy="16"
            r="18"
            fill="var(--color-primary)"
            fillOpacity="0.14"
            className="animate-pulse"
          />
        </g>
      )}

      {/* Rover Chassis: Rounded Square */}
      <rect
        x="0"
        y="0"
        width="32"
        height="32"
        rx="8"
        fill="var(--color-card)"
        stroke="var(--color-primary)"
        strokeWidth="2"
      />

      {/* Sensor Mast / Antenna */}
      <line
        x1="16"
        y1="5"
        x2="16"
        y2="8"
        stroke="var(--color-primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="16" cy="4" r="1.5" fill="var(--color-primary)" />

      {/* Head Screen */}
      <rect
        x="6"
        y="9"
        width="20"
        height="14"
        rx="3"
        fill="var(--color-primary)"
        fillOpacity="0.12"
        stroke="var(--color-primary)"
        strokeWidth="1.5"
      />

      {/* Optical Sensor Eyes */}
      <circle cx="11" cy="14" r="1.5" fill="var(--color-primary)" />
      <circle cx="21" cy="14" r="1.5" fill="var(--color-primary)" />

      {/* Telemetry Mouth / Data bar */}
      <line
        x1="11"
        y1="18.5"
        x2="21"
        y2="18.5"
        stroke="var(--color-primary)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Terrain Tread Base */}
      <rect
        x="5"
        y="24.5"
        width="22"
        height="3.5"
        rx="1.75"
        fill="var(--color-foreground)"
      />
      <circle cx="9" cy="26.25" r="0.75" fill="var(--color-card)" />
      <circle cx="16" cy="26.25" r="0.75" fill="var(--color-card)" />
      <circle cx="23" cy="26.25" r="0.75" fill="var(--color-card)" />
    </g>
  );
}

export default Rover;
