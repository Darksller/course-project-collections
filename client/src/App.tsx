import { Outlet } from '@tanstack/react-router'
import { Header } from './components/ui/header/Header'
import { useLazyGetUserByAccessTokenQuery } from './api/usersApi'
import { useAuthStore } from './store/authStore'
import { useEffect } from 'react'

export function App() {
  const [getUser] = useLazyGetUserByAccessTokenQuery()
  const { accessToken, setUser } = useAuthStore()

  useEffect(() => {
    const getUserByAccessToken = async () => {
      if (accessToken) {
        try {
          const user = await getUser(accessToken).unwrap()
          setUser(user)
        } catch (error) {
          console.error(error)
        }
      }
    }
    getUserByAccessToken()
  }, [accessToken])
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
