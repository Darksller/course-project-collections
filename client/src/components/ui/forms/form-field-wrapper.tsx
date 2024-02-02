import {
  CollectionsControllerProps,
  CollectionField,
} from '@/schemas/formField.types'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../shadcn-ui/form'
import { ReactNode } from 'react'

type FormFieldWrapperProps = {
  name: CollectionField
  children: (field: CollectionsControllerProps) => ReactNode
  control: any
}

export const FormFieldWrapper = ({
  name,
  children,
  control,
}: FormFieldWrapperProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>{children(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
