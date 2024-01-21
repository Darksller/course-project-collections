import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons'
import { Button } from './shadcn-ui/button'
import { useState } from 'react'

type LikeButtonProps = {
  isLikedByMe?: boolean
  className?: string
}

export function LikeButton({
  isLikedByMe = false,
  className,
}: LikeButtonProps) {
  const [isLiked, setLiked] = useState(isLikedByMe)
  function onLikeClicked() {
    setLiked((prev) => !prev)
  }
  return (
    <Button variant="ghost" className={className} onClick={onLikeClicked}>
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
