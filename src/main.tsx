import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import Quiz from "./pages/Quiz";
import Oferta from "./pages/Oferta";
import NotFound from "./pages/NotFound";
import { initAnalytics } from "./analytics";
import "./index.css";

initAnalytics();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route path="/oferta" element={<Oferta />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
