// src/app.tsx
import "zmp-ui/zaui.css";
import "@/css/tailwind.scss";
import "@/css/app.scss";

import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import MyApp from "@/main";

if (import.meta.env.DEV) {
  await import("zmp-ui/zaui.css");
  await import("@/css/tailwind.scss");
  await import("@/css/app.scss");
}

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if ((window as any).zmp?.ready) {
      (window as any).zmp.ready(() => {
        setIsReady(true);
      });
    } else {
      // Dev mode: không có ZMP SDK → vẫn chạy
      console.warn("ZMP SDK not loaded – Running in development mode");
      setTimeout(() => setIsReady(true), 500);
    }
  }, []);

  if (!isReady) {
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