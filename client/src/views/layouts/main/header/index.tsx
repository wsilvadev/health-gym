import { Avatar, HStack, Heading, IconButton, Text, VStack } from 'native-base'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSetRecoilState } from 'recoil'

import { authentication, defaultAuthenticationData } from 'src/atoms'
import { useLocales } from 'src/hooks'
import { nameInitials } from 'src/utils/text-formatters'

import { NavBar } from '../nav-bar'

type Props = {
  isLargeScreen?: boolean
}

export function Header({ isLargeScreen }: Props): JSX.Element {
  const setAuthentication = useSetRecoilState(authentication)
  const { t } = useLocales()

  const name = 'Jardel Bordignon'

  return (
    <VStack>
      <HStack
        pt={`${getStatusBarHeight() + 16}px`}
        px="8"
        pb={isLargeScreen ? 0 : 4}
        bg="gray.400"
        justifyContent="space-between">
        <HStack>
          <Avatar source={{ uri: 'https://github.com/jardelbordignon.png' }} mr="4">
            {nameInitials(name)}
          </Avatar>

          <VStack>
            <Text color="gray.100" fontSize="md">
              {t('mGreeting2')}
            </Text>
            <Heading color="gray.100" fontSize="md">
              {name}
            </Heading>
          </VStack>
        </HStack>

        {isLargeScreen ? <NavBar isLargeScreen /> : null}

        <IconButton
          m={-2}
          rounded="full"
          colorScheme="gray"
          variant="ghost"
          _icon={{
            as: Icons,
            color: 'gray.200',
            name: 'logout',
            size: 'lg',
          }}
          onPress={() => setAuthentication(defaultAuthenticationData)}></IconButton>
      </HStack>
    </VStack>
  )
}
