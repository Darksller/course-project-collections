import { UserComment } from '@/schemas/dbSchemas'
import { Dispatch, SetStateAction } from 'react'
import { io } from 'socket.io-client'

export const socket = io(import.meta.env.VITE_API_URL)

export const joinRoom = (itemId: string) => {
  socket.emit('joinRoom', itemId)
}

export const onComment = (
  setComments: Dispatch<SetStateAction<UserComment[]>>,
) => {
  socket.on('onComment', (data: UserComment) => {
    setComments((prev) => [...prev, data])
  })
}

export const sendComment = (itemId: string, data: UserComment) => {
  socket.emit('newComment', itemId, data)
}
