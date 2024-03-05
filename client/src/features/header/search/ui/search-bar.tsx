import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from '@tanstack/react-router'
import { Input } from '@/shared/ui'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { cn } from '@/shared/lib/utils'

type ChangeInputEvent = React.ChangeEvent<HTMLInputElement>

type SearchBarProps = {
  className?: string
  variant: 'default' | 'hideable'
}

export function SearchBar({ className, variant = 'default' }: SearchBarProps) {
  const navigate = useNavigate()
  const { t } = useTranslation('global')
  const [searchText, setSearchText] = useState<string>('')
  const onSearchInputChange = (event: ChangeInputEvent) => {
    setSearchText(event.target.value)
  }
  function onKeyPressed(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') navigate({ to: '', params: { searchText } })
  }

  return (
    <>
      {variant === 'hideable' && (
        <div className={cn('group flex justify-end', className)}>
          <Input
            type="search"
            placeholder={t('header.searchBar')}
            className="w-[0px] border-0 pr-9 shadow-none transition-all group-hover:w-[150px] group-hover:animate-open group-hover:border-[1px] group-hover:bg-secondary/90 group-hover:shadow-md focus-visible:w-[150px] focus-visible:animate-open focus-visible:bg-secondary/90 focus-visible:shadow-md"
            onChange={onSearchInputChange}
            onKeyDown={onKeyPressed}
          />
          <MagnifyingGlassIcon className="absolute my-1.5 mr-2 size-6 transition-all" />
        </div>
      )}
      {variant === 'default' && (
        <div className={cn(className)}>
          <MagnifyingGlassIcon className="absolute my-1.5 ml-2 size-6 transition-all" />
          <Input
            type="search"
            placeholder={t('header.searchBar')}
            className="bg-secondary/90 pl-9 shadow-md"
            onChange={onSearchInputChange}
            onKeyDown={onKeyPressed}
          />
        </div>
      )}
    </>
  )
}
