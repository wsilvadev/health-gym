import {
  HStack,
  Heading,
  IPressableProps,
  Icon,
  Image,
  Pressable,
  Text,
  View,
} from 'native-base'
import { CaretRight } from 'phosphor-react-native'

export type ExerciseCardProps = IPressableProps & {
  description: string
  imageUri: string
  name: string
}

export function ExerciseCard({
  description,
  imageUri,
  name,
  ...rest
}: ExerciseCardProps): JSX.Element {
  return (
    <Pressable {...rest}>
      <HStack bg="gray.500" alignItems="center" rounded="md" p={2} mb={3}>
        <Image
          source={{ uri: imageUri }}
          alt={`Image about ${name}`}
          w={16}
          h={16}
          rounded="md"
          mr={4}
          resizeMode="center"
        />

        <View flex={1}>
          <Heading fontSize="lg" color="white">
            {name}
          </Heading>
          <Text fontSize="sm" color="gray.200" numberOfLines={2} maxW="auto">
            {description}
          </Text>
        </View>

        <Icon as={CaretRight} color="gray.200" size="lg" />
      </HStack>
    </Pressable>
  )
}
