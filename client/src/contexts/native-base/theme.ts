import { extendTheme } from 'native-base'

export const theme = extendTheme({
  colors: {
    gray: {
      100: '#E1E1E6',
      200: '#C4C4CC',
      300: '#7C7C8A',
      400: '#323238',
      500: '#29292E',
      600: '#202024',
      700: '#121214'
    },
    green: {
      500: '#00B37E',
      700: '#00875F',
    },
    red: {
      500: '#F75A68'
    },
    white: '#FFFFFF'
  },
  fontSizes: {
    lg: 18,
    md: 16,
    sm: 14,
    xl: 20,
    xs: 12,
  },
  fonts: {
    body: 'Roboto',
    heading: 'Roboto'
    // body: 'Roboto_400Regular',
    // heading: 'Roboto_700Bold',
  },
  sizes: {
    14: 56,
    33: 148
  }
})