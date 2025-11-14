// src/app.tsx
import "zmp-ui/zaui.css";
import "@/css/tailwind.scss";
import "@/css/app.scss";

import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import MyApp from "@/main";

const App = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = () => setReady(true);

    // ZMP already injected
    if ((window as any).zmp?.ready) {
      (window as any).zmp.ready(start);
      return;
    }

    // Poll until SDK appears (max 5 s)
    const id = setInterval(() => {
      if ((window as any).zmp?.ready) {
        clearInterval(id);
        (window as any).zmp.ready(start);
      }
    }, 100);

    // Fallback – run anyway (useful for pure Capacitor debug)
    const fallback = setTimeout(() => {
      clearInterval(id);
      if (!ready) {
        console.warn('ZMP SDK timeout – continuing without it');
        setReady(true);
      }
    }, 5000);

    return () => {
      clearInterval(id);
      clearTimeout(fallback);
    };
  }, [ready]);

  if (!ready) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-lg text-green-600 font-bold">FE CREDIT</div>
          <div className="text-sm text-gray-600">Đang tải ứng dụng...</div>
        </div>
      </div>
    );
  }

  return <MyApp />;
};

const root = createRoot(document.getElementById("app")!);
root.render(<App />);