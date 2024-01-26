import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons'
import { Button } from './shadcn-ui/button'
import { cn } from '@/lib/utils'
type LikeButtonProps = {
  className?: string
  iconProps?: string
  liked: boolean
  onChange: () => void
}

export function LikeButton({
  className,
  iconProps,
  liked,
  onChange,
}: LikeButtonProps) {
  async function onLikeClicked() {
    onChange()
  }
  return (
    <Button
      variant="ghost"
      className={cn('flex items-center justify-center align-middle', className)}
      onClick={onLikeClicked}
    >
      {!liked ? (
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
