import {
  FormControl,
  IInputProps,
  Input,
  Pressable,
  View,
  WarningOutlineIcon,
} from 'native-base'
import { Eye, EyeSlash, Icon as IconType } from 'phosphor-react-native'
import { useState } from 'react'

export type TextInputProps = IInputProps & {
  feedback?: string
  icon?: IconType
  isRequired?: boolean
  label?: string
  secureEntry?: boolean
}

export const TextInput = ({
  feedback,
  icon: PhosphorIcon,
  onBlur,
  onChangeText,
  secureEntry,
  label,
  isRequired,
  value = '',
  ...rest
}: TextInputProps) => {
  const [show, setShow] = useState(secureEntry)

  const EyeIcon = show ? Eye : EyeSlash

  return (
    <FormControl isInvalid={!!feedback} isRequired={isRequired} mx="0" my="1">
      <FormControl.Label>{label}</FormControl.Label>

      <Input
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        type={show ? 'password' : 'text'}
        InputLeftElement={
          PhosphorIcon ? (
            <View ml="2">
              <PhosphorIcon color="#a3a3a3" />
            </View>
          ) : undefined
        }
        InputRightElement={
          secureEntry ? (
            <Pressable onPress={() => setShow(!show)} mr="2">
              <EyeIcon color="#a3a3a3" />
            </Pressable>
          ) : undefined
        }
        bg="gray.700"
        h={14}
        borderWidth={0}
        fontSize="md"
        fontFamily="body"
        color="white"
        placeholderTextColor="gray.300"
        _focus={{
          bg: 'gray.700',
          borderColor: 'green.500',
          borderWidth: 1,
        }}
        {...rest}
      />

      {feedback ? (
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {feedback}
        </FormControl.ErrorMessage>
      ) : null}
    </FormControl>
  )
}
