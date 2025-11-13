// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.adflex.fecredit',
  appName: 'FE Credit MiniApp',
  webDir: 'www',                 // <-- Vite builds to www/

  // ----- iOS specific -------------------------------------------------
  ios: {
    // optional – you can add a custom URL scheme for deep-links
    // scheme: 'fecredit',
  },

  // ----- Android specific --------------------------------------------
  android: {
    // keep the same scheme you already use for Android
    // (Capacitor uses it for live-reload in dev)
    // androidScheme: 'https',
  },

  // ----- Live-reload (dev) -------------------------------------------
  server: {
    cleartext: true,            // allow http://localhost
    androidScheme: 'https',     // live-reload on Android
    // iOS live-reload works automatically over http
  },

  // ----- Optional – hide the status bar / make it transparent ----------
  plugins: {
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#ffffff',
    },
    SplashScreen: {
      launchShowDuration: 0,
    },
  },
};

export default config;