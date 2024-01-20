import { LanguageSelect } from './ui/header/language-select'

export function Footer() {
  return (
    <div className="flex h-[56px] w-full items-center bg-pink-600 bg-white/60 px-6 font-muli text-pink-600/100 shadow-2xl backdrop-blur dark:bg-pink-600/50 dark:text-white">
      <LanguageSelect />
    </div>
  )
}
