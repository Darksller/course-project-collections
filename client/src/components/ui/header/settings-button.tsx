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
            'group rounded-full border-pink-500 transition-all duration-500 hover:bg-white/50 hover:text-pink-500 dark:border-white dark:hover:bg-pink-500/50 dark:hover:text-white',
            className,
          )}
        >
          <GearIcon className="size-7 " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mx-2 mt-1 w-72 border-pink-500 bg-white/70 backdrop-blur dark:border-white dark:bg-pink-500/50 dark:backdrop-blur-lg">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none text-pink-600 dark:text-white">
              {t('settings')}
            </h4>
            <p className="text-sm text-pink-600/70 dark:text-white/70">
              {t('settingsDescription')}.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="w-full border border-pink-500/50 dark:border-white/50" />
            <div className="grid grid-cols-2 items-center gap-4">
              <Label className="text-pink-600 dark:text-white">
                {t('changeTheme')}:
              </Label>
              <SwitchThemeButton />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <Label className="text-pink-600 dark:text-white">
                {t('changeLanguage')}:
              </Label>
              <LanguageSelect />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
