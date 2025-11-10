// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-zmp-assets',
      writeBundle() {
        const fs = require('fs');
        const copy = (src: string, dest: string) => {
          if (fs.existsSync(src)) {
            fs.mkdirSync(path.dirname(dest), { recursive: true });
            fs.copyFileSync(src, dest);
            console.log(`Copied: ${src} → ${dest}`);
          }
        };

        // Copy zaui.css từ node_modules
        copy(
          path.resolve(__dirname, 'node_modules/zmp-ui/zaui.css'),
          path.resolve(__dirname, 'www/zmp-ui/zaui.css')
        );

        // Copy app-config.json và manifest
        copy('app-config.json', 'www/app-config.json');
        copy('public/zmp-manifest.json', 'www/zmp-manifest.json');
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'www',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'app.js',
        assetFileNames: ({ name }) => {
          if (name?.endsWith('.css')) {
            return `${name.replace(/-[a-z0-9]+\.css$/, '')}.css`; // tailwind.css, app.css
          }
          return '[name].[ext]';
        },
      },
    },
  },
  server: {
    port: 4000,
    host: true,
  },
});