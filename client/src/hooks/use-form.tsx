/*
  // https://github.com/colinhacks/zod/issues/53
  
  type User = {
    name: string
    student: boolean
  }

  const goodUserSchema = z.obj<User>({
    name: z.string(),
    student: z.boolean()
  })
  
  const badUserSchema = z.obj<User>({
    name: z.string(),
    student: z.string() -> typescript error
  })

*/

import { zodResolver } from '@hookform/resolvers/zod'
import { DefaultValues, ValidationMode, useForm as _useForm } from 'react-hook-form'
import { ZodEffects, ZodObject, z } from 'zod'

type AnyObj = Record<PropertyKey, unknown>

type ZodObj<T extends AnyObj> = {
  [key in keyof T]: z.ZodType<T[key]>
}

export type ZodType = typeof z

export const useForm = <T extends { [key: string]: string }>({
  defaultValues,
  mode = 'onBlur',
  zodSchema,
}: {
  defaultValues: DefaultValues<T>
  mode?: keyof ValidationMode
  zodSchema: (z: ZodType) => ZodObject<ZodObj<T>> | ZodEffects<ZodObject<ZodObj<T>>>
}) => {
  const resolver = zodResolver(zodSchema(z))

  const { control, handleSubmit, formState, getValues, watch, reset } = _useForm({
    defaultValues,
    mode,
    resolver,
  })
  const { errors, isSubmitting, isValid } = formState

  const register = (name: keyof T) => ({
    control,
    feedback: errors[name]?.message ?? undefined,
    name,
  })

  const btnControl = {
    isDisabled: !isValid,
    isLoading: isSubmitting,
  }

  return {
    btnControl,
    getValues,
    handleSubmit,
    isSubmitting,
    register,
    reset,
    watch,
  }
}
