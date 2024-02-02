import { Outlet } from '@tanstack/react-router'
import { Header } from './components/ui/header/Header'

export function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
