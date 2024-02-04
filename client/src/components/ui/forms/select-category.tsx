import { Category } from '@/schemas/dbSchemas'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../shadcn-ui/select'
import { CollectionsControllerProps } from '@/schemas/formField.types'

type SelectCategory = {
  field: CollectionsControllerProps
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
