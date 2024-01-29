import { Outlet } from '@tanstack/react-router'
import { Header } from './components/Header'

export function App() {
  return (
    <div className="font-cgr">
      <Header />
      <Outlet />
    </div>
  )
}
