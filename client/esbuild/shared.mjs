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
    '.jpg': 'file',
    '.js': 'jsx',
    '.png': 'file',
    '.ttf': 'file',
  },
  outfile: 'build/web.js',
  platform: 'browser',
  plugins: [
    envFilePlugin,
    svgr(),
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
  target: ['es6'],
  tsconfig: 'tsconfig.web.json',
}
