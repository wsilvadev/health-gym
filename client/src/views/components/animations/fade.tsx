import { PresenceTransition } from 'native-base'
import { ReactNode } from 'react'
import { Platform } from 'react-native'

type Props = {
  children: ReactNode
  duration?: number
  enableAnimation?: boolean
  from?: number
  onEndAnimation?: () => void
  to?: number
}

export function Fade({
  children,
  duration = 1200,
  enableAnimation = true,
  from = 0,
  onEndAnimation,
  to = 1,
}: Props): JSX.Element {
  if (!enableAnimation) return <>{children}</>

  if (onEndAnimation) {
    setTimeout(onEndAnimation, duration)
  }

  if (Platform.OS === 'web') {
    const id = Math.floor(Math.random() * 100000)

    const style = `
    @keyframes fade-${id} {
      from { opacity: ${from}; }
      to { opacity: ${to}; }
    }
    .with-fade-${id} { 
      animation: fade-${id} ${duration}ms;
    }`

    return (
      <>
        <style>{style}</style>
        <div className={`with-fade-${id}`}>{children}</div>
      </>
    )
  }

  return (
    <PresenceTransition
      visible
      initial={{ opacity: from }}
      animate={{ opacity: to, transition: { duration } }}>
      {children}
    </PresenceTransition>
  )
}
