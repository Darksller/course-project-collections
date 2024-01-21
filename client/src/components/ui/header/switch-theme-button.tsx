import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from '../../ThemeProvider'
import { Button } from '../shadcn-ui/button'

export default function SwitchThemeButton() {
  const { theme, setTheme } = useTheme()

  function switchTheme(): void {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  return (
    <Button
      variant="ghost"
      aria-label="Toggle Theme"
      onClick={switchTheme}
      className="transition-all duration-300 hover:scale-105 hover:bg-white/50 hover:text-purple-600 dark:border-white dark:hover:bg-purple-600/50 dark:hover:text-white"
    >
      <SunIcon className="absolute h-6 w-6 rotate-0 scale-100  transition-all dark:-rotate-90 dark:scale-0 " />
      <MoonIcon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
