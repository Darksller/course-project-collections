import { CustomFieldWithValue } from '@/schemas/dbSchemas'

export function getFieldsToPresent(
  fields: CustomFieldWithValue[],
): CustomFieldWithValue[] {
  const requiredFieldsToPresent = fields.filter(
    (field) => field.fieldState === 'PRESENT_REQUIRED',
  )

  if (requiredFieldsToPresent.length < 4) {
    const optionalFieldsToPresent = fields.filter(
      (field) => field.fieldState === 'PRESENT_OPTIONAL',
    )
    return requiredFieldsToPresent.concat(optionalFieldsToPresent).slice(0, 4)
  }

  return requiredFieldsToPresent.slice(0, 4)
}
