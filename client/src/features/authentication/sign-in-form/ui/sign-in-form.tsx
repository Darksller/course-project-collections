import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { defaultValues } from '../model/defaultValues'
import { SignInSchema } from '../model/signInSchema'
import { useAuthStore, useLoginMutation } from '@/entities/viewer'
import {
  Button,
  Form,
  FormControl,
  FormError,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormSuccess,
  Input,
} from '@/shared/ui'

export function SignInForm() {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [login, isLoading] = useLoginMutation()
  const { signIn } = useAuthStore()

  const { t } = useTranslation('global')

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: defaultValues,
  })

  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    try {
      const response = await login(values).unwrap()
      setSuccess(`${t('forms.successLogin')}`)
      signIn(response.accessToken, response.refreshToken)
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : (error as { data: string }).data,
      )
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading.isLoading || isLoading.isSuccess}
                    placeholder="darksller.sss@gmail.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('forms.password')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="********"
                    type="password"
                    disabled={isLoading.isLoading || isLoading.isSuccess}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading.isLoading || isLoading.isSuccess}
        >
          {t('auth.signIn')}
        </Button>
      </form>
    </Form>
  )
}
