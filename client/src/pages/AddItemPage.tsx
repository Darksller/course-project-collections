import { useAddImageMutation } from '@/api/fileStorageApi'
import { useAddItemMutation } from '@/api/itemsApi'
import { useGetTagsQuery } from '@/api/tagsApi'
import { FormError } from '@/components/ui/form-error'
import { FormSuccess } from '@/components/ui/form-success'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/shadcn-ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/shadcn-ui/form'
import { Input } from '@/components/ui/shadcn-ui/input'
import { Textarea } from '@/components/ui/shadcn-ui/textarea'
import { dummyItemImage } from '@/constants/images'
import { CustomField, ItemSchema, Tag, User } from '@/schemas/dbSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Select from 'react-select/creatable'
import { dataType } from '@/constants/dataTypes'
import { defaultType } from '@/constants/defaultTypesValue'

type ErrorResponse = {
  status: string
  data: string
}

type AddItemPageProps = {
  collectionId: string
  customFields: CustomField[] | undefined
}

export function AddItemPage({ collectionId, customFields }: AddItemPageProps) {
  const user = useAuthUser<User>()
  const [tags, setTags] = useState<Tag[]>([])
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [addImage] = useAddImageMutation()
  const [addItem, isLoading] = useAddItemMutation()
  const { data } = useGetTagsQuery()

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
      customFieldsWithValue:
        customFields?.map((customField) => ({
          fieldName: customField.fieldName,
          fieldType: customField.fieldType,
          fieldValue: defaultType[customField.fieldType],
          fieldState: customField.fieldState,
        })) || [],
      comments: [],
    },
  })

  const onSubmit = async (values: z.infer<typeof ItemSchema>) => {
    setError('')
    setSuccess('')
    if (tags.length === 0) return setError('Tags are required')
    values.tags = tags
    try {
      await addItem(values)
      setSuccess('Item added!')
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full flex-col justify-between space-y-2"
      >
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <div className="group relative h-[87%] w-full rounded-xl">
                    <img
                      src={dummyItemImage}
                      className="absolute h-full w-full overflow-hidden rounded-xl object-cover opacity-30 group-hover:border-4 group-hover:border-purple-700 dark:group-hover:border-white"
                    />
                    <Input
                      {...field}
                      type="file"
                      className="absolute z-[999] h-full cursor-pointer border-purple-700/50 opacity-0 dark:border-white/50"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Item name"
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
                <FormItem className="">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Item description"
                      className="max-h-24 min-h-24 border-purple-700/50 dark:border-white/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={(_) => (
                <FormItem className="">
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Select
                      backspaceRemovesValue
                      isMulti
                      onChange={(value) =>
                        setTags(value.map((tag) => tag.value))
                      }
                      options={data?.map((tag) => ({
                        label: tag.name,
                        value: tag,
                      }))}
                      className="text-purple-700"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Separator />
        <div className="font-bold">Additional fields:</div>
        <Separator />
        <div className="grid grid-cols-4 gap-4">
          {customFields?.map((customField, index) => (
            <FormField
              key={index}
              control={form.control}
              name={`customFieldsWithValue.${index}.fieldValue`}
              render={({ field }) => (
                <FormItem className="flex h-full flex-col items-center rounded-2xl border py-2 align-middle  dark:border-white/50">
                  <FormLabel className="px-2 max-sm:text-[11px]">
                    {customField.fieldName} : {customField.fieldType}
                  </FormLabel>
                  <FormControl>
                    {dataType[customField.fieldType] &&
                      dataType[customField.fieldType]({
                        field: { ...field },
                        placeholder: `${customField.fieldType}`,
                        className:
                          'border-purple-700/50 dark:border-white/50 max-sm:w-[60%] w-[80%] max-sm:placeholder:text-[9px]',
                      })}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <Separator />
        <FormError message={error} />
        <FormSuccess message={success} />

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading.isLoading || isLoading.isSuccess}
        >
          Add item to collection
        </Button>
      </form>
    </Form>
  )
}
