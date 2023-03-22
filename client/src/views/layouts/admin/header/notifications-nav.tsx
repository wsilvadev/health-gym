import {HStack, Icon} from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export function NotificationsNav() {
  return (
    <HStack
      mx="8"
      pr={[0, 8]}
      py="1"
      color="gray.300"
      borderRightWidth={[0, 1]}
      borderColor="gray.700"
    >
      <Icon as={MaterialIcons} name="bell-outline" size="lg" mr={2} />
      <Icon as={MaterialIcons} name="account-multiple-plus-outline" size="lg" />
    </HStack>
  )
}
