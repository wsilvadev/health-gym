/* https://www.reactnative.express/app/gestures/pan_responder

  import { usePanResponder } from 'src/hooks/use-pan-responder'

  export default function App() {
  const [state, panHandlers] = usePanResponder()

  const { dragging, initialY, initialX, offsetY, offsetX } = state

  const style = {
    backgroundColor: dragging ? '#2DC' : '#0BA',
    transform: [
      { translateX: initialX + offsetX },
      { translateY: initialY + offsetY },
    ],
  }

  return (
    <View style={styles.container}>
      <View
        // Put all panHandlers into the View's props
        {...panHandlers}
        style={[styles.square, style]}
      >
        <Text style={styles.text}>DRAG ME</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  square: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

*/
import { useReducer, useRef } from 'react'
import { GestureResponderEvent, PanResponder, PanResponderGestureState } from 'react-native'

const types = {
  END: 'END',
  MOVE: 'MOVE',
  START: 'START',
}

export const actionCreators = {
  end: (point: any) => ({ payload: point, type: types.END }),
  move: (point: any) => ({ payload: point, type: types.MOVE }),
  start: () => ({ type: types.START }),
}

export const initialState = {
  dragging: false,
  initialX: 50,
  initialY: 50,
  offsetX: 0,
  offsetY: 0,
}

export function reducer(state: any, action: any) {
  switch (action.type) {
    case types.START: {
      return { ...state, dragging: true }
    }
    // Keep track of how far we've moved in total
    case types.MOVE: {
      const { x, y } = action.payload
      return {
        ...state,
        offsetX: x,
        offsetY: y,
      }
    }
    // The drag is finished. Set the initialY and initialX so that
    // the new position sticks. Reset offsetY and offsetX for the next drag.
    case types.END: {
      const { x, y } = action.payload
      return {
        ...initialState,
        initialX: state.initialX + x,
        initialY: state.initialY + y,
      }
    }
  }
}

export function usePanResponder() {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Should we claim the interaction lock when the user presses down on the square?
  const handleStartShouldSetPanResponder = () => true

  // We were granted the interaction lock, so start the drag!
  const handlePanResponderGrant = () => {
    dispatch(actionCreators.start())
  }

  // Every time the touch/mouse moves, update the drag.
  const handlePanResponderMove = (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    dispatch(actionCreators.move({ x: gestureState.dx, y: gestureState.dy }))
  }

  // When the touch/mouse is lifted, end the drag.
  const handlePanResponderEnd = (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    dispatch(actionCreators.end({ x: gestureState.dx, y: gestureState.dy }))
  }

  const panResponder = useRef(
    PanResponder.create({
      onPanResponderGrant: handlePanResponderGrant,
      onPanResponderMove: handlePanResponderMove,
      onPanResponderRelease: handlePanResponderEnd,
      onPanResponderTerminate: handlePanResponderEnd,
      onStartShouldSetPanResponder: handleStartShouldSetPanResponder,
    })
  )

  return [state, panResponder.current.panHandlers]
}