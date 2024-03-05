export type CustomField = {
  fieldName: string
  fieldType: string
}
export type CustomFieldWithValue = CustomField & {
  fieldValue: string | boolean | number | Date
}
