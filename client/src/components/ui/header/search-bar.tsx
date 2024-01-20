import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Input } from '../shadcn-ui/input'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import { useTranslation } from 'react-i18next'

type ChangeInputEvent = React.ChangeEvent<HTMLInputElement>

type SearchBarProps = React.HTMLAttributes<HTMLElement>

export default function SearchBar({ className }: SearchBarProps) {
  const { t } = useTranslation('global')
  const [searchText, setSearchText] = useState<string>('')

  const onSearchInputChange = useDebounce((event: ChangeInputEvent) => {
    setSearchText(event.target.value)
  }, 300)

  function onKeyPressed(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') console.log(searchText)
  }
  return (
    <div className={cn(className)}>
      <MagnifyingGlassIcon
        className={cn(
          'absolute z-[9] my-1.5 ml-2 h-6 w-6 text-pink-500 dark:text-white',
        )}
      />
      <Input
        type="search"
        placeholder={t('searchBar')}
        className="border-pink-600 bg-white/40 pl-9 font-muli text-white placeholder:font-muli placeholder:text-pink-500 focus:backdrop-blur-md dark:border-white dark:bg-pink-500/40 dark:placeholder:text-white"
        onChange={onSearchInputChange}
        onKeyDown={onKeyPressed}
      />
    </div>
  )
}
