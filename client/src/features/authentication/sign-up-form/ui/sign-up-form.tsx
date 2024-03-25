import { useAuthStore, useRegisterMutation } from '@/entities/viewer'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as z from 'zod'
import { defaultValues } from '../model/defaultValues'
import { SignUpSchema } from '../model/signUpSchema'
import { zodResolver } from '@hookform/resolvers/zod'
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

export function SignUpForm() {
  const [success, setSuccess] = useState<string | undefined>('')
  const [error, setError] = useState<string | undefined>('')

  const { signIn } = useAuthStore()
  const [register, isLoading] = useRegisterMutation()

  const { t } = useTranslation('global')

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: defaultValues,
  })

  const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    try {
      const response = await register(values).unwrap()
      setSuccess(t('forms.successRegister'))
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('forms.login')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Darksller"
                    type="username"
                    disabled={isLoading.isLoading || isLoading.isSuccess}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          {t('auth.signUp')}
        </Button>
      </form>
    </Form>
  )
}
