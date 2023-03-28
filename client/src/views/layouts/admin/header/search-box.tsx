import { Flex, Icon, Input } from 'native-base'
import { MagnifyingGlass } from 'phosphor-react-native'

export function SearchBox() {
  return (
    <Flex
      flexDir="row"
      py="2"
      px="6"
      ml="6"
      w="100%"
      maxWidth={400}
      alignSelf="center"
      color="gray.200"
      position="relative"
      bg="gray.800"
      borderRadius="lg"
      alignItems="center">
      <Input
        flex={1}
        color="gray.50"
        variant="unstyled"
        px="4"
        mr="4"
        placeholder="Buscar na plataforma"
        fontSize={16}
      />

      <Icon as={MagnifyingGlass} color="gray.100" size="lg" />
    </Flex>
  )
}
