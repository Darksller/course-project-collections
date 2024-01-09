import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Input } from './input'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useDebounce } from '@/hooks/useDebounce'

type ChangeInputEvent = React.ChangeEvent<HTMLInputElement>

type SearchBarProps = React.HTMLAttributes<HTMLElement>

export default function SearchBar({ className }: SearchBarProps) {
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
				className={cn('absolute h-6 w-6 my-1.5 text-gray-500 ml-2')}
			/>
			<Input
				type='search'
				placeholder='Search'
				className='pl-9'
				onChange={onSearchInputChange}
				onKeyDown={onKeyPressed}
			/>
		</div>
	)
}
