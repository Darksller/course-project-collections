import { useAddItemMutation } from '@/api/itemsApi'
import { useGetTagsQuery } from '@/api/tagsApi'
import { FormError } from '@/components/ui/forms/form-error'
import { FormSuccess } from '@/components/ui/forms/form-success'
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
import dummyItemImage from '@/assets/images/dummyItemImage.jpg'
import { CustomField, ItemSchema } from '@/schemas/dbSchemas'
import { z } from 'zod'
import ReactSelectCreatable from 'react-select/creatable'
import { dataType } from '@/constants/dataTypes'
import { cn } from '@/lib/utils'
import { Cross1Icon } from '@radix-ui/react-icons'
import { mapStringTagsToObjectArray } from '@/lib/itemUtils'
import { storage } from '@/constants/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'
import { useItemForm } from '@/hooks/useItemForm'
import { ErrorResponse } from '@/store/reduxStore'
import { useImage } from '@/hooks/useImage'
import { useFormResponse } from '@/hooks/useFormResponse'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export type AddItemPageProps = {
  collectionId: string
  customFields: CustomField[] | undefined
}

export function AddItemPage({ collectionId, customFields }: AddItemPageProps) {
  const { t } = useTranslation('global')
  const [imgLoad, setLoad] = useState<boolean>(false)
  const { error, setError, success, setSuccess } = useFormResponse()
  const { image, onSetImage, selectedFile, setImage } = useImage()
  const [addItem] = useAddItemMutation()
  const { form, tags, setTags } = useItemForm({
    collectionId,
    customFields,
  })
  const { data } = useGetTagsQuery()
  const onSubmit = async (values: z.infer<typeof ItemSchema>) => {
    setLoad(true)
    setError('')
    setSuccess('')
    if (tags.length === 0) return setError(t('forms.tagsAreRequired'))

    try {
      if (selectedFile) {
        const imageRef = ref(storage, `images/${selectedFile.name + v4()}`)
        await uploadBytes(imageRef, selectedFile)
        values.imageUrl = await getDownloadURL(imageRef)
      }
      values.tags = mapStringTagsToObjectArray(tags)
      await addItem(values).unwrap()
      setSuccess(t('forms.itemAdded'))
      window.location.reload()
    } catch (error) {
      console.log(error)
      setError(
        error instanceof Error
          ? error.message
          : String((error as ErrorResponse).data),
      )
      setLoad(false)
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
            render={(_) => (
              <FormItem>
                <FormLabel>{t('forms.image')}</FormLabel>
                <FormControl>
                  <div className="group relative h-[87%] w-full rounded-xl">
                    <img
                      src={image ? image : dummyItemImage}
                      className={cn(
                        'absolute h-full w-full overflow-hidden rounded-xl object-cover group-hover:border-4 group-hover:border-purple-700 dark:group-hover:border-white',
                        !image && 'opacity-30',
                      )}
                    />
                    <Input
                      disabled={imgLoad}
                      onChange={onSetImage}
                      type="file"
                      className="absolute z-[999] h-full cursor-pointer border-purple-700/50 opacity-0 dark:border-white/50"
                    />
                    {image && (
                      <Cross1Icon
                        className="absolute right-2 top-2 z-[9999] size-6 cursor-pointer rounded-full border bg-white/50 p-1 font-bold"
                        onClick={() => setImage('')}
                      />
                    )}
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
                  <FormLabel>{t('forms.name')}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={imgLoad}
                      {...field}
                      placeholder={t('forms.itemName')}
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
                  <FormLabel>{t('forms.description')}</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={imgLoad}
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
                <FormItem>
                  <FormLabel>{t('forms.tags')}</FormLabel>
                  <FormControl>
                    <ReactSelectCreatable
                      isDisabled={imgLoad}
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
        {customFields && (
          <>
            <div className="font-bold">Additional fields:</div>
            <Separator />
          </>
        )}
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

        <Button type="submit" className="w-full" disabled={imgLoad}>
          {t('forms.addItem')}
        </Button>
      </form>
    </Form>
  )
}
