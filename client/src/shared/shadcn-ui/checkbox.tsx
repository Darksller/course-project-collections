import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-purple-700/50 shadow transition-all duration-500 data-[state=checked]:bg-purple-600 data-[state=checked]:text-slate-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/50 dark:data-[state=checked]:bg-slate-50 dark:data-[state=checked]:text-slate-900 dark:focus-visible:ring-slate-300',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('text-red-700-700 flex items-center justify-center')}
    >
      <CheckIcon className="h-4 w-4 " color="#0ecfed" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
