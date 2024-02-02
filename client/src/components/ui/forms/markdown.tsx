import { ControllerRenderProps } from 'react-hook-form'
import { Textarea } from '../shadcn-ui/textarea'

type MarkdownProps = {
  imgLoad: boolean
  field: ControllerRenderProps<
    {
      name: string
      description: string
      imageUrl: string
      creationDate: Date
      user: string
      collection: string
      likeCount: number
      comments: string[]
      tags: {
        name: string
        color: string
        _id: string
      }[]
      customFieldsWithValue: {}[]
    },
    'description'
  >
}

export const Markdown = ({ imgLoad = false, field }: MarkdownProps) => {
  return (
    <Textarea
      disabled={imgLoad}
      {...field}
      placeholder="Item description"
      className="max-h-24 min-h-24 border-purple-700/50 dark:border-white/50"
    />
  )
}
