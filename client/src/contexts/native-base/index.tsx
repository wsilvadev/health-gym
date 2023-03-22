import AsyncStorage from '@react-native-async-storage/async-storage'
import { NativeBaseProvider, View } from 'native-base'
import type { ColorMode, StorageManager } from 'native-base'
import type { ReactNode } from 'react'
import { StatusBar, useColorScheme } from 'react-native'

import { theme } from './theme'

type Props = {
  children: ReactNode
}

export function NativeBaseContext({ children }: Props) {
  const colorScheme = useColorScheme()

  const config = {
    // dependencies: {
    //   'linear-gradient': require('react-native-linear-gradient').default,
    // },
  }

  const colorModeManager: StorageManager = {
    get: async () => {
      let colorMode = await AsyncStorage.getItem('colorMode')
      if (!colorMode) {
        colorMode = colorScheme || 'light'
      }
      return colorMode === 'dark' ? 'dark' : 'light'
    },
    set: async (colorMode: ColorMode) => {
      await AsyncStorage.setItem('colorMode', colorMode || 'light')
    },
  }

  return (
    <NativeBaseProvider
      isSSR={false}
      config={config}
      colorModeManager={colorModeManager}
      theme={theme}>
      <StatusBar translucent backgroundColor="transparent" />
      <View flex={1} bg={'gray.700'}>
        {children}
      </View>
    </NativeBaseProvider>
  )
}
