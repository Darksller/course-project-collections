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
      creationDate: Date
      likeCount: number
      isClosed: boolean
      customFields: {
        fieldName: string
        fieldType: string
      }[]
    },
    'category'
  >
  options: Category[] | undefined
  className?: string
  disabled?: boolean
}

export function SelectCategory({
  field,
  options,
  disabled,
  ...props
}: SelectCategory) {
  return (
    <Select
      {...props}
      disabled={disabled}
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
