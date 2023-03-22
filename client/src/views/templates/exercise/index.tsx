import {
  Box,
  Center,
  HStack,
  Heading,
  Icon,
  Image,
  Pressable,
  Text,
  VStack,
  View,
} from 'native-base'
import { Platform } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'

import { useNavigate } from 'src/router'
import { Button } from 'src/views/components'

export function ExerciseTemplate(): JSX.Element {
  const imgSize = Platform.OS === 'web' ? 900 : 400
  const goTo = useNavigate()

  return (
    <View flex={1}>
      <HStack alignItems="center" justifyContent="space-between" p={['4', '8']}>
        <Pressable onPress={() => goTo('../')}>
          <Icon as={Icons} name="chevron-left" color="green.500" size="xl" />
        </Pressable>

        <Heading fontSize={[24, 32]} color="white">
          Puxada Frontal
        </Heading>

        <Center>
          <Icon as={Icons} name="weight-lifter" color="gray.200" size="lg" />
          <Text color="gray.200" textTransform="capitalize">
            costas
          </Text>
        </Center>
      </HStack>

      <VStack p="8">
        <Image
          w="full"
          h={80}
          source={{
            uri: `https://img.freepik.com/free-photo/people-working-out-indoors-together-with-dumbbells_23-2149175410.jpg?w=${imgSize}`,
          }}
          alt="Pessoas malhando"
          resizeMode="cover"
          rounded="lg"
        />

        <Box bg="gray.600" rounded="md" p="4" mt="2">
          <HStack alignItems="center" justifyContent="space-evenly" mb="4">
            <HStack alignItems="center">
              <Icon as={Icons} name="dumbbell" color="green.500" size="xl" mr="2" />
              <Text color="gray.200">3 series</Text>
            </HStack>
            <HStack alignItems="center">
              <Icon as={Icons} name="replay" color="green.500" size="xl" mr="2" />
              <Text color="gray.200">12 repetições</Text>
            </HStack>
          </HStack>
          <Button title="Marcar como realizado" />
        </Box>
      </VStack>
    </View>
  )
}
