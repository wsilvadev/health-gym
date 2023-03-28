/*
  const [localeName, setLocaleName] = useState('pt')

  const languages = [
    { label: 'English', value: 'en' },
    { label: 'Español', value: 'es' },
    { label: 'Português', value: 'pt' },
  ]

  <Select
    label="Selecione"
    data={languages}
    selectedItem={
      localeName ? languages.find(({ value }) => value === localeName) : undefined
    }
    onSelect={({ value }) => setLocaleName(value as LocaleName)}
  />
*/
import { Box, Button, FlatList, Icon, Text } from 'native-base'
import { CaretDown, CaretUp } from 'phosphor-react-native'
import { useState } from 'react'
import { ListRenderItemInfo } from 'react-native'

type Item = {
  label: string
  value: string
}

type Props = {
  data: Item[]
  label: string
  minWidth?: number
  onSelectItem: (item: Item) => void
  selectedItem?: Item
}

export function Select({
  data,
  label,
  onSelectItem,
  selectedItem = undefined,
  minWidth = 130,
}: Props): JSX.Element {
  const [listVisible, setListVisible] = useState(false)

  const toggleOptions = () => {
    setListVisible(!listVisible)
  }

  const handleSelect = (item: Item) => {
    setListVisible(false)
    onSelectItem(item)
  }

  const renderItem = ({ item }: ListRenderItemInfo<Item>) => (
    <Button onPress={() => handleSelect(item)} colorScheme="gray" mt="1">
      <Text color="gray.200">{item.label}</Text>
    </Button>
  )

  return (
    <Box position="relative" justifyContent="center" alignItems="center" zIndex={10}>
      <Button
        minW={minWidth}
        variant="outline"
        colorScheme="gray"
        onPress={toggleOptions}>
        <Box flexDir="row" alignItems="center">
          <Text mr="2" color="gray.200">
            {selectedItem ? selectedItem.label : label}
          </Text>
          <Icon as={listVisible ? CaretUp : CaretDown} size="sm" color="gray.100" />
        </Box>
      </Button>

      {listVisible ? (
        <FlatList
          position="absolute"
          bg="gray.800"
          top={42}
          right={0}
          left={0}
          data={data}
          keyExtractor={item => item.label}
          renderItem={renderItem}
          scrollEnabled={false}
        />
      ) : null}
    </Box>
  )
}
