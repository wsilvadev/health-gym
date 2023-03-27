import { Control, Controller } from 'react-hook-form'

import { TextInput, TextInputProps } from './text-input'

type InputProps = TextInputProps & {
  control: Control<any, any>
  name: string
}

// type InputProps<FV extends Record<string, any>> = TextInputProps & {
//   control: Control<FV>
//   name: FieldName<FV>
// }

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
