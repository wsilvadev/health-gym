export enum Role {
  'ADMIN',
  'USER'
}

export type UserOmittedPassword = {
  created_at: Date,
  email: string,
  id: string,
  name: string,
  permissions: string[]
  roles: Role[],
  updated_at: Date
}
