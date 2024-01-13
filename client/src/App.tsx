import { Outlet } from '@tanstack/react-router'
import { Header } from './components/Header'

export function App() {
	return (
		<>
			<Header />
			<Outlet />
		</>
	)
}
