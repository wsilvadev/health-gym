import { useRef, useState } from 'react'
import { Animated, PanResponder, StyleSheet, Text, View } from 'react-native'

export function DragAndDrop() {
  const [layout, setLayout] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const panResponder = PanResponder.create({
    onPanResponderGrant: () => {
      setDragging(true)
    },
    onPanResponderMove: (event, gesture) => {
      setLayout({
        x: layout.x + gesture.dx,
        y: layout.y + gesture.dy,
      })
    },
    onPanResponderRelease: () => {
      setDragging(false)
    },
    onStartShouldSetPanResponder: () => true,
  })

  return (
    <View style={styles.container}>
      <View
        {...panResponder.panHandlers}
        style={[
          styles.box,
          dragging && styles.dragging,
          { transform: [{ translateX: layout.x }, { translateY: layout.y }] },
        ]}>
        <Text style={styles.text}>Drag me!</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    backgroundColor: 'blue',
    height: 100,
    justifyContent: 'center',
    width: 100,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  dragging: {
    opacity: 0.5,
  },
  text: {
    color: 'white',
  },
})
