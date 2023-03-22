/*
  // https://github.com/colinhacks/zod/issues/53
  
  import { z } from 'src/utils/zod'

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
import zod from 'zod'

type AnyObj = Record<PropertyKey, unknown>

export type ZodObj<T extends AnyObj> = {
  [key in keyof T]: zod.ZodType<T[key]>
}

const obj = <T extends AnyObj>(arg: ZodObj<T>) => zod.object(arg)

export const z = { obj, ...zod }
