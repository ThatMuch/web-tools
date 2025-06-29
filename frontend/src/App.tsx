import "normalize.css";
import "./assets/style/style.scss";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AdminLogin from "./pages/Refonte/AdminStats/AdminLogin";
import AdminStats from "./pages/Refonte/AdminStats/AdminStats";
import Home from "./pages/Home";
import PrivateLayout from "./Layout/PrivateLayout";
import RefonteForm from "./pages/Refonte/RefonteForm";
import RefonteLanding from "./pages/Refonte/RefonteLanding";

function App() {
  // Authentication state is now managed by Zustand store
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
          <Route
            path="/analyse-refonte-site-web/login"
            element={<AdminLogin />}
          />
          {/* Protected Routes */}
          <Route element={<PrivateLayout />}>
            <Route
              path="/analyse-refonte-site-web/admin"
              element={<AdminStats />}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
