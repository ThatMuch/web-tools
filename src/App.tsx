import "normalize.css";
import "./assets/style/style.scss";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AdminLogin from "./pages/adminStats/AdminLogin";
import AdminStats from "./pages/adminStats/AdminStats";
import Home from "./pages/Home";
import RefonteForm from "./pages/Refonte/RefonteForm";
import RefonteLanding from "./pages/Refonte/RefonteLanding";
import { useState } from "react";

function App() {
  const [setIsAuthenticated] = useState(true);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/analyse-refonte-site-web"
            element={<RefonteLanding />}
          />
          <Route
            path="/analyse-refonte-site-web/refonte-form"
            element={<RefonteForm />}
          />
          <Route path="/adminStats" element={<AdminStats />} />
          <Route
            path="/adminLogin"
            element={
              <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
