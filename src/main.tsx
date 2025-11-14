// src/main.tsx
import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { App, ZMPRouter } from "zmp-ui";

import Intro from "./pages/Intro";
import Terms from "./pages/Terms";
import LoanInfo from "./pages/LoanInfo";
import Confirm from "./pages/Confirm";
import Success from "./pages/Success";

const MyApp = () => {
  return (
    <ZMPRouter>
      <HashRouter>
        <App>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/loan" element={<LoanInfo />} />
            <Route path="/confirm" element={<Confirm />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </App>
      </HashRouter>
    </ZMPRouter>
  );
};

export default MyApp;