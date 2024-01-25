import { ChangeEvent, useState } from 'react'

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
  return { image, selectedFile, onSetImage, setImage, setFile }
}
