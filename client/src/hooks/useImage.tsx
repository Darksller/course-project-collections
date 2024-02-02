import { storage } from '@/constants/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { ChangeEvent, useState } from 'react'
import { v4 } from 'uuid'

export function useImage() {
  const [image, setImage] = useState<string>('')

  const [selectedFile, setFile] = useState<File>()

  function onSetImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFile(e.target.files[0])
      const url = URL.createObjectURL(e.target.files[0])
      setImage(url)
    }
  }

  const uploadImage = async (selectedFile: File) => {
    const imageRef = ref(storage, `images/${selectedFile.name + v4()}`)
    await uploadBytes(imageRef, selectedFile)
    return await getDownloadURL(imageRef)
  }

  return { image, selectedFile, onSetImage, setImage, setFile, uploadImage }
}
