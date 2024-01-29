import { Collection, CollectionSchema, User } from '@/schemas/dbSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

type UseCollectionFormProps = {
  collection?: Collection
}

export function useCollectionForm({
  collection = undefined,
}: UseCollectionFormProps) {
  const user = useAuthUser<User>()
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

  return { form, ...form, fields, onAppendClicked, remove, user }
}
