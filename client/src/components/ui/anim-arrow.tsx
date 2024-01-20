import { cn } from '@/lib/utils'

type AnimArrowProps = {
  className?: string
  children: React.ReactNode
}

export function AnimArrow({ className, children }: AnimArrowProps) {
  return (
    <div
      className={cn(
        'group relative inline-block text-[1.25em] italic text-[#999] transition-all duration-200 hover:text-[#eaeaea]',
        className,
      )}
    >
      <span className="absolute left-0 top-[60%]">
        <span className="relative block h-px w-0 bg-[#999] transition-all duration-200 before:absolute before:right-0 before:top-0 before:block before:h-px before:w-0 before:origin-top-right before:bg-[#999] after:absolute after:right-0 after:top-0 after:block after:h-px after:w-0 after:origin-bottom-right after:bg-[#999] group-hover:w-[64px] group-hover:bg-[#eaeaea] group-hover:delay-100 group-hover:before:w-[8px] group-hover:before:rotate-[40deg] group-hover:before:bg-[#eaeaea] group-hover:before:delay-100 group-hover:after:w-[8px] group-hover:after:rotate-[-40deg] group-hover:after:bg-[#eaeaea] group-hover:after:delay-100" />
      </span>
      <span className="flex items-center transition-all duration-200 group-hover:translate-x-[80px]">
        <span className="mr-[16px] leading-none">{children}</span>
        <span className="relative top-[3px]">
          <span className="relative block h-px w-16 bg-[#999] transition-all delay-200 duration-200 before:absolute before:right-0 before:top-0 before:block before:h-px before:w-2 before:origin-top-right before:rotate-[40deg] before:bg-[#999] before:transition-all before:delay-300 before:duration-500 after:absolute after:right-0 after:top-0 after:block after:h-px after:w-2 after:origin-bottom-right after:rotate-[-40deg] after:bg-[#999] after:transition-all after:delay-300 after:duration-500 group-hover:w-0 group-hover:translate-x-[200%] group-hover:before:w-0 group-hover:before:rotate-[0] group-hover:before:transition-all group-hover:before:duration-100 group-hover:after:w-0 group-hover:after:rotate-[0] group-hover:after:transition-all group-hover:after:duration-100" />
        </span>
      </span>
    </div>
  )
}
