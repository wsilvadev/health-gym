import React, { useState } from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native'

const { width } = Dimensions.get('window')

export function ImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = event.nativeEvent
    const index = Math.floor(contentOffset.x / width)
    setCurrentIndex(index)
  }

  const images = [
    'https://picsum.photos/id/1/400/600',
    'https://picsum.photos/id/2/500/700',
    'https://picsum.photos/id/3/600/800',
    'https://picsum.photos/id/4/500/800',
    'https://picsum.photos/id/5/700/700',
  ]

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item: uri }) => (
          <Image source={{ uri }} style={styles.image} />
        )}
      />
      <View style={styles.indexContainer}>
        {images.map((_, index) => (
          <View
            key={`${index}`}
            style={[styles.index, index === currentIndex && styles.currentIndex]}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  currentIndex: {
    backgroundColor: '#333',
  },
  image: {
    height: 300,
    width,
  },
  index: {
    backgroundColor: '#ccc',
    borderRadius: 4,
    height: 8,
    marginHorizontal: 8,
    width: 8,
  },
  indexContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
})
