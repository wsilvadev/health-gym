import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Swiper from 'react-native-web-swiper'

export class GalleryScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Swiper
            from={1}
            minDistanceForAction={0.1}
            controlsProps={{
              PrevComponent: ({ onPress }) => (
                <TouchableOpacity onPress={onPress}>
                  <Text style={{ color: 'white', fontSize: 24, fontWeight: '500' }}>
                    {'<'}
                  </Text>
                </TouchableOpacity>
              ),
              dotsTouchable: true,
              nextPos: 'right',
              nextTitle: '>',
              nextTitleStyle: { color: 'red', fontSize: 24, fontWeight: '500' },
              prevPos: 'left',
            }}>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: 'rgba(20,20,200,0.3)',
                flex: 1,
                justifyContent: 'center',
              }}>
              <Text>Slide 1</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: 'rgba(20,200,20,0.3)',
                flex: 1,
                justifyContent: 'center',
              }}>
              <Text>Slide 2</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: 'rgba(200,20,20,0.3)',
                flex: 1,
                justifyContent: 'center',
              }}>
              <Text>Slide 3</Text>
            </View>
          </Swiper>
        </View>
        <View style={{ flex: 1 }}>
          <Swiper
            vertical
            loop
            timeout={-2.5}
            controlsProps={{
              cellsContent: {
                'bottom-left': <Text>SOME LOGO</Text>,
              },
              dotActiveStyle: { backgroundColor: 'red' },
            }}>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: 'rgba(20,20,200,0.3)',
                flex: 1,
                justifyContent: 'center',
              }}>
              <Text>Slide 1</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: 'rgba(20,200,20,0.3)',
                flex: 1,
                justifyContent: 'center',
              }}>
              <Text>Slide 2</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: 'rgba(200,20,20,0.3)',
                flex: 1,
                justifyContent: 'center',
              }}>
              <Text>Slide 3</Text>
            </View>
          </Swiper>
        </View>
      </View>
    )
  }
}
