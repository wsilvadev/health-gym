import { IPressableProps, Pressable, Text } from 'native-base'

type Props = IPressableProps & {
  isActive: boolean
  name: string
}

export function Group({ name, isActive, ...rest }: Props): JSX.Element {
  const onEventStyle = {
    borderColor: 'green.500',
    borderWidth: 1,
  }

  return (
    <Pressable
      mr={3}
      w={24}
      h={10}
      bg="gray.600"
      rounded="md"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      isPressed={isActive}
      _pressed={onEventStyle}
      _hover={onEventStyle}
      {...rest}>
      <Text
        fontWeight="bold"
        fontSize="xs"
        color={isActive ? 'green.500' : 'gray.200'}
        textTransform="uppercase">
        {name}
      </Text>
    </Pressable>
  )
}
