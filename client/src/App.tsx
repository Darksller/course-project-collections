import { Header } from './components/Header'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'

export function App() {
	return (
		<div>
			<Header />
			<Home />
			<Routes>
				<Route path='/' />
			</Routes>
		</div>
	)
}
