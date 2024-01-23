import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './shadcn-ui/dialog'
import { useState } from 'react'
type DialogWrapperProps = {
  children: JSX.Element | string
  dialogTitle: string
  dialogDescription?: string
  dialogContent: JSX.Element
  variant?: 'default' | 'ghost'
  className?: string
  isModalOpen?: boolean
  setIsModalOpen?: (isModalOpen: boolean) => void
}

export function DialogWrapper({
  dialogTitle,
  dialogDescription,
  children,
  dialogContent,
  className,
  isModalOpen,
  setIsModalOpen,
}: DialogWrapperProps) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog
      open={isModalOpen || isOpen}
      onOpenChange={(value) => {
        if (setIsModalOpen) setIsModalOpen(value)
        else setIsOpen(value)
      }}
    >
      <DialogTrigger className={className}>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        {dialogContent}
      </DialogContent>
    </Dialog>
  )
}
