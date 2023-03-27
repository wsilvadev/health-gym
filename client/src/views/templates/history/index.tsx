import { Center, Heading, SectionList, Text, View } from 'native-base'

import { HistoryCard, HistoryCardProps } from 'src/views/components/cards/history'

type SectionData = {
  data: HistoryCardProps[]
  title: string
}

export function HistoryTemplate(): JSX.Element {
  const sectionsData: SectionData[] = [
    {
      data: [{ date: 'ksjdf', description: 'teste', title: 'Puxada frontal' }],
      title: '12.03.2023',
    },
  ]

  const emptyComponent = () => (
    <Center flex={1}>
      <Text color="white">Não há exercícios registrados ainda.</Text>
      <Heading color="white">Comece agora mesmo!</Heading>
    </Center>
  )

  return (
    <View flex={1}>
      <SectionList
        sections={sectionsData}
        keyExtractor={item => item.title}
        renderItem={({ item }) => <HistoryCard {...item} />}
        renderSectionHeader={({ section }) => (
          <Heading color="gray.200" fontSize="md" mt="10" mb="3">
            {section.title}
          </Heading>
        )}
        contentContainerStyle={
          !sectionsData.length && { flex: 1, justifyContent: 'center' }
        }
        ListEmptyComponent={emptyComponent}
        px={8}
      />
    </View>
  )
}
