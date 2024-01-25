import { CollectionSchema, User } from '@/schemas/dbSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

export function useCollectionForm() {
  const user = useAuthUser<User>()
  const form = useForm<z.infer<typeof CollectionSchema>>({
    resolver: zodResolver(CollectionSchema),
    defaultValues: {
      name: '',
      description: '',
      imageUrl: '',
      likeCount: 0,
      creationDate: new Date(),
      isClosed: false,
      category: '',
      user: user?._id,
      customFields: [{ fieldName: '', fieldType: '', fieldState: '' }],
    },
  })
  const { fields, append, remove } = useFieldArray({
    name: 'customFields',
    control: form.control,
  })
  const onAppendClicked = () =>
    append({ fieldName: '', fieldType: '', fieldState: '' })

  return { form, ...form, fields, onAppendClicked, remove, user }
}
