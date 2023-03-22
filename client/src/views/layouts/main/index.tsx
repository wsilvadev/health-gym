import { View, useBreakpointValue } from 'native-base'

import { Outlet } from 'src/router'

import { Header } from './header'
import { NavBar } from './nav-bar'

export function MainLayout() {
  const isLargeScreen = useBreakpointValue({ lg: true, md: false })

  return (
    <View flex={1}>
      <Header isLargeScreen={isLargeScreen} />
      <Outlet />
      {!isLargeScreen ? <NavBar /> : null}
    </View>
  )
}
