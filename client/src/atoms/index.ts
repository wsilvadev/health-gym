import {atom} from 'recoil'
import {persistentAtom} from 'recoil-persistence/react-native'

import { SignInResponse } from 'src/types/account'
import { Role } from 'src/types/user'

export const defaultAuthenticationData = {
  tokens: {
    access_token: '',
    refresh_token: '',
  },
  user: {
    created_at: new Date(),
    email: '',
    id: '',
    name: '',
    password: '',
    permissions: [''],
    roles: [Role.USER],
    updated_at: new Date(),
  },
} as SignInResponse

export const authentication = persistentAtom({
  default: defaultAuthenticationData,
  key: '@atom.authentication',
})

export const sidebarVisible = atom({
  default: false,
  key: '@atom.sidebarVisible',
})
