import ImagePicker from 'react-native-image-picker'

export function openCamera() {
  return ImagePicker.launchCamera({ mediaType: 'photo' })
}

export function openLibrary() {
  return ImagePicker.launchImageLibrary({ mediaType: 'photo' })
}
