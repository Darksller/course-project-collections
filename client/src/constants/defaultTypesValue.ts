export const defaultType: DefaultFieldValues = {
  String: '',
  Boolean: false,
  Date: new Date(),
  Number: 0,
}

type DefaultFieldValues = {
  [key: string]: string | boolean | Date | number
}
