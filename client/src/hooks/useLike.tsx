import {
  useIsCollectionLikedMutation,
  useLikeCollectionMutation,
} from '@/api/usersApi'
import { User } from '@/schemas/dbSchemas'
import { useEffect, useState } from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

type UseIsLikedProps = {
  collectionId: string | undefined
}

export function useLike({ collectionId }: UseIsLikedProps) {
  const user = useAuthUser<User>()
  const [collectionLiked, setCollectionLiked] = useState(false)
  const [isCollectionLiked] = useIsCollectionLikedMutation()
  const [likeCollection] = useLikeCollectionMutation()

  async function likeAction(action: any) {
    if (collectionId && user) {
      const response = await action({
        _id: user?._id,
        collectionId: collectionId,
      }).unwrap()
      console.log(response)
      setCollectionLiked(response)
    }
  }

  async function onLike() {
    await likeAction(likeCollection)
  }

  async function colLiked() {
    await likeAction(isCollectionLiked)
  }

  useEffect(() => {
    colLiked()
  }, [collectionLiked])

  return { collectionLiked, setCollectionLiked, onLike }
}
