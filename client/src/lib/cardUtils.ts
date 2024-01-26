import { CustomFieldWithValue } from '@/schemas/dbSchemas'
import { format } from 'date-fns'

export function getFieldsToPresent(
  fields: CustomFieldWithValue[],
): CustomFieldWithValue[] {
  const fieldsToPresent = fields.filter((field) => field.fieldValue !== null)
  const result = fieldsToPresent.map((field) => {
    if (field.fieldType === 'Date') {
      return { ...field, fieldValue: format(field.fieldValue.toString(), 'pp') }
    }
    return field
  })
  return result.slice(0, 4)
}
