import { useTranslation } from 'react-i18next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui'
import { SignInForm, SignUpForm } from '@/features/authentication'
export function AuthenticationForm() {
  const { t } = useTranslation('global')
  return (
    <Tabs defaultValue="signIn">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signIn">{t('auth.signIn')}</TabsTrigger>
        <TabsTrigger value="signUp">{t('auth.signUp')}</TabsTrigger>
      </TabsList>
      <TabsContent value="signIn">
        <SignInForm />
      </TabsContent>
      <TabsContent value="signUp">
        <SignUpForm />
      </TabsContent>
    </Tabs>
  )
}
