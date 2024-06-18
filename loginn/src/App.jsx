import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./componentes/Login";
import Dashboard from "./componentes/Dashboard";
import Inicio from "./componentes/Inicio";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuthenticationSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route
            path="/login"
            element={
              <Login onAuthenticationSuccess={handleAuthenticationSuccess} />
            }
          />
          {isLoggedIn ? (
            <Route path="/dashboard" element={<Dashboard />} />
          ) : (
            <Route
              path="/dashboard"
              element={
                <Login onAuthenticationSuccess={handleAuthenticationSuccess} />
              }
            />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
