import { Center, HStack, Image, ScrollView, Text, View } from 'native-base'
import { ReactNode, useState } from 'react'
import { Platform } from 'react-native'
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper'

import backgroundImg from 'src/assets/background.png'
import LogoSvg from 'src/assets/logo.svg'
import { useLocales } from 'src/hooks'
import { Select } from 'src/views/components'
import { Fade, Translate } from 'src/views/components/animations'

type Props = {
  children: ReactNode
  message: string
}

export function AccountContainer({ children, message }: Props): JSX.Element {
  const isWeb = Platform.OS === 'web'
  const RandomAnimation = Math.floor(Math.random() * 10) % 2 ? Translate : Fade
  const [animationApplied, setAnimationApplied] = useState(false)
  const { localeName, setLocaleName } = useLocales()

  const languages = [
    { label: 'English', value: 'en' },
    { label: 'Español', value: 'es' },
    { label: 'Português', value: 'pt' },
  ]
  return (
    <View h="full">
      <Image
        source={backgroundImg}
        defaultSource={backgroundImg}
        alt="Pessoas treinando"
        position="absolute"
        minW="100%"
        minH={isWeb ? '100%' : '140%'}
      />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={isWeb}
        mt={`${getStatusBarHeight()}px`}
        mb={`${getBottomSpace()}px`}>
        <HStack w="100%" justifyContent="flex-end" pt="4" pr="4" zIndex={1}>
          <Select
            label="Selecione"
            data={languages}
            selectedItem={
              localeName
                ? languages.find(({ value }) => value === localeName)
                : undefined
            }
            onSelectItem={({ value }) => setLocaleName(value)}
          />
        </HStack>
        <RandomAnimation
          enableAnimation={!animationApplied}
          onEndAnimation={() => setAnimationApplied(true)}>
          <Center
            minH={isWeb ? '100vh' : 'full'}
            minW={isWeb ? '100vw' : 'full'}
            gap="10"
            px="6"
            pb="16">
            <Center>
              <LogoSvg />
              <Text color="gray.100" fontSize="sm">
                {message}
              </Text>
            </Center>

            {children}
          </Center>
        </RandomAnimation>
      </ScrollView>
    </View>
  )
}
