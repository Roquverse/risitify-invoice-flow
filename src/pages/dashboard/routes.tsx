import { Routes, Route } from "react-router-dom";
import { DashboardShell } from "./components/dashboard-shell";
import DashboardOverview from "./index";
import Settings from "./settings";
import Banking from "./banking";

export default function DashboardRoutes() {
  return (
    <DashboardShell>
      <Routes>
        <Route index element={<DashboardOverview />} />
        <Route path="settings" element={<Settings />} />
        <Route path="banking" element={<Banking />} />
      </Routes>
    </DashboardShell>
  );
}
