import { CustomFieldWithValue } from '@/schemas/dbSchemas'

export function getFieldsToPresent(
  fields: CustomFieldWithValue[],
): CustomFieldWithValue[] {
  const fieldsToPresent = fields.filter((field) => field.fieldValue !== null)
  return fieldsToPresent.slice(0, 4)
}
