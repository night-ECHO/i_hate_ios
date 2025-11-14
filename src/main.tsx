// src/main.tsx
import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { App, ZMPRouter } from "zmp-ui";  // Keep imports

import Intro from "./pages/Intro";
import Terms from "./pages/Terms";
import LoanInfo from "./pages/LoanInfo";
import Confirm from "./pages/Confirm";
import Success from "./pages/Success";

const MyApp = () => {
  const isZalo = !!(window as any).zmp;  // Check if SDK is present

  return (
    <HashRouter>
      {isZalo ? (
        // Zalo mode: Use full ZMP wrappers
        <ZMPRouter>
          <App>
            <Routes>
              <Route path="/" element={<Intro />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/loan" element={<LoanInfo />} />
              <Route path="/confirm" element={<Confirm />} />
              <Route path="/success" element={<Success />} />
            </Routes>
          </App>
        </ZMPRouter>
      ) : (
        // Standalone/Capacitor mode: Skip ZMPRouter (use HashRouter for nav), but keep <App> for basic theming
        <App>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/loan" element={<LoanInfo />} />
            <Route path="/confirm" element={<Confirm />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </App>
      )}
    </HashRouter>
  );
};

export default MyApp;