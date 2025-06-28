import "normalize.css";
import "./assets/style/style.scss";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AdminLogin from "./pages/adminStats/AdminLogin";
import AdminStats from "./pages/adminStats/AdminStats";
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
          <Route path="/adminLogin" element={<AdminLogin />} />
          {/* Protected Routes */}
          <Route element={<PrivateLayout />}>
            <Route path="/adminStats" element={<AdminStats />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
