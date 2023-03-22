import { ReactNode, createContext, useCallback, useEffect, useState } from 'react'
import { NativeModules, Platform } from 'react-native'
import { setErrorMap } from 'zod'

import { Locale, LocaleName, localeNames, locales, zodErrorMaps } from 'src/locales'
import { storage } from 'src/utils/storage'

export type LocalesContextType = {
  loading: boolean
  localeName: LocaleName
  setLocaleName(localeName: LocaleName): void
  t(key: keyof Locale, variables?: any[]): string
}

type ProviderProps = {
  children: ReactNode
  testMode?: boolean
}

export const LocalesContext = createContext<LocalesContextType>(
  {} as LocalesContextType
)

export const LocalesProvider = ({ children, testMode }: ProviderProps) => {
  const [loading, setLoading] = useState(!testMode)
  const [localeName, _setLocaleName] = useState<LocaleName>('pt')

  const t = (key: keyof Locale, variables?: any[]): string => {
    if (!localeName) {
      return ''
    }
    const str = locales[localeName][key]
    return variables ? variables.reduce((acc, v) => acc.replace('.v.', v), str) : str
  }

  const setLocaleName = (localeName: LocaleName) => {
    setErrorMap(zodErrorMaps[localeName])
    _setLocaleName(localeName)
    storage.set('localeName', localeName)
  }

  const handleLocale = useCallback(async () => {
    const storedLocaleName = await storage.get('localeName')

    if (storedLocaleName) {
      setLocaleName(storedLocaleName)
    } else {
      const deviceLocale = (
        Platform.OS === 'web'
          ? navigator.language || navigator.userLanguage
          : Platform.OS === 'ios'
          ? NativeModules.SettingsManager.settings.AppleLocale ||
            NativeModules.SettingsManager.settings.AppleLanguages[0]
          : Platform.OS === 'android'
          ? NativeModules.I18nManager.localeIdentifier
          : 'pt'
      ).substring(0, 2)

      const isExistingLocale = localeNames.some(item => item === deviceLocale)

      setLocaleName(isExistingLocale ? deviceLocale : 'pt')
    }
  }, [])

  const prepare = useCallback(async () => {
    try {
      await handleLocale()
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }, [handleLocale])

  useEffect(() => {
    if (loading) {
      prepare()
    }
  }, [loading, prepare])

  return (
    <LocalesContext.Provider value={{ loading, localeName, setLocaleName, t }}>
      {children}
    </LocalesContext.Provider>
  )
}
