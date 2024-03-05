import { LanguageSelect } from '@/features/header/language-select'
import { ToggleThemeButton } from '@/features/header/toggle-theme'
import { cn } from '@/shared/lib/utils'
import {
  Button,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from '@/shared/ui'
import { GearIcon } from '@radix-ui/react-icons'
import { useTranslation } from 'react-i18next'

type SettingButtonProps = {
  className?: string
}

export function SettingsButton({ className }: SettingButtonProps) {
  const { t } = useTranslation('global')

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'group rounded-full transition-all duration-500 hover:rotate-180 hover:bg-secondary',
            className,
          )}
        >
          <GearIcon className="size-7 " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mx-2 mt-1 w-72 bg-secondary/80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none text-primary">
              {t('header.settings.index')}
            </h4>
            <p className="text-sm text-muted-foreground">
              {t('header.settings.settingsDescription')}.
            </p>
          </div>
          <div className="grid gap-2">
            <Separator className="border-[1px] border-primary/50" />
            <div className="grid w-full grid-cols-2 items-center  gap-4 text-primary">
              <Label>{t('header.settings.changeTheme')}:</Label>
              <ToggleThemeButton className="w-full justify-center" />
            </div>
            <div className="grid grid-cols-2 items-center gap-4 text-primary">
              <Label>{t('header.settings.language.changeLanguage')}:</Label>
              <LanguageSelect />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
