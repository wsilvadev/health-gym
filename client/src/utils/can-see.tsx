import { ReactNode } from 'react'

import { useAuthorization } from 'src/hooks/use-authorization'
import { Role } from 'src/types/user'

type Props = {
  children: ReactNode
  errorReturn?: undefined
  needAll?: boolean
  needAllPermissions?: boolean
  needAllRoles?: boolean
  permissions?: string[]
  roles?: Role[]
}

export function CanSee(props: Props) {
  const {
    children,
    roles,
    permissions,
    needAll,
    needAllRoles,
    needAllPermissions,
    errorReturn = null,
  } = props

  const { authorized, message } = useAuthorization({
    needAll,
    needAllPermissions,
    needAllRoles,
    permissions,
    roles,
    unauthorizedMessage: true,
  })

  if (!authorized) {
    console.log(message)
    return errorReturn
  }

  return <>{children}</>
}
