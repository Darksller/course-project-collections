import {
  useAddCollectionMutation,
  useUpdateCollectionMutation,
} from '@/api/collectionsApi'
import { Collection, CollectionSchema } from '@/schemas/dbSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useImage } from './useImage'
import { useAuthStore } from '@/store/authStore'
import {
  defaultCustomFieldValues,
  getDefaultCollectionValues,
} from '@/constants/defaultValues'

export function useCollectionForm(collection?: Collection) {
  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate()
  const { uploadImage } = useImage()
  const [addCollection] = useAddCollectionMutation()
  const [updateCollection] = useUpdateCollectionMutation()
  const form = useForm<z.infer<typeof CollectionSchema>, void>({
    resolver: zodResolver(CollectionSchema),
    defaultValues: getDefaultCollectionValues(collection),
  })
  const { fields, append, remove } = useFieldArray({
    name: 'customFields',
    control: form.control,
  })
  const onAppendClicked = () => append(defaultCustomFieldValues)
  async function submit(
    values: z.infer<typeof CollectionSchema>,
    selectedFile: File | undefined,
    id?: string,
  ): Promise<void> {
    if (selectedFile) {
      values.imageUrl = await uploadImage(selectedFile)
    }
    const response = id
      ? await updateCollection({ _id: id, body: values }).unwrap()
      : await addCollection(values).unwrap()
    returnToCollection(response._id)
  }
  function returnToCollection(collectionId?: string) {
    const to = collectionId ? `/collections/${collectionId}` : '/collections/'
    navigate({ to, params: { collectionId } })
  }
  return {
    form,
    register: form.register,
    fields,
    onAppendClicked,
    remove,
    user,
    submit,
    returnToCollection,
  }
}
