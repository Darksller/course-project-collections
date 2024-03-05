import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Separator,
} from '@/shared/ui'
import { useTranslation } from 'react-i18next'

export function LanguageSelect() {
  const { t, i18n } = useTranslation('global')

  const onLanguageChange = (value: string) => {
    localStorage.setItem('lang', value)
    i18n.changeLanguage(value)
  }

  return (
    <Select onValueChange={onLanguageChange}>
      <SelectTrigger>
        <SelectValue
          placeholder={t('header.settings.language.' + i18n.language)}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="flex flex-col gap-1 ">
          <SelectLabel>{t('header.settings.language.languages')}:</SelectLabel>
          <Separator />
          <SelectItem value="ru" className="italic">
            {t('header.settings.language.ru')}
          </SelectItem>
          <SelectItem value="en" className="italic">
            {t('header.settings.language.en')}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
