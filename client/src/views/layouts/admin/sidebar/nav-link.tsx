import { Text, View } from 'native-base'
import { Icon as IconType } from 'phosphor-react-native'

import { Link, LinkProps } from 'src/router'

type Props = LinkProps & {
  icon: IconType
}

export function NavLink({ icon: PhosphorIcon, children, ...rest }: Props) {
  return (
    <Link {...rest}>
      <View flexDir="row">
        <PhosphorIcon color="#a3a3a3" />
        <Text color="gray.100" ml="4" fontWeight="medium">
          {children}
        </Text>
      </View>
    </Link>
  )
}
