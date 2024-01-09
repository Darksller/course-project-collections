import { Link } from 'react-router-dom'
import { routes } from '@/constants/routes'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

type NavProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLElement>,
	HTMLElement
>

export function Navigation({ className }: NavProps) {
	return (
		<nav className={cn(className)}>
			{routes.map((route, i) => (
				<Button
					key={i}
					asChild
					variant='ghost'
					className='h-[20px] max-lg:block max-lg:px-2 max-lg:py-1 max-lg:text-lg duration-300 transition-all lg:hover:text-xl lg:text-base'
				>
					<Link key={i} to={route.href}>
						{route.label}
					</Link>
				</Button>
			))}
		</nav>
	)
}
