import React, { useEffect, useState } from 'react'
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native'

type Item = {
  id: number
  uri: string
}

export function ImageGallery(): JSX.Element {
  const [images, setImages] = useState<Item[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const { width } = useWindowDimensions()

  useEffect(() => {
    // Load images
    setImages([
      { id: 1, uri: 'https://picsum.photos/id/1/700/700' },
      { id: 2, uri: 'https://picsum.photos/id/2/700/700' },
      { id: 3, uri: 'https://picsum.photos/id/3/700/700' },
      { id: 4, uri: 'https://picsum.photos/id/4/700/700' },
      { id: 5, uri: 'https://picsum.photos/id/5/700/700' },
    ])

    // Auto run
    const interval = setInterval(() => {
      setCurrentIndex(currentIndex => (currentIndex + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const renderItem = ({ item }: { item: Item }) => (
    <View style={[styles.imageContainer, { width }]}>
      <Image source={{ uri: item.uri }} style={[styles.image, { width }]} />
    </View>
  )

  return (
    <FlatList
      data={images}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      horizontal
      pagingEnabled={Platform.OS !== 'web'}
      showsHorizontalScrollIndicator={false}
      initialScrollIndex={0}
      onMomentumScrollEnd={event => {
        const index = Math.round(
          event.nativeEvent.contentOffset.x /
            event.nativeEvent.layoutMeasurement.width
        )
        setCurrentIndex(index)
      }}
      extraData={currentIndex}
      getItemLayout={(data, index) => ({
        index,
        length: width,
        offset: width * index,
      })}
      initialNumToRender={3}
      windowSize={3}
    />
  )
}

const styles = StyleSheet.create({
  image: {
    height: 500,
    resizeMode: 'contain',
  },
  imageContainer: {
    alignItems: 'center',
    height: 'auto',
    justifyContent: 'center',
  },
})
