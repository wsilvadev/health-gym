import { ReactNode, createContext, useCallback, useEffect, useState } from 'react'
import { Platform, useColorScheme } from 'react-native'

import { ThemeName, themeNames } from 'src/themes'
import { storage } from 'src/utils'

export type ThemesContextType = {
  //setTheme(themeName: ThemeName): void
  changeTheme(): void
  loading: boolean
  themeName: ThemeName
}

type ProviderProps = {
  children: ReactNode
  testMode?: boolean
}

export const ThemesContext = createContext<ThemesContextType>({} as ThemesContextType)

export const ThemesProvider = ({ children, testMode }: ProviderProps) => {
  const [loading, setLoading] = useState(!testMode)
  const [themeName, setThemeName] = useState<ThemeName>('light') // light
  const deviceTheme = useColorScheme() //-> dark, light or null

  // theme
  const handleTheme = useCallback(async () => {
    let theme = await storage.get<ThemeName>('themeName')

    if (!theme) {
      const isWeb = Platform.OS === 'web'
      theme = isWeb
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : deviceTheme || 'light'

      await storage.set('themeName', theme)
    }

    if (!themeNames.includes(theme)) {
      theme = 'light'
    }

    if (theme !== themeName) {
      setThemeName(theme)
    }
  }, [deviceTheme, themeName])

  // const setTheme = async (theme: ThemeName) => {
  //   if (themeName !== theme) {
  //     await storage.set('themeName', theme)
  //     setThemeName(theme)
  //   }
  // }

  const changeTheme = async () => {
    const theme = themeName === 'dark' ? 'light' : 'dark'
    await storage.set('themeName', theme)
    setThemeName(theme)
  }

  const prepare = useCallback(async () => {
    try {
      await handleTheme()
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }, [handleTheme])

  useEffect(() => {
    if (loading) {
      prepare()
    }
  }, [loading, prepare])

  return (
    <ThemesContext.Provider
      value={{
        //setTheme,
        changeTheme,
        loading,
        themeName,
      }}>
      {children}
    </ThemesContext.Provider>
  )
}
