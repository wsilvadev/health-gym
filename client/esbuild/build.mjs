import esbuild from 'esbuild'

import sharedConfig from './shared.mjs'

esbuild
  .build({
    define: {
      __DEV__: 'false',
      global: 'window',
      process: '{ "env": { "NODE_ENV": "production" } }',
    },
    minify: true,
    sourcemap: false,
    ...sharedConfig,
  })
  .then(() => {
    console.log('🚀 Build finished!')
  })
  .catch(err => {
    console.log('❌ Build error: ', err)
    process.exit(1)
  })
