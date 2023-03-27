import { HStack, Heading, Text, View } from 'native-base'

export type HistoryCardProps = {
  date: string
  description: string
  title: string
}

export function HistoryCard({
  date,
  description,
  title,
}: HistoryCardProps): JSX.Element {
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
          {title}
        </Heading>
        <Text color="gray.100" fontSize="lg" numberOfLines={1}>
          {description}
        </Text>
      </View>

      <Text color="gray.100" fontSize="md">
        {date}
      </Text>
    </HStack>
  )
}
