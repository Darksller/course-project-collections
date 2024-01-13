import { Button } from './ui/button'
import { HamburgerMenuIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { ProfileButton } from './ui/profile-button'
import { useTheme } from './ThemeProvider'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Navigation } from './Navigation'
import SearchBar from './ui/search-bar'
import { Link } from '@tanstack/react-router'

export function Header() {
	const { theme, setTheme } = useTheme()
	function switchTheme(): void {
		setTheme(theme === 'dark' ? 'light' : 'dark')
	}

	return (
		<header className='py-3 px-4 border-b shadow-md'>
			<div className='mx-auto w-full max-w-7xl'>
				<div className='relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between'>
					<div className='flex items-center'>
						<Sheet>
							<SheetTrigger>
								<HamburgerMenuIcon className='h-6 lg:hidden w-6' />
							</SheetTrigger>
							<SheetContent side='left' className='w-[300px] sm:w-[400px]'>
								<Navigation className='flex flex-col gap-2 mt-3' />
								<SearchBar className='mt-4 sm:hidden' />
							</SheetContent>
						</Sheet>
						<Link
							to={'/'}
							className='ml-2 flex transition-all duration-600 hover:tracking-widest max-w-28 '
						>
							<h1 className='text-2xl font-bold drop-shadow-light dark:drop-shadow-dark'>
								GrapeVault
							</h1>
							<img src='logo.svg' className='w-[30px] h-[30px] ml-1 ' />
						</Link>
					</div>
					<Navigation className='mx-6 items-center space-x-4 lg:space-x-6 lg:block hidden ' />

					<div className='flex items-center'>
						<SearchBar className='sm:block hidden mr-6' />
						<Button
							variant='ghost'
							className='mr-6'
							aria-label='Toggle Theme'
							onClick={switchTheme}
						>
							<SunIcon className='absolute h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 hover:text-yellow-500 ' />
							<MoonIcon className='absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hover:text-blue-500' />
							<span className='sr-only'>Toggle Theme</span>
						</Button>
						<ProfileButton />
					</div>
				</div>
			</div>
		</header>
	)
}
