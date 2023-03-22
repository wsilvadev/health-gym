import { ReactNode } from 'react'
import { RecoilRoot } from 'recoil'

import { LocalesProvider } from './locales'
import { NativeBaseContext } from './native-base'

type Props = {
  children: ReactNode
}

export function Contexts({ children }: Props) {
  return (
    <RecoilRoot>
      <NativeBaseContext>
        <LocalesProvider>{children}</LocalesProvider>
      </NativeBaseContext>
    </RecoilRoot>
  )
}
