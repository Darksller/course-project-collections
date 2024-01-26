import { User } from '@/schemas/dbSchemas'
import { useEffect, useState } from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

type UseIsOwnerProps = {
  collectionId?: string
  itemId?: string
}

export function useIsOwner({ collectionId, itemId }: UseIsOwnerProps) {
  const user = useAuthUser<User>()
  const [isCollectionOwner, setIsCollectionOwner] = useState(false)
  const [isItemOwner, setIsItemOwner] = useState(false)

  function checkCollectionOwner() {
    if (
      user &&
      collectionId &&
      user.collections.some((collection) => collection._id === collectionId)
    ) {
      setIsCollectionOwner(true)
    }
  }
  function checkItemOwner() {
    if (user && itemId && user.items.includes(itemId)) {
      setIsItemOwner(true)
    }
  }
  useEffect(() => {
    checkCollectionOwner()
    checkItemOwner()
  }, [])

  return { isCollectionOwner, isItemOwner }
}
