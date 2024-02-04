import { ControllerRenderProps, FieldValues } from 'react-hook-form'

export type CollectionsControllerProps = ControllerRenderProps<
  FieldValues,
  CollectionField
>

export type CollectionField =
  | '_id'
  | 'category'
  | 'description'
  | 'creationDate'
  | 'name'
  | 'isClosed'
  | 'user'
  | 'imageUrl'
  | 'customFields'
  | 'likeCount'
  | `customFields.${number}`
  | `customFields.${number}.fieldName`
  | `customFields.${number}.fieldType`
