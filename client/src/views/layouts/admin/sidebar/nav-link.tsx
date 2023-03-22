import { Icon, Text, View } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { Link, LinkProps } from 'src/router'

type Props = LinkProps & {
  icon: string
}

export function NavLink({ icon, children, ...rest }: Props) {
  return (
    <Link {...rest}>
      <View flexDir="row">
        <Icon as={MaterialIcons} name={icon} color="gray.100" size="lg" />
        <Text color="gray.100" ml="4" fontWeight="medium">
          {children}
        </Text>
      </View>
    </Link>
  )
}
