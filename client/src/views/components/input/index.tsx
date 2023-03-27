import { Control, Controller, FieldValues, Path } from 'react-hook-form'

import { TextInput, TextInputProps } from './text-input'

type InputProps<T extends FieldValues> = TextInputProps & {
  control: Control<T, string>
  name: Path<T>
}

// type InputProps<T> = TextInputProps & {
//   control: Control<T, any>
//   name: string
// }

// type InputProps<FV extends Record<string, any>> = TextInputProps & {
//   control: Control<FV>
//   name: FieldName<FV>
// }

export function Input<T extends FieldValues>({
  name,
  control,
  ...rest
}: InputProps<T>): JSX.Element {
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
