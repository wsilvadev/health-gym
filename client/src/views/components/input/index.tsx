import { Control, Controller, FieldValues } from 'react-hook-form'

import { TextInput, TextInputProps } from './text-input'

type InputProps = TextInputProps & {
  control: Control<FieldValues, Object>
  name: string
}

export const Input = ({ name, control, ...rest }: InputProps): JSX.Element => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, onBlur } }) => (
        <TextInput
          onChangeText={onChange}
          value={!value ? undefined : value}
          onBlur={onBlur}
          {...rest}
        />
      )}
    />
  )
}
