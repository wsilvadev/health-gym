// https://github.com/GeekyAnts/nativebase-templates/blob/master/solito-universal-app-template-nativebase-typescript/packages/app/rnw-overrides.tsx
// override react-native types with react-native-web types
import 'react-native'

declare module 'react-native' {
  interface PressableStateCallbackType {
    focused?: boolean,
    hovered?: boolean
  }

  interface ViewStyle {
    transitionDuration?: string,
    transitionProperty?: string
  }

  interface TextProps {
    accessibilityComponentType?: never
    accessibilityTraits?: never
    href?: string
    hrefAttrs?: {
      rel: 'noreferrer'
      target?: '_blank'
    }
  }

  interface ViewProps {
    accessibilityRole?: string
    gap?: number | string,
    href?: string,
    hrefAttrs?: {
      rel: 'noreferrer'
      target?: '_blank'
    }
    onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  }

}