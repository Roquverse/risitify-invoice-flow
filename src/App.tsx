import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import { DashboardRoutes } from "./routes/dashboard";
import Onboarding from "./pages/onboarding";

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard/*" element={<DashboardRoutes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
