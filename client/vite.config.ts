import {resolve} from 'path'

import {esbuildCommonjs, viteCommonjs} from '@originjs/vite-plugin-commonjs'
import react from '@vitejs/plugin-react-swc'
import {defineConfig, loadEnv } from 'vite'
import svgr from 'vite-plugin-svgr'

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
]

const compileNodeModules = [
  // Add every react-native package that needs compiling
  // 'react-native-gesture-handler',
  'react-native-vector-icons',
].map(moduleName => resolve(__dirname, 'node_modules', moduleName))

export default ({ mode }: { mode: string }) => {
  // Load app-level env vars to node-level env vars.
  process.env = {...process.env, ...loadEnv(mode, process.cwd())}
  
  return defineConfig({
    assetsInclude: compileNodeModules,
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    define: {
      global: 'window',
    },
    envPrefix: 'APP_',
    optimizeDeps: {
      esbuildOptions: {
        loader: {'.js': 'jsx'},
        plugins: [
          esbuildCommonjs([
            'react-native-vector-icons',
          ]),
        ],
        resolveExtensions: extensions,
      },
      include: [...compileNodeModules],
    },
    plugins: [viteCommonjs(), react(), svgr({ exportAsDefault: true })],
    resolve: {
      alias: {
        'react-native': 'react-native-web',
        'react-native-svg': 'react-native-web-svg',
        src: resolve(__dirname, 'src'),
      },
      extensions,
    },
  })
}
