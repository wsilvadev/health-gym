import { Button, HStack, Icon, Text, View } from 'native-base'
import { ClockCounterClockwise, House, UserCircle } from 'phosphor-react-native'

import { useLocation, useNavigate } from 'src/router'

export type ItemProps = {
  icon: object
  label: string
  route: string
}

type Props = {
  isLargeScreen?: boolean
}

const items: ItemProps[] = [
  { icon: House, label: 'Home', route: '/' },
  { icon: ClockCounterClockwise, label: 'History', route: '/history' },
  { icon: UserCircle, label: 'Profile', route: '/profile' },
  // { icon: 'post-outline', label: 'Blog', route: '/blog' },
]

export function NavBar({ isLargeScreen }: Props): JSX.Element {
  const navTo = useNavigate()
  const location = useLocation()

  const Item = ({ route, label, icon }: ItemProps) => {
    const isCurrent = route === location.pathname

    return (
      <Button
        onPress={() => navTo(route)}
        variant="ghost"
        rounded="sm"
        h={isLargeScreen ? 42 : undefined}>
        <View
          justifyContent="center"
          alignItems="center"
          flexDir={isLargeScreen ? 'row' : 'column'}
          gap={isLargeScreen ? 2 : 0}>
          <Icon as={icon} size="xl" color={isCurrent ? 'green.500' : 'gray.200'} />
          <Text color={isCurrent ? 'green.500' : 'gray.200'}>{label}</Text>
        </View>
      </Button>
    )
  }

  return (
    <HStack justifyContent="space-evenly" w="100%" maxW={500} h={14} bg="gray.400">
      {items.map((item, i) => (
        <Item key={i} {...item} />
      ))}
    </HStack>
  )
}
