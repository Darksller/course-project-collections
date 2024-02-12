import { FormError } from '@/components/ui/forms/form-error'
import { FormSuccess } from '@/components/ui/forms/form-success'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/shadcn-ui/button'
import { Form } from '@/components/ui/shadcn-ui/form'
import { Input } from '@/components/ui/shadcn-ui/input'
import dummyCollectionImage from '@/assets/images/dummyCollectionImage.jpg'
import { CollectionSchema } from '@/schemas/dbSchemas'
import { z } from 'zod'
import { cn } from '@/lib/utils'
import {
  Cross1Icon,
  LockClosedIcon,
  LockOpen1Icon,
  PlusCircledIcon,
  TrashIcon,
} from '@radix-ui/react-icons'
import { v4 } from 'uuid'
import { Link } from '@tanstack/react-router'
import { SelectCategory } from '@/components/ui/forms/select-category'
import { Switch } from '@/components/ui/shadcn-ui/switch'
import { Label } from '@/components/ui/shadcn-ui/label'
import { useCollectionForm } from '@/hooks/useCollectionForm'
import { useFormResponse } from '@/hooks/useFormResponse'
import { useImage } from '@/hooks/useImage'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/shadcn-ui/select'
import { useTranslation } from 'react-i18next'
import { Textarea } from '@/components/ui/shadcn-ui/textarea'
import { FormFieldWrapper } from '@/components/ui/forms/form-field-wrapper'
import { Category, Collection, DataType } from '@/schemas/dbSchemas'
import { useDeleteCollectionMutation } from '@/api/collectionsApi'

export type EditCollectionProps = {
  collection?: Collection
  categories: Category[] | undefined
  dataTypes: DataType[] | undefined
  type: 'edit' | 'create'
}

export function EditCollection({
  collection,
  categories,
  dataTypes,
  type,
}: EditCollectionProps) {
  const { t } = useTranslation('global')
  const [deleteCollection] = useDeleteCollectionMutation()
  const { error, setError, success, setSuccess } = useFormResponse()
  const { image, onSetImage, selectedFile, setImage } = useImage()
  const {
    form,
    register,
    user,
    fields,
    onAppendClicked,
    remove,
    submit,
    returnToCollection,
  } = useCollectionForm(collection)

  const onSubmit = async (values: z.infer<typeof CollectionSchema>) => {
    setError('')
    setSuccess('')
    try {
      if (type !== 'edit') await submit(values, selectedFile)
      else await submit(values, selectedFile, collection?._id)
      setSuccess(t(`forms.${type}.success`))
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : (error as { data: string }).data,
      )
    }
  }

  async function onDelete(): Promise<void> {
    setError('')
    setSuccess('')
    try {
      await deleteCollection(collection!._id).unwrap()
      returnToCollection()
    } catch (error) {
      console.log(error)
      setError(
        error instanceof Error
          ? error.message
          : (error as { data: string }).data,
      )
    }
  }

  return (
    <div className="h-full sm:p-3">
      <h1 className="p-4 text-7xl max-sm:text-3xl">Collection creating page</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" p-4 dark:border-white"
        >
          <div className="flex justify-between pb-4 max-sm:grid max-sm:grid-cols-2 max-sm:gap-2 ">
            <div>
              <FormFieldWrapper name="name" control={form.control}>
                {(field) => (
                  <Input
                    {...field}
                    placeholder="Collection name"
                    type="name"
                    className={cn(
                      'rounded-none border-2 border-purple-700/50 bg-slate-200 py-6 text-3xl transition-all duration-700 placeholder:text-purple-700 focus:animate-pulse focus:border focus:bg-white dark:border-white dark:bg-purple-700/50 dark:text-white dark:placeholder:text-white/70 dark:focus:bg-purple-600 dark:focus:text-white max-sm:text-base max-sm:placeholder:text-base ',
                      field.value && 'bg-white dark:bg-purple-700',
                    )}
                  />
                )}
              </FormFieldWrapper>
            </div>
            <Link
              to={'/users/$username'}
              params={{
                username: collection?.user.username ?? user?.username ?? '/',
              }}
              className="flex items-center justify-center border-[1px] border-purple-700/50 p-1 underline underline-offset-4 dark:border-white max-sm:text-base sm:p-2"
            >
              {t('forms.author')}: {collection?.user.username ?? user?.username}
            </Link>
          </div>
          <div className="grid h-[500px] grid-cols-2 gap-4 pb-4">
            <FormFieldWrapper name="imageUrl" control={form.control}>
              {() => (
                <div className="group relative h-full w-full border-2 border-purple-700/90 dark:border-white ">
                  <img
                    src={image || dummyCollectionImage}
                    className={cn(
                      'absolute h-full w-full overflow-hidden object-cover transition-all duration-200 group-hover:border-4 group-hover:border-white group-hover:opacity-100 dark:group-hover:border-purple-700',
                      !image && 'opacity-30',
                    )}
                  />
                  <Input
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
              )}
            </FormFieldWrapper>

            <div className="w-full ">
              <div className="grid w-full grid-cols-2 gap-2">
                <FormFieldWrapper name="category" control={form.control}>
                  {(field) => (
                    <SelectCategory field={field} options={categories} />
                  )}
                </FormFieldWrapper>
                <FormFieldWrapper name="isClosed" control={form.control}>
                  {(field) => (
                    <div className="flex h-full w-full items-center justify-between border-[1px] border-purple-700 dark:border-white sm:space-x-2 sm:px-4">
                      <div className="flex sm:items-center sm:space-x-2 ">
                        <Switch
                          className="dark:thumb border-[1px] border-purple-700 dark:border-white max-sm:scale-75"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="isClosed"
                        />
                        <Label htmlFor="isClosed" className="max-sm:text-[8px]">
                          {t('forms.closedMode')}
                        </Label>
                      </div>
                      {field.value ? (
                        <LockClosedIcon className="size-6" />
                      ) : (
                        <LockOpen1Icon className="size-6" />
                      )}
                    </div>
                  )}
                </FormFieldWrapper>
              </div>
              <FormFieldWrapper name="description" control={form.control}>
                {(field) => (
                  <div className="max-h-[190px] overflow-y-auto py-4 !text-purple-700 scrollbar-thin">
                    <Textarea
                      {...field}
                      className="max-h-24 min-h-24 border-purple-700/50 dark:border-white/50"
                    />
                  </div>
                )}
              </FormFieldWrapper>

              <Separator />
              <div className="pt-2 ">
                <div className="grid grid-cols-3 items-center justify-center gap-2 py-2">
                  <div className="max-sm:text-[12px]">Type</div>
                  <div className="max-sm:text-[12px]">Name</div>
                  <Button
                    className="w-full rounded-none dark:bg-purple-700"
                    variant={'outline'}
                    size={'icon'}
                    type="button"
                    onClick={onAppendClicked}
                  >
                    <PlusCircledIcon />
                  </Button>
                </div>

                <div className="grid  max-h-[200px] gap-2 overflow-x-hidden overflow-y-scroll scrollbar-thin">
                  {fields.map((field, index) => {
                    return (
                      <div key={field.id} className="grid grid-cols-3 gap-2 ">
                        <FormFieldWrapper
                          name={`customFields.${index}.fieldType`}
                          control={form.control}
                        >
                          {(field) => (
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="rounded-none max-sm:text-[1px]">
                                <SelectValue placeholder="T" />
                              </SelectTrigger>
                              <SelectContent>
                                {dataTypes?.map((dataType) => (
                                  <SelectItem key={v4()} value={dataType.name}>
                                    {dataType.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </FormFieldWrapper>

                        <Input
                          type="text"
                          placeholder="N"
                          className="rounded-none border-[1px] border-purple-700 bg-slate-200 transition-all duration-700 placeholder:text-purple-700 focus:animate-pulse focus:border focus:bg-white dark:border-white  dark:bg-purple-700/50 dark:text-white dark:placeholder:text-white/70 dark:focus:bg-purple-600 dark:focus:text-white max-sm:text-[1px]"
                          {...register(
                            `customFields.${index}.fieldName` as const,
                          )}
                        />

                        {index > 0 && (
                          <Button
                            variant={'outline'}
                            size={'icon'}
                            className="ml-1.5 w-full rounded-none"
                            onClick={() => remove(index)}
                          >
                            <TrashIcon />
                          </Button>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <FormError message={error} />
          <FormSuccess message={success} />
          <div className="flex justify-between gap-2 pt-5">
            {type === 'edit' && (
              <>
                <Button
                  className="rounded-none"
                  onClick={() => returnToCollection(collection!._id)}
                >
                  {t('forms.cancel')}
                </Button>
                <Button
                  className="rounded-none bg-destructive hover:animate-pulse hover:bg-destructive"
                  onClick={onDelete}
                >
                  {t('forms.delete')}
                </Button>
              </>
            )}
            <Button type="submit" className="w-full rounded-none">
              {t(`forms.${type}.submit`)}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
