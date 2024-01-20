import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './shadcn-ui/dialog'
type DialogWrapperProps = {
  children: string
  dialogTitle: string
  dialogDescription?: string
  dialogContent: JSX.Element
  variant?: 'default' | 'ghost'
  className?: string
}

export default function DialogWrapper({
  dialogTitle,
  dialogDescription,
  children,
  dialogContent,
  className,
}: DialogWrapperProps) {
  return (
    <Dialog>
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
