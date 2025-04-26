import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import { OrganizationProvider } from "@/contexts/OrganizationContext";
import AppRoutes from "@/routes";

function App() {
  return (
    <Router>
      <AuthProvider>
        <OrganizationProvider>
          <AppRoutes />
          <Toaster />
        </OrganizationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
