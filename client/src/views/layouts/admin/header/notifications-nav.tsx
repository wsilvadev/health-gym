import { HStack, Icon } from 'native-base'
import { Bell, Users } from 'phosphor-react-native'

export function NotificationsNav() {
  return (
    <HStack
      mx="8"
      pr={[0, 8]}
      py="1"
      color="gray.300"
      borderRightWidth={[0, 1]}
      borderColor="gray.700"
      gap="2">
      <Icon as={Bell} size="lg" />
      <Icon as={Users} size="lg" />
    </HStack>
  )
}
