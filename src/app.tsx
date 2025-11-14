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

// In the fallback setTimeout:
if (!ready) {
  console.warn('ZMP SDK timeout – continuing without it');
  
  // Minimal mock for zmp-ui basics (expand based on your debug errors)
  (window as any).zmp = {
    ready: (callback: () => void) => callback(),  // Already handled, but ensure
    getSystemInfo: () => Promise.resolve({ platform: 'ios', appVersion: '1.0.0' }),  // For theming/status
    setStatusBarStyle: () => {},  // No-op
    alert: (title: string, message: string, callback?: () => void) => {
      alert(`${title}\n${message}`);  // Fallback to browser alert
      callback?.();
    },
    // Add more from errors, e.g.:
    // navigateBack: () => window.history.back(),
    // getAuthHeader: () => Promise.resolve({ Authorization: 'mock-token' }),
  };
  
  setReady(true);
}

  return <MyApp />;
};

const root = createRoot(document.getElementById("app")!);
root.render(<App />);