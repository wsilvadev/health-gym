import { Text, View } from 'native-base'
import { StyleSheet } from 'react-native'
import Swiper, { SwiperProps } from 'react-native-swiper'

type Props = SwiperProps & {}

export function ImageGallery({ ...rest }: Props) {
  // const [currentIndex, setCurrentIndex] = useState(0)

  // const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
  //   const { contentOffset } = event.nativeEvent
  //   const index = Math.floor(contentOffset.x / width)
  //   setCurrentIndex(index)
  // }

  // const images = [
  //   'https://picsum.photos/id/1/400/600',
  //   'https://picsum.photos/id/2/500/700',
  //   'https://picsum.photos/id/3/600/800',
  //   'https://picsum.photos/id/4/500/800',
  //   'https://picsum.photos/id/5/700/700',
  // ]

  return (
    <View style={styles.container}>
      <Swiper {...rest}>
        <View style={[styles.slideContainer, styles.slide1]}>
          <Text>Slide 1</Text>
        </View>
        <View style={[styles.slideContainer, styles.slide2]}>
          <Text>Slide 2</Text>
        </View>
        <View style={[styles.slideContainer, styles.slide3]}>
          <Text>Slide 3</Text>
        </View>
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  slide1: {
    backgroundColor: 'rgba(20,20,200,0.3)',
    width: '100%',
  },
  slide2: {
    backgroundColor: 'rgba(20,200,20,0.3)',
    width: '100%',
  },
  slide3: {
    backgroundColor: 'rgba(200,20,20,0.3)',
    width: '100%',
  },
  slideContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
})

// const styles = StyleSheet.create({
//   buttonText: {
//     color: 'white',
//     fontSize: 50,
//   },
//   buttonWrapperStyle: {
//     alignItems: 'center',
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     left: 0,
//     paddingHorizontal: 10,
//     paddingVertical: 20,
//     position: 'absolute',
//     top: 0,
//     width: '100%',
//   },
//   image: {
//     height: '100%',
//     width: '100%',
//   },
//   slide: {
//     alignItems: 'center',
//     backgroundColor: '#9DD6EB',
//     flex: 1,
//     justifyContent: 'center',
//   },
//   wrapper: {},
// })
