import React from 'react'
import { createRoot } from 'react-dom/client'
import { AppRegistry, Platform } from 'react-native'

import { App } from 'src/App'

import { name as appName } from './app'

AppRegistry.registerComponent(appName, () => App)

if (Platform.OS === 'web') {
  createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
