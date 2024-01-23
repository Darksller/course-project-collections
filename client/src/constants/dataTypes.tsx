import { Button } from '@/components/ui/shadcn-ui/button'
import { Calendar } from '@/components/ui/shadcn-ui/calendar'
import { Checkbox } from '@/components/ui/shadcn-ui/checkbox'
import { Input } from '@/components/ui/shadcn-ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/shadcn-ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { ControllerRenderProps } from 'react-hook-form'

type DataType = {
  [key: string]: (props: CustomProps) => JSX.Element
}

export const dataType: DataType = {
  String: ({ field, ...props }: CustomProps) => (
    <Input
      {...field}
      {...props}
      type="text"
      value={field.value as string}
      onChange={field.onChange}
    />
  ),

  Boolean: ({ field }: CustomProps) => (
    <Checkbox checked={!!field.value} onCheckedChange={field.onChange} />
  ),

  Number: ({ field, ...props }: CustomProps) => (
    <Input
      {...field}
      {...props}
      type="number"
      value={field.value as number}
      onChange={field.onChange}
    />
  ),
  Date: ({ field }: CustomProps) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[240px] pl-3 text-left font-normal',
            !field.value && 'text-muted-foreground',
          )}
        >
          {field.value ? (
            format(field.value as string | number | Date, 'PPP')
          ) : (
            <span>Pick a date</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value as Date}
          onSelect={field.onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  ),
}

type CustomProps = {
  placeholder: string
  className?: string
  type?: string
  field: ControllerRenderProps<
    {
      name: string
      description: string
      imageUrl: string
      user: string
      collection: string
      likeCount: number
      comments: string[]
      tags: {
        _id: string
        color: string
      }[]
      customFieldsWithValue: {
        fieldName: string
        fieldType: string
        fieldValue: string | boolean | number | Date
        fieldState: string
      }[]
    },
    `customFieldsWithValue.${number}.fieldValue`
  >
}
