import { defaultType } from '@/constants/defaultTypesValue'
import { AddItemPageProps } from '@/pages/AddItemPage'
import { ItemSchema, Tag, User } from '@/schemas/dbSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'

export function useItemForm({ collectionId, customFields }: AddItemPageProps) {
  const [tags, setTags] = useState<Tag[]>([])
  const user = useAuthUser<User>()
  const form = useForm<z.infer<typeof ItemSchema>>({
    resolver: zodResolver(ItemSchema),
    defaultValues: {
      collection: collectionId,
      description: '',
      imageUrl: '',
      creationDate: new Date(),
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
  return { form, tags, setTags }
}
