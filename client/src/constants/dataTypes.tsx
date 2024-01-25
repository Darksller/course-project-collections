import { Button } from '@/components/ui/shadcn-ui/button'
import { Calendar } from '@/components/ui/shadcn-ui/calendar'
import { Input } from '@/components/ui/shadcn-ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/shadcn-ui/popover'
import { Switch } from '@/components/ui/shadcn-ui/switch'
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
    <Switch checked={!!field.value} onCheckedChange={field.onChange} />
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
            'w-[90%] border-purple-700/50 bg-white/50  text-left font-normal dark:bg-purple-700/50 dark:hover:bg-purple-700',
            !field.value && 'text-muted-foreground',
          )}
        >
          {field.value ? (
            <span className="max-sm:text-[10px]">
              {format(field.value as string | number | Date, 'PP')}
            </span>
          ) : (
            <span>Pick a date</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          className="dark:bg-purple-700/50"
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
  disabled: boolean
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
