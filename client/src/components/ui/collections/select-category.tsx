import { Category } from '@/schemas/dbSchemas'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../shadcn-ui/select'
import { ControllerRenderProps } from 'react-hook-form'

type SelectCategory = {
  field: ControllerRenderProps<
    {
      name: string
      description: string
      imageUrl: string
      user: string
      category: string
      likeCount: number
      isClosed: boolean
      customFields: {
        fieldName: string
        fieldType: string
        fieldState: string
      }[]
    },
    'category'
  >
  options: Category[] | undefined
  className?: string
}

export function SelectCategory({ field, options, ...props }: SelectCategory) {
  return (
    <Select
      {...props}
      onValueChange={field.onChange}
      defaultValue={field.value}
    >
      <SelectTrigger className="rounded-none">
        <SelectValue placeholder="Select collection category" />
      </SelectTrigger>
      <SelectContent>
        {options?.map((option) => (
          <SelectItem key={option._id} value={option._id}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
