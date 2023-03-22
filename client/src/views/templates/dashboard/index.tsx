import { Text, View } from 'native-base'

import { usePanResponder } from 'src/hooks/use-pan-responder'
import { Link } from 'src/router'

export function DashboardTemplate(): JSX.Element {
  const [state, panHandlers] = usePanResponder()

  const { dragging, initialY, initialX, offsetY, offsetX } = state

  const style = {
    backgroundColor: dragging ? '#999999' : '#555555',
    transform: [
      { translateX: initialX + offsetX },
      { translateY: initialY + offsetY },
    ],
  }

  return (
    <View
      flex={1}
      justifyContent="center"
      alignItems="center"
      bg="amber.200"
      w="100%"
      h="100vh">
      <Text fontWeight="semibold" fontSize={32}>
        dashboard
      </Text>

      <View
        // Put all panHandlers into the View's props
        w={100}
        h={100}
        rounded={true}
        justifyContent="center"
        alignItems="center"
        style={style}
        {...panHandlers}>
        <Text>DRAG ME</Text>
      </View>

      <Link to="/">
        <Text>Go home</Text>
      </Link>
    </View>
  )
}
