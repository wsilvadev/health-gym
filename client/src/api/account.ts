import type { SignInInput, SignInResponse } from 'src/types/account'

import { api } from './core'

class AccountApi {
  public async login({ email, password }: SignInInput) {
    return api.post<SignInResponse>('/auth', { email, password })
  }

  public async logout() {
    return api.post('logout', null)
  }
}

export const accountApi = new AccountApi()
