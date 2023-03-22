// import { useState } from 'react'
// import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker'

// export const useImagePicker = () => {
//   const [files, setFiles] = useState<ImagePickerResponse[]>([])

//   const openCamera = () =>
//     launchCamera({ mediaType: 'photo' })
//       .then(file => setFiles([file, ...files]))
//       .catch(err => console.log(err.message))

//   const openLibrary = () =>
//     launchImageLibrary({ mediaType: 'photo', selectionLimit: 5 })
//       .then(response => {
//         // filesData => setFiles([filesData, ...files])
//         console.log(response)
//       })
//       .catch(err => console.log(err.message))

//   const deleteFile = (fileToDelete: ImagePickerResponse) => {
//     setFiles(files.filter(file => file !== fileToDelete))
//   }

//   return { deleteFile, files, openCamera, openLibrary }
// }
