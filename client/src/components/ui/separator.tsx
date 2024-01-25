import { cn } from '@/lib/utils'

type SeparatorProps = {
  className?: string
}

export function Separator({ className }: SeparatorProps) {
  return (
    <div
      className={cn(
        'w-full border-b-[1px] border-purple-700/50 transition-all delay-700 duration-1000 group-hover/img:w-full group-hover:w-full dark:border-white',
        className,
      )}
    />
  )
}
