import { IButtonProps, Button as NBButton, Text } from 'native-base'

type Props = IButtonProps & {
  title: string
  variant?: 'outline'
}

export function Button({ title, variant, ...rest }: Props): JSX.Element {
  const isOutline = variant === 'outline'
  const actionBg = isOutline ? 'gray.400' : 'green.500'

  return (
    <NBButton
      w="full"
      borderColor="green.500"
      borderWidth={variant === 'outline' ? 1 : 0}
      bg={isOutline ? 'transparent' : 'green.700'}
      h={14}
      _pressed={{ bg: actionBg }}
      _hover={{ bg: actionBg }}
      {...rest}>
      <Text fontFamily="heading" color={isOutline ? 'green.500' : 'white'}>
        {title}
      </Text>
    </NBButton>
  )
}
