import { useAddImageMutation } from '@/api/fileStorageApi'
import { useAddItemMutation } from '@/api/itemsApi'
import { FormError } from '@/components/ui/form-error'
import { FormSuccess } from '@/components/ui/form-success'
import { Button } from '@/components/ui/shadcn-ui/button'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/shadcn-ui/form'
import Select from 'react-select'
import { Input } from '@/components/ui/shadcn-ui/input'
import { ItemSchema, User } from '@/schemas/dbSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type ErrorResponse = {
  status: string
  data: string
}

type AddItemPageProps = {
  collectionId: string
}

export function AddItemPage({ collectionId }: AddItemPageProps) {
  const user = useAuthUser<User>()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [addImage, isLoading] = useAddImageMutation()
  const [addItem, isImageLoading] = useAddItemMutation()

  const form = useForm<z.infer<typeof ItemSchema>>({
    resolver: zodResolver(ItemSchema),
    defaultValues: {
      collection: collectionId,
      description: '',
      imageUrl: '',
      likeCount: 0,
      name: '',
      user: user!._id,
      tags: [],
      customFieldsWithValue: [],
      comments: [],
    },
  })

  const onSubmit = async (values: z.infer<typeof ItemSchema>) => {
    setError('')
    setSuccess('')
    try {
      console.log(values)
      setSuccess('Item added!')
      //window.location.reload()
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading.isLoading || isLoading.isSuccess}
                    placeholder="Самый крутой арбузе"
                    type="name"
                    className="border-purple-700/50 dark:border-white/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading.isLoading || isLoading.isSuccess}
                    placeholder="Самый крутой арбузе"
                    type="description"
                    className="border-purple-700/50 dark:border-white/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading.isLoading || isLoading.isSuccess}
                    type="file"
                    className="border-purple-700/50 dark:border-white/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Select></Select>
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
