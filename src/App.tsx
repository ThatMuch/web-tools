import "normalize.css";
import "./assets/style/style.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import RefonteForm from "./pages/Refonte/RefonteForm";
import RefonteLanding from "./pages/Refonte/RefonteLanding";

function App() {
  return (
    <>
      <BrowserRouter>
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
      </BrowserRouter>
    </>
  );
}

export default App;
