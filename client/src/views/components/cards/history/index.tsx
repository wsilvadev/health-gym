import { HStack, Heading, Text, View } from 'native-base'

export function HistoryCard(): JSX.Element {
  return (
    <HStack
      w="full"
      px={5}
      py={4}
      mb={3}
      bg="gray.600"
      rounded="md"
      alignItems="center">
      <View flex={1} mr="3">
        <Heading color="white" fontSize="md" textTransform="capitalize">
          Costas
        </Heading>
        <Text color="gray.100" fontSize="lg" numberOfLines={1}>
          Puxada
        </Text>
      </View>

      <Text color="gray.100" fontSize="md">
        08:56
      </Text>
    </HStack>
  )
}
