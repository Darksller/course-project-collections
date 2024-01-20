import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/shadcn-ui/tabs'
import { useTranslation } from 'react-i18next'
import { LoginForm } from './ui/authentication/login-form'
import RegistrationForm from './ui/authentication/registration-form'
export function AuthenticationForm() {
  const { t } = useTranslation('global')
  return (
    <Tabs defaultValue="login">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">{t('login')}</TabsTrigger>
        <TabsTrigger value="registration">{t('registration')}</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginForm />
      </TabsContent>
      <TabsContent value="registration">
        <RegistrationForm />
      </TabsContent>
    </Tabs>
  )
}
