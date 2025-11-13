import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./features/auth";
import { Login } from "./features/auth/components/Login";
import { Register } from "./features/auth/components/Register";
import { ProtectedRoute } from "./features/auth/components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <h1>Dashboard</h1>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
