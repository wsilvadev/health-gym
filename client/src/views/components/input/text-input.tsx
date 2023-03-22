import {
  FormControl,
  IInputProps,
  Icon,
  Input,
  Pressable,
  WarningOutlineIcon,
} from 'native-base'
import { useState } from 'react'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'

export type TextInputProps = IInputProps & {
  feedback?: string
  icon?: string
  isRequired?: boolean
  label?: string
  secureEntry?: boolean
}

export const TextInput = ({
  feedback,
  icon,
  onBlur,
  onChangeText,
  secureEntry,
  label,
  isRequired,
  value = '',
  ...rest
}: TextInputProps) => {
  const [show, setShow] = useState(secureEntry)

  return (
    <FormControl isInvalid={!!feedback} isRequired={isRequired} mx="0" my="1">
      <FormControl.Label>{label}</FormControl.Label>

      <Input
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        type={show ? 'password' : 'text'}
        InputLeftElement={
          icon ? (
            <Icon as={<Icons name={icon} />} size={5} ml="2" color="muted.400" />
          ) : undefined
        }
        InputRightElement={
          secureEntry ? (
            <Pressable onPress={() => setShow(!show)}>
              <Icon
                as={<Icons name={show ? 'eye-outline' : 'eye-off-outline'} />}
                size={5}
                mr="2"
                color="muted.400"
              />
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
