import { cn } from '@/lib/utils'

type SmoothArrowProps = {
  className?: string
}

export function SmoothArrow({ className }: SmoothArrowProps) {
  return (
    <div className={cn('absolute  rotate-[270deg]', className)}>
      <span className="m-[-10px] block h-[4dvw] w-[4dvw] rotate-[45deg] animate-arrow border-b-[5px] border-r-[5px] border-solid border-purple-600 lg:h-[2dvw] lg:w-[2dvw] dark:border-white" />
      <span className="m-[-10px] block h-[4dvw] w-[4dvw] rotate-[45deg] animate-arrow border-b-[5px] border-r-[5px] border-solid border-purple-600 animation-delay-minus lg:h-[2dvw] lg:w-[2dvw] dark:border-white" />
      <span className="m-[-10px] block h-[4dvw] w-[4dvw] rotate-[45deg] animate-arrow border-b-[5px] border-r-[5px] border-solid border-purple-600 animation-delay-minusXl lg:h-[2dvw] lg:w-[2dvw] dark:border-white" />
    </div>
  )
}
