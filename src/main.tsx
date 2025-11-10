// src/main.tsx
import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { App, ZMPRouter } from "zmp-ui";

import Intro from "./pages/Intro";
import Form1 from "./pages/Form1";
import Form2 from "./pages/Form2";
import Submit from "./pages/Submit";

const MyApp = () => {
  return (
    <ZMPRouter>
      <HashRouter>  {/* ← DÙNG HashRouter */}
        <App>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/form1" element={<Form1 />} />
            <Route path="/form2" element={<Form2 />} />
            <Route path="/submit" element={<Submit />} />
          </Routes>
        </App>
      </HashRouter>
    </ZMPRouter>
  );
};

export default MyApp;