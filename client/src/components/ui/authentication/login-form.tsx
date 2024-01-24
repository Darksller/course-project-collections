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
import { FormError } from '../form-error'
import { useLoginMutation } from '@/api/authApi'
import { useState } from 'react'
import { FormSuccess } from '../form-success'
import useSignIn from 'react-auth-kit/hooks/useSignIn'

type ErrorResponse = {
  status: string
  data: string
}

export function LoginForm() {
  const signIn = useSignIn()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [login, isLoading] = useLoginMutation()

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
      setSuccess('Success login!')
      signIn({
        auth: {
          token: response.accessToken,
          type: 'bearer',
        },
        refresh: response.refreshToken,
        userState: response.user,
      })
      console.log(response.user)
      window.location.reload()
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : String((error as ErrorResponse).data),
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
                <FormLabel>Password</FormLabel>
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
          Login
        </Button>
      </form>
    </Form>
  )
}
