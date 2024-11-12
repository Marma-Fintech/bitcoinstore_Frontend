import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import BarterSystem from "./components/pages/BarterSystem";

function route() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/barter-system" element={<BarterSystem />} />
      </Routes>
    </Router>
  );
}

export default route;
