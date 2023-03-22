/*
interface User {
  id: number
  name: string
  email: string
  age: number
}


type EditUser = EditFieldsFromObjectType<User, 'name' | 'email'>

EditUser is equivalent to:
{
  name?: string
  email?: string
}
*/

export type EditObjectType<T> = Partial<T>

export type EditFieldsFromObjectType<T, K extends keyof T> = Partial<Pick<T, K>>

export type EditAnotherFieldsFromObjectType<T, K extends keyof T> = Partial<Omit<T, K>>
