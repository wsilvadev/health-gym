import { useState } from 'react'

export const useImagePicker = () => {
  const [files, setFiles] = useState<HTMLImageElement[]>([])

  const openCamera = () => {
    return
  }

  const openLibrary = () => {
    return
  }

  const deleteFile = (fileToDelete: HTMLImageElement) => {
    setFiles(files.filter(file => file !== fileToDelete))
  }

  return { deleteFile, files, openCamera, openLibrary }
}
