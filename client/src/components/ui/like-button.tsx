import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons'
import { Button } from './shadcn-ui/button'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type LikeButtonProps = {
  isLikedByMe?: boolean
  className?: string
  iconProps?: string
}

export function LikeButton({
  isLikedByMe = false,
  className,
  iconProps,
}: LikeButtonProps) {
  const [isLiked, setLiked] = useState(isLikedByMe)
  function onLikeClicked() {
    setLiked((prev) => !prev)
  }
  return (
    <Button
      variant="ghost"
      className={cn('flex items-center justify-center align-middle', className)}
      onClick={onLikeClicked}
    >
      {!isLiked ? (
        <HeartIcon
          className={cn(
            'size-9 rounded-full p-1 text-black transition-all duration-300 hover:scale-125',
            iconProps,
          )}
        />
      ) : (
        <HeartFilledIcon
          className={cn(
            'size-9 transition-all duration-300 hover:scale-125',
            iconProps,
          )}
        />
      )}
    </Button>
  )
}
