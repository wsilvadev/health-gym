import { FlatList, View } from 'native-base'
import { useState } from 'react'
import { Platform } from 'react-native'

import { useNavigate } from 'src/router'
import { Group } from 'src/views/components'
import { ExerciseCard, ExerciseCardProps } from 'src/views/components/cards/exercise'

const groupNames = ['costas', 'ombros', 'bíceps', 'tríceps']
const exerciseCardsData: ExerciseCardProps[] = [
  {
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius dignissimos fuga dolore molestias ullam sint nisi aliquam magnam, ipsam itaque mollitia voluptatibus earum, tenetur deserunt praesentium fugiat perferendis quo illum!',
    imageUri:
      'https://blog.fitradar.me/wp-content/uploads/2019/01/fitness_girl_are_amazing-300x300.png',
    name: 'Remana unilateral1',
  },
  {
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius dignissimos fuga dolore molestias ullam sint nisi aliquam magnam, ipsam itaque mollitia voluptatibus earum, tenetur deserunt praesentium fugiat perferendis quo illum!',
    imageUri:
      'https://blog.fitradar.me/wp-content/uploads/2019/01/fitness_girl_are_amazing-300x300.png',
    name: 'Remana unilateral2',
  },
  {
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius dignissimos fuga dolore molestias ullam sint nisi aliquam magnam, ipsam itaque mollitia voluptatibus earum, tenetur deserunt praesentium fugiat perferendis quo illum!',
    imageUri:
      'https://blog.fitradar.me/wp-content/uploads/2019/01/fitness_girl_are_amazing-300x300.png',
    name: 'Remana unilateral3',
  },
  {
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius dignissimos fuga dolore molestias ullam sint nisi aliquam magnam, ipsam itaque mollitia voluptatibus earum, tenetur deserunt praesentium fugiat perferendis quo illum!',
    imageUri:
      'https://blog.fitradar.me/wp-content/uploads/2019/01/fitness_girl_are_amazing-300x300.png',
    name: 'Remana unilateral4',
  },
  {
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius dignissimos fuga dolore molestias ullam sint nisi aliquam magnam, ipsam itaque mollitia voluptatibus earum, tenetur deserunt praesentium fugiat perferendis quo illum!',
    imageUri:
      'https://blog.fitradar.me/wp-content/uploads/2019/01/fitness_girl_are_amazing-300x300.png',
    name: 'Remana unilateral5',
  },
  {
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius dignissimos fuga dolore molestias ullam sint nisi aliquam magnam, ipsam itaque mollitia voluptatibus earum, tenetur deserunt praesentium fugiat perferendis quo illum!',
    imageUri:
      'https://blog.fitradar.me/wp-content/uploads/2019/01/fitness_girl_are_amazing-300x300.png',
    name: 'Remana unilateral6',
  },
  {
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius dignissimos fuga dolore molestias ullam sint nisi aliquam magnam, ipsam itaque mollitia voluptatibus earum, tenetur deserunt praesentium fugiat perferendis quo illum!',
    imageUri:
      'https://blog.fitradar.me/wp-content/uploads/2019/01/fitness_girl_are_amazing-300x300.png',
    name: 'Remana unilateral7',
  },
]

export function HomeTemplate(): JSX.Element {
  const [selected, setSelected] = useState('costas')
  const isWeb = Platform.OS === 'web'
  const navTo = useNavigate()

  return (
    <View flex={1}>
      <FlatList
        data={groupNames}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={selected === item}
            onPress={() => setSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={isWeb}
        maxH={isWeb ? 14 : 10}
        my={5}
        _contentContainerStyle={{ px: 8 }}
      />

      <FlatList
        data={exerciseCardsData}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <ExerciseCard {...item} onPress={() => navTo('exercise')} />
        )}
        showsVerticalScrollIndicator={isWeb}
        flex={1}
        mb={2}
        _contentContainerStyle={{ pb: 28, pt: 2, px: 8 }}
      />
    </View>
  )
}
