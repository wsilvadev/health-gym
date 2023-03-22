import { Text } from 'native-base'

export function Logo() {
  return (
    <Text color="gray.100" fontSize={['2xl', '3xl', '4xl']} fontWeight="bold">
      RNW
      <Text color="orange.500" ml="1">
        .
      </Text>
    </Text>
  )
}
