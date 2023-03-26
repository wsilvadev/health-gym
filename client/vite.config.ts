import {resolve} from 'path';

import {defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import {esbuildCommonjs, viteCommonjs} from '@originjs/vite-plugin-commonjs';

const extensions = [
  ".web.tsx",
  ".tsx",
  ".web.ts",
  ".ts",
  ".web.jsx",
  ".jsx",
  ".web.js",
  ".js",
  ".css",
  ".json",
];

const compileNodeModules = [
  // Add every react-native package that needs compiling
  // 'react-native-gesture-handler',
  // 'react-native-vector-icons',
].map(moduleName => resolve(__dirname, 'node_modules', moduleName))

export default ({ mode }: { mode: string }) => {
  // Load app-level env vars to node-level env vars.
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  
  return defineConfig({
    define: {
      global: 'window',
    },
    envPrefix: 'APP_',
    plugins: [viteCommonjs(), react(), svgr({ exportAsDefault: true })],
    optimizeDeps: {
      include: [...compileNodeModules],
      esbuildOptions: {
        resolveExtensions: extensions,
        plugins: [
          esbuildCommonjs([
            'react-native-vector-icons',
          ]),
        ],
        loader: {'.js': 'jsx'},
      },
    },
    resolve: {
      extensions,
      alias: {
        'react-native': 'react-native-web',
        'react-native-svg': 'react-native-web-svg',
        src: resolve(__dirname, 'src'),
      },
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
  });
}
