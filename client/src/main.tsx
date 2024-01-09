import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { App } from './App.tsx'
import '@/styles/global.css'
import { ThemeProvider } from './components/ThemeProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Router>
		<ThemeProvider defaultTheme='dark'>
			<App />
		</ThemeProvider>
	</Router>
)
