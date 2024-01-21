import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons'
import { Button } from './shadcn-ui/button'
import { useState } from 'react'

type LikeButtonProps = {
  isLikedByMe?: boolean
}

export function LikeButton({ isLikedByMe = false }: LikeButtonProps) {
  const [isLiked, setLiked] = useState(isLikedByMe)
  function onLikeClicked() {
    setLiked((prev) => !prev)
  }
  return (
    <Button variant="ghost" className="ml-auto " onClick={onLikeClicked}>
      {!isLiked ? (
        <HeartIcon
          className="size-7 transition-all duration-300 hover:scale-125"
          color="white"
        />
      ) : (
        <HeartFilledIcon
          className="size-7 transition-all duration-300 hover:scale-125"
          color="white"
        />
      )}
    </Button>
  )
}
