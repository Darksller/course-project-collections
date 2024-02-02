import {
  useAddCollectionMutation,
  useUpdateCollectionMutation,
} from '@/api/collectionsApi'
import { Collection, CollectionSchema, User } from '@/schemas/dbSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useImage } from './useImage'

export function useCollectionForm(collection?: Collection) {
  const user = useAuthUser<User>()
  const navigate = useNavigate()
  const { uploadImage } = useImage()
  const [addCollection] = useAddCollectionMutation()
  const [update] = useUpdateCollectionMutation()

  const form = useForm<z.infer<typeof CollectionSchema>>({
    resolver: zodResolver(CollectionSchema),
    defaultValues: {
      _id: collection?._id || '',
      name: collection?.name || '',
      description: collection?.description || '',
      imageUrl: collection?.imageUrl || '',
      likeCount: 0,
      creationDate: collection?.creationDate || new Date(),
      isClosed: collection?.isClosed || false,
      category: collection?.category._id || '',
      user: user?._id,
      customFields: collection?.customFields || [
        { fieldName: '', fieldType: '' },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'customFields',
    control: form.control,
  })

  const onAppendClicked = () => append({ fieldName: '', fieldType: '' })

  async function submit(
    values: z.infer<typeof CollectionSchema>,
    selectedFile: File | undefined,
    id?: string,
  ): Promise<void> {
    if (selectedFile) {
      values.imageUrl = await uploadImage(selectedFile)
    }

    let response
    if (id) response = await update({ _id: id, body: values }).unwrap()
    else response = await addCollection(values).unwrap()

    user?.collections.push(response)
    returnToCollection(response._id)
  }

  function returnToCollection(collectionId?: string) {
    if (collectionId)
      navigate({
        to: '/collections/$collectionId',
        params: { collectionId },
      })
    else
      navigate({
        to: '/collections/',
      })
  }

  return {
    form,
    ...form,
    fields,
    onAppendClicked,
    remove,
    user,
    submit,
    returnToCollection,
  }
}
