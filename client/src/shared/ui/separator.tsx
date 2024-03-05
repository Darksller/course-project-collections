import { cn } from '@/shared/lib/utils'

type SeparatorProps = {
  className?: string
}

export function Separator({ className }: SeparatorProps) {
  return <div className={cn('w-full border-b-[1px] ', className)} />
}
