import { LoginSchema } from '@/schemas/authSchemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../shadcn-ui/form'
import { Input } from '../shadcn-ui/input'
import { Button } from '../shadcn-ui/button'
import { FormError } from '../forms/form-error'
import { useLoginMutation } from '@/api/authApi'
import { useState } from 'react'
import { FormSuccess } from '../forms/form-success'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/store/authStore'

export function LoginForm() {
  const { signIn } = useAuthStore()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [login, isLoading] = useLoginMutation()
  const { t } = useTranslation('global')
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError('')
    setSuccess('')
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
                    className="border-purple-700/50 dark:border-white/50"
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
                    className="border-purple-700/50 dark:border-white/50"
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
          {t('forms.login')}
        </Button>
      </form>
    </Form>
  )
}
