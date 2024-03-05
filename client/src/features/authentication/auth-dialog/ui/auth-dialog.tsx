import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Separator,
} from '@/shared/ui'
import { AuthenticationForm } from './auth-tabs'
import { useTranslation } from 'react-i18next'

export const AuthDialog = () => {
  const { t } = useTranslation('global')
  return (
    <Dialog>
      <DialogTrigger className="group flex flex-col justify-center rounded-2xl  bg-transparent from-primary via-primary/70 to-primary px-3 font-bold tracking-wider transition-all hover:bg-gradient-to-r hover:text-secondary focus-visible:ring-1">
        {t('header.start')}
        <Separator className="border-primary transition-all duration-300 group-hover:border-secondary" />
      </DialogTrigger>
      <DialogContent className="w-[500px] max-w-[97%] border-4">
        <DialogHeader>
          <DialogTitle>{t('auth.authentication')}</DialogTitle>
        </DialogHeader>
        <AuthenticationForm />
      </DialogContent>
    </Dialog>
  )
}
