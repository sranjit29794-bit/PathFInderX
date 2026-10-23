import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { GraphProvider } from "@/state/GraphProvider";
import { ArenaProvider } from "@/state/ArenaContext";
import Landing from "@/pages/Landing";
import Studio from "@/pages/Studio";
import Arena from "@/pages/Arena";
import ArenaResults from "@/pages/ArenaResults";
import Learn from "@/pages/Learn";

export function App() {
  return (
    <GraphProvider>
      <ArenaProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/studio" element={<Studio />} />
            <Route path="/arena" element={<Arena />} />
            <Route path="/arena/results" element={<ArenaResults />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ArenaProvider>
    </GraphProvider>
  );
}

export default App;
