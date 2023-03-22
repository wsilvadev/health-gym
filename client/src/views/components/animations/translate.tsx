import { PresenceTransition } from 'native-base'
import { ReactNode } from 'react'
import { Platform } from 'react-native'

type Props = {
  children: ReactNode
  duration?: number
  enableAnimation?: boolean
  fromX?: number
  fromY?: number
  onEndAnimation?: () => void
  toX?: number
  toY?: number
}

export function Translate({
  children,
  duration = 1000,
  enableAnimation = true,
  fromX,
  fromY = 50,
  onEndAnimation,
  toX = 0,
  toY = 0,
}: Props): JSX.Element {
  if (!enableAnimation) return <>{children}</>

  if (onEndAnimation) {
    setTimeout(onEndAnimation, duration)
  }

  const id = Math.floor(Math.random() * 100000)
  fromX = fromX ?? id % 2 ? 50 : -50

  if (Platform.OS === 'web') {
    const style = `
    @keyframes translate-${id} {
      from { transform: translate(${fromX}px, ${fromY}px); }
      to { transform: translate(${toX}px, ${toY}px); }
    }
    .with-translate-${id} { 
      animation: translate-${id} ${duration}ms;
    }`

    return (
      <>
        <style>{style}</style>
        <div className={`with-translate-${id}`}>{children}</div>
      </>
    )
  }

  return (
    <PresenceTransition
      visible
      initial={{ translateX: fromX, translateY: fromY }}
      animate={{ transition: { duration }, translateX: toX, translateY: toY }}>
      {children}
    </PresenceTransition>
  )
}
