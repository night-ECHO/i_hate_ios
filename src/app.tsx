// src/app.tsx
import "zmp-ui/zaui.css";
import "@/css/tailwind.scss";
import "@/css/app.scss";

import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import MyApp from "@/main";

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if ((window as any).zmp?.ready) {
      (window as any).zmp.ready(() => {
        setIsReady(true);
      });
    } else {
      console.warn("ZMP SDK not loaded – Running in dev mode");
      setIsReady(true);
    }
  }, []);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-lg">Đang tải...</div>
      </div>
    );
  }

  return <MyApp />;
};

const root = createRoot(document.getElementById("app")!);
root.render(<App />);