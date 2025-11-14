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
      name: 'zmp-assets',
      async writeBundle() {
        const fs = require('fs');
        const { execSync } = require('child_process');
        const outDir = path.resolve(__dirname, 'www');

        // 1. index.html
        const indexSrc = path.resolve(__dirname, 'index.html');
        const indexDest = path.resolve(outDir, 'index.html');
        if (fs.existsSync(indexSrc)) {
          fs.copyFileSync(indexSrc, indexDest);
          console.log('Copied index.html');
        }

        // 2. zaui.css
        const zauiSrc = path.resolve(__dirname, 'node_modules/zmp-ui/zaui.css');
        const zauiDest = path.resolve(outDir, 'zmp-ui/zaui.css');
        if (fs.existsSync(zauiSrc)) {
          fs.mkdirSync(path.dirname(zauiDest), { recursive: true });
          fs.copyFileSync(zauiSrc, zauiDest);
          console.log('Copied zaui.css');
        }

        // 3. Compile SCSS
        const compile = (entry: string, output: string) => {
          const cmd = `npx postcss ${entry} -o ${path.resolve(outDir, output)}`;
          try {
            execSync(cmd, { stdio: 'inherit' });
            console.log(`Compiled ${entry} → ${output}`);
          } catch (e) {
            console.error(`Failed to compile ${entry}`, e);
          }
        };
        compile('src/css/tailwind.scss', 'tailwind.css');
        compile('src/css/app.scss', 'app.css');

        // 4. Config files
        fs.copyFileSync('app-config.json', path.resolve(outDir, 'app-config.json'));
        fs.copyFileSync('public/zmp-manifest.json', path.resolve(outDir, 'zmp-manifest.json'));
      },
    },
  ],

  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },

  build: {
    outDir: 'www',
    emptyOutDir: true,
    manifest: false,                                 // <-- NEW
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'), // <-- NEW
      external: ['app.js'],
      output: {
        entryFileNames: 'app.js',
        assetFileNames: '[name].[ext]',
      },
    },
  },

  server: { port: 4000, host: true },
});