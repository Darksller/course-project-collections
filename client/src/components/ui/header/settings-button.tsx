import { Button } from '@/components/ui/shadcn-ui/button'
import { Label } from '@/components/ui/shadcn-ui/label'
import { GearIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '../shadcn-ui/popover'
import { useTranslation } from 'react-i18next'
import { LanguageSelect } from './language-select'
import SwitchThemeButton from './switch-theme-button'

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
            'group rounded-full transition-all duration-500 hover:bg-white dark:border-white dark:hover:bg-purple-600 dark:hover:text-white',
            className,
          )}
        >
          <GearIcon className="size-7 " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mx-2 mt-1 w-72 border-purple-600 bg-white/70 backdrop-blur dark:border-white dark:bg-purple-500/50 dark:backdrop-blur-lg">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">{t('settings')}</h4>
            <p className="text-sm text-purple-600/70 dark:text-white/70">
              {t('settingsDescription')}.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="w-full border border-purple-600/50 dark:border-white/50" />
            <div className="grid grid-cols-2 items-center gap-4">
              <Label>{t('changeTheme')}:</Label>
              <SwitchThemeButton />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <Label>{t('changeLanguage')}:</Label>
              <LanguageSelect />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
