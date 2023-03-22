import { Flex, ScrollView } from 'native-base'

import { Outlet } from 'src/router'

import { Header } from './header'
import { Sidebar } from './sidebar'

export function MainLayout() {
  return (
    <ScrollView flex={1} mx="auto" w="100%" maxW={1480} h="full">
      <Header />

      <Flex flex={1} flexDir="row" w="100%" my="6" px="6">
        <Sidebar />
        <Outlet />
      </Flex>
    </ScrollView>
  )
}
