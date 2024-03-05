import { cn } from '@/shared/lib/utils'
import React from 'react'

type HomeSectionProps = {
  children: React.ReactNode
  imageSrc: string
  className?: string
}

export function HomeImageSection({
  children,
  imageSrc,
  className,
}: HomeSectionProps) {
  return (
    <div
      className={cn(
        'sticky top-0 flex h-[100dvh] max-w-full items-center justify-center bg-purple-400',
        className,
      )}
    >
      <img
        src={imageSrc}
        className="absolute left-0 top-0 h-full w-full object-cover brightness-50"
      />
      <div className="absolute left-0 top-0 z-[100] flex h-full w-full items-center justify-center font-bold text-white">
        {children}
      </div>
    </div>
  )
}
