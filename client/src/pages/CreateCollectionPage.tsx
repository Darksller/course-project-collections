import { FormError } from '@/components/ui/form-error'
import { FormSuccess } from '@/components/ui/form-success'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/shadcn-ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/shadcn-ui/form'
import { Input } from '@/components/ui/shadcn-ui/input'
import { dummyCollectionImage } from '@/constants/media'
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
import { storage } from '@/constants/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'
import { Link, useNavigate } from '@tanstack/react-router'
import { SelectCategory } from '@/components/ui/collections/select-category'
import { Switch } from '@/components/ui/shadcn-ui/switch'
import { Label } from '@/components/ui/shadcn-ui/label'
import FroalaEditor from 'react-froala-wysiwyg'
import { useCollectionForm } from '@/hooks/useCollectionForm'
import { useFormResponse } from '@/hooks/useFormResponse'
import { useImage } from '@/hooks/useImage'
import { ErrorResponse } from '@/store/reduxStore'
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/js/plugins/markdown.min.js'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/shadcn-ui/select'
import { useAddCollectionMutation } from '@/api/collectionsApi'
import { useState } from 'react'
import { createCollectionsRoute } from '@/router/routes/collections.routes'

export function CreateCollection() {
  const navigate = useNavigate()
  const [imgLoad, setImgLoad] = useState<boolean>(false)
  const { categories, dataTypes } = createCollectionsRoute.useLoaderData()
  const { error, setError, success, setSuccess } = useFormResponse()
  const { image, onSetImage, selectedFile, setImage } = useImage()
  const { form, register, user, fields, onAppendClicked, remove } =
    useCollectionForm({})
  const [addCollection] = useAddCollectionMutation()

  const onSubmit = async (values: z.infer<typeof CollectionSchema>) => {
    setError('')
    setSuccess('')

    try {
      setImgLoad(true)
      if (selectedFile) {
        const imageRef = ref(storage, `images/${selectedFile.name + v4()}`)
        await uploadBytes(imageRef, selectedFile)
        values.imageUrl = await getDownloadURL(imageRef)
      }
      const response = await addCollection(values).unwrap()
      setSuccess('Collection added!')
      user?.collections.push(response)
      navigate({
        to: '/collections/$collectionId',
        params: { collectionId: response._id },
      })
    } catch (error) {
      console.log(error)
      setError(
        error instanceof Error
          ? error.message
          : String((error as ErrorResponse).data),
      )
      setImgLoad(false)
    }
  }

  return (
    <div className="h-full sm:p-3">
      <h1 className="p-4 text-7xl max-sm:text-3xl">Collection creating page</h1>
      <Separator className="border-8 border-purple-700/90" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" border-[6px] border-purple-700/90 p-4 dark:border-white"
        >
          <div className="flex justify-between pb-4 max-sm:grid max-sm:grid-cols-2 max-sm:gap-2 ">
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={imgLoad}
                        {...field}
                        placeholder="Collection name"
                        type="name"
                        className={cn(
                          'rounded-none border-2 border-purple-700/50 bg-slate-200 py-6 text-3xl transition-all duration-700 placeholder:text-purple-700 focus:animate-pulse focus:border focus:bg-white dark:border-white dark:bg-purple-700/50 dark:text-white dark:placeholder:text-white/70 dark:focus:bg-purple-600 dark:focus:text-white max-sm:text-base max-sm:placeholder:text-base ',
                          field.value && 'bg-white dark:bg-purple-700',
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Link
              to={'/users/$userId'}
              params={{ userId: user?._id! }}
              className="flex items-center justify-center border-[1px] border-purple-700/50 p-1 underline underline-offset-4 dark:border-white max-sm:text-base sm:p-2"
            >
              Author: {user?.username}
            </Link>
          </div>
          <div className="grid h-[500px] grid-cols-2 gap-4 pb-4">
            <FormField
              control={form.control}
              name="imageUrl"
              render={(_) => (
                <FormItem>
                  <FormControl>
                    <div className="group relative h-full w-full border-2 border-purple-700/90 dark:border-white ">
                      <img
                        src={image ? image : dummyCollectionImage}
                        className={cn(
                          'absolute h-full w-full overflow-hidden object-cover transition-all duration-200 group-hover:border-4 group-hover:border-white group-hover:opacity-100 dark:group-hover:border-purple-700',
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

            <div className="w-full ">
              <div className="grid w-full grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <SelectCategory
                          field={field}
                          options={categories}
                          disabled={imgLoad}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isClosed"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormControl>
                        <div className="flex h-full w-full items-center justify-between border-[1px] border-purple-700 dark:border-white sm:space-x-2 sm:px-4">
                          <div className="flex sm:items-center sm:space-x-2 ">
                            <Switch
                              className="dark:thumb border-[1px] border-purple-700 dark:border-white max-sm:scale-75"
                              checked={field.value}
                              disabled={imgLoad}
                              onCheckedChange={field.onChange}
                              id="isClosed"
                            />
                            <Label
                              htmlFor="isClosed"
                              className="max-sm:text-[8px]"
                            >
                              Closed Mode
                            </Label>
                          </div>
                          {field.value ? (
                            <LockClosedIcon className="size-6" />
                          ) : (
                            <LockOpen1Icon className="size-6" />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="max-h-[250px] overflow-y-auto py-4 scrollbar-thin">
                    <FormControl>
                      <FroalaEditor
                        disabled={imgLoad}
                        value={field.value}
                        onModelChange={field.onChange}
                        config={{
                          placeholderText: 'Start writing :0',
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator />
              <div className="pt-2 ">
                <div className="grid grid-cols-3 items-center justify-center gap-2 py-2">
                  <div className="max-sm:text-[12px]">Type</div>
                  <div className="max-sm:text-[12px]">Name</div>
                  <Button
                    className="w-full rounded-none"
                    variant={'outline'}
                    disabled={imgLoad}
                    size={'icon'}
                    type="button"
                    onClick={onAppendClicked}
                  >
                    <PlusCircledIcon />
                  </Button>
                </div>

                <div className="grid max-h-[200px] gap-2 overflow-x-hidden overflow-y-scroll scrollbar-thin max-sm:max-h-[150px]">
                  {fields.map((field, index) => {
                    return (
                      <div key={field.id} className="grid grid-cols-3 gap-2 ">
                        <FormField
                          control={form.control}
                          name={`customFields.${index}.fieldType`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Select
                                  disabled={imgLoad}
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger className="rounded-none max-sm:text-[1px]">
                                    <SelectValue placeholder="T" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {dataTypes?.map((dataType) => (
                                      <SelectItem
                                        key={v4()}
                                        value={dataType.name}
                                      >
                                        {dataType.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
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
                            disabled={imgLoad}
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
          <Button
            type="submit"
            className="w-full rounded-none"
            disabled={imgLoad}
          >
            Create new collection!
          </Button>
        </form>
      </Form>
      <Separator className=" border-8 border-purple-700/90" />
    </div>
  )
}
