import { Stack, Text, View } from 'native-base'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  title: string
  zIndex?: number
}

export function NavSection({ title, zIndex, children }: Props) {
  return (
    <View mb="8" zIndex={zIndex}>
      <Text fontWeight="bold" color="gray.400" fontSize="sm">
        {title}
      </Text>
      <Stack mt="6">{children}</Stack>
    </View>
  )
}
