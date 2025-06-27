import "normalize.css";
import "./assets/style/style.scss";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Home from "./pages/Home";
import RefonteForm from "./pages/Refonte/RefonteForm";
import RefonteLanding from "./pages/Refonte/RefonteLanding";

function App() {
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
