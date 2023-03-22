//import fs from 'node:fs'

import envFilePlugin from 'esbuild-envfile-plugin'
import babel from 'esbuild-plugin-babel'
import svgr from 'esbuild-plugin-svgr'

export default {
  bundle: true,
  entryPoints: ['index.js'],
  external: ['../package.json'],
  format: 'cjs',
  jsx: 'automatic',
  loader: {
    '.js': 'jsx',
    '.png': 'dataurl',
    '.svg': 'dataurl',
    '.ttf': 'file',
  },
  outfile: 'build/web.js',
  platform: 'browser',
  plugins: [
    envFilePlugin,
    svgr(),
    //nodeExternalsPlugin(),
    babel({
      configFile: './babel.config.js',
      filter: /.\/src\/*/,
    }),
  ],
  resolveExtensions: [
    '.web.tsx',
    '.web.ts',
    '.web.jsx',
    '.web.js',
    '.tsx',
    '.ts',
    '.jsx',
    '.js',
  ],
  target: ['es6', 'chrome58', 'firefox57', 'safari11'],
  tsconfig: 'tsconfig.web.json',
}
