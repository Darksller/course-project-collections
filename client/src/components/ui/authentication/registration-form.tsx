import { RegisterSchema } from '@/schemas'
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
import { useRegisterMutation } from '@/store/api/authApi'
import { useState } from 'react'

type ErrorResponse = {
  status: string
  data: string
}

export function RegistrationForm() {
  const [error, setError] = useState<string | undefined>('')
  const [register, isLoading] = useRegisterMutation()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  })
  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError('')
    try {
      await register(values).unwrap()
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Darksller"
                    type="username"
                    disabled={isLoading.isLoading}
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
                    disabled={isLoading.isLoading}
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="********"
                    type="password"
                    disabled={isLoading.isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <Button type="submit" className="w-full" disabled={isLoading.isLoading}>
          Register
        </Button>
      </form>
    </Form>
  )
}
