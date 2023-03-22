import {Flex, IconButton, useBreakpointValue} from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {useSetRecoilState} from 'recoil'

import {sidebarVisible} from 'src/atoms'

import {Logo} from './logo'
import {NotificationsNav} from './notifications-nav'
import {Profile} from './profile'
import {SearchBox} from './search-box'

export function Header() {
  const isMediumVersion = useBreakpointValue({base: false, md: true})
  const isWideVersion = useBreakpointValue({base: false, lg: true})
  const setVisible = useSetRecoilState(sidebarVisible)

  return (
    <Flex
      flexDir="row"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
      justify="space-between"
    >
      {!isMediumVersion ? (
        <IconButton
          rounded="lg"
          colorScheme="orange"
          variant="ghost"
          _icon={{
            as: MaterialIcons,
            name: 'menu',
          }}
          onPress={() => setVisible(true)}
        />
      ) : null}
      <Logo />
      {isMediumVersion ? <SearchBox /> : null}

      <Flex flexDir="row" align="center">
        <NotificationsNav />
        <Profile showProfileInfo={isWideVersion} />
      </Flex>
    </Flex>
  )
}
