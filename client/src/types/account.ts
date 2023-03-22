import { EditObjectType } from 'src/utils/typescript'

import { UserOmittedPassword } from './user'

export type ForgotPasswordInput = {
  email: string
}

export type SignInInput = ForgotPasswordInput & {
  password: string
}

export type SignUpInput = SignInInput & {
  name: string,
  password_confirmation: string
}

export type EditProfileInput = EditObjectType<SignUpInput> & {
  current_password?: string
}

export type TokensResponse = {
  access_token: string
  refresh_token: string
}

export type SignInResponse = {
  tokens: TokensResponse,
  user: UserOmittedPassword
}
