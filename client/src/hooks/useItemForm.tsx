import { defaultFieldValues } from '@/constants/defaultValues'
import { AddItemPageProps } from '@/pages/AddItemPage'
import { ItemSchema, Tag } from '@/schemas/dbSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'

export function useItemForm({ collectionId, customFields }: AddItemPageProps) {
  const [tags, setTags] = useState<Tag[]>([])
  const form = useForm<z.infer<typeof ItemSchema>>({
    resolver: zodResolver(ItemSchema),
    defaultValues: {
      collection: collectionId,
      description: '',
      imageUrl: '',
      creationDate: new Date(),
      likeCount: 0,
      name: '',
      tags: [],
      customFieldsWithValue:
        customFields?.map((customField) => ({
          fieldName: customField.fieldName,
          fieldType: customField.fieldType,
          fieldValue: defaultFieldValues[customField.fieldType],
        })) || [],
      comments: [],
    },
  })
  return { form, tags, setTags }
}
