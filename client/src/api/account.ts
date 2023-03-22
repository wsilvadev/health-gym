import type { SignInInput, SignInResponse, SignUpInput } from 'src/types/account'

import { api } from './core'

class AccountApi {
  public async register({ email, name, password }: SignUpInput) {
    return api.post<void>('/users', { email, name, password })
  }
  
  public async login({ email, password }: SignInInput) {
    return api.post<SignInResponse>('/auth', { email, password })
  }

  public async logout() {
    return api.post('logout', null)
  }
}

export const accountApi = new AccountApi()
