import {NativeModules} from 'react-native'

import {
  Callback,
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
} from '../types'

const DEFAULT_OPTIONS: ImageLibraryOptions & CameraOptions = {
  cameraType: 'back',
  durationLimit: 0,
  includeBase64: false,
  includeExtra: false,
  maxHeight: 0,
  maxWidth: 0,
  mediaType: 'photo',
  presentationStyle: 'pageSheet',
  quality: 1,
  saveToPhotos: false,
  selectionLimit: 1,
  videoQuality: 'high',
}

// @ts-ignore We want to check whether __turboModuleProxy exitst, it may not
const isTurboModuleEnabled = global.__turboModuleProxy != null

const nativeImagePicler = isTurboModuleEnabled ?
  require("./NativeImagePicker").default :
  NativeModules.ImagePicker

export function camera(
  options: CameraOptions,
  callback?: Callback,
): Promise<ImagePickerResponse> {
  return new Promise((resolve) => {
    nativeImagePicler.launchCamera(
      {...DEFAULT_OPTIONS, ...options},
      (result: ImagePickerResponse) => {
        if (callback) callback(result)
        resolve(result)
      },
    )
  })
}

export function imageLibrary(
  options: ImageLibraryOptions,
  callback?: Callback,
): Promise<ImagePickerResponse> {
  return new Promise((resolve) => {
    nativeImagePicler.launchImageLibrary(
      {...DEFAULT_OPTIONS, ...options},
      (result: ImagePickerResponse) => {
        if (callback) callback(result)
        resolve(result)
      },
    )
  })
}
