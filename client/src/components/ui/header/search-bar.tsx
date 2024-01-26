import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Input } from '../shadcn-ui/input'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import { useTranslation } from 'react-i18next'
import { useNavigate } from '@tanstack/react-router'

type ChangeInputEvent = React.ChangeEvent<HTMLInputElement>

type SearchBarProps = React.HTMLAttributes<HTMLElement>

export default function SearchBar({ className }: SearchBarProps) {
  const navigate = useNavigate()
  const { t } = useTranslation('global')
  const [searchText, setSearchText] = useState<string>('')

  const onSearchInputChange = useDebounce((event: ChangeInputEvent) => {
    setSearchText(event.target.value)
  }, 100)

  function onKeyPressed(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter')
      navigate({ to: '/search/$searchText', params: { searchText } })
  }
  return (
    <div className={cn(className)}>
      <MagnifyingGlassIcon
        className={cn(
          'absolute z-[9] my-1.5 ml-2 h-6 w-6 text-purple-600 dark:text-white',
        )}
      />
      <Input
        type="search"
        placeholder={t('searchBar')}
        className="border-purple-700 bg-white/40 pl-9 placeholder:text-purple-600 focus:backdrop-blur-md dark:border-white dark:bg-purple-500 dark:bg-opacity-0 dark:placeholder:text-white"
        onChange={onSearchInputChange}
        onKeyDown={onKeyPressed}
      />
    </div>
  )
}
