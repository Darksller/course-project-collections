import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/shadcn-ui/select'
import { useTranslation } from 'react-i18next'

export function LanguageSelect() {
  const { t, i18n } = useTranslation('global')

  function onLanguageChange(event: string) {
    i18n.changeLanguage(event)
  }
  return (
    <Select onValueChange={onLanguageChange}>
      <SelectTrigger>
        <SelectValue
          placeholder={t(i18n.language)}
          className="border-purple-500"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('languages')}:</SelectLabel>
          <SelectItem value="ru">Русский</SelectItem>
          <SelectItem value="en">English</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
