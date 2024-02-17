import { Outlet } from '@tanstack/react-router'
import { Header } from '@/components/ui/header/Header'
import { useLazyGetMeQuery } from '@/api/usersApi'
import { useAuthStore } from '@/store/authStore'
import { useEffect } from 'react'

export function App() {
  const [getMe] = useLazyGetMeQuery()
  const { accessToken, setUser } = useAuthStore()

  useEffect(() => {
    const getUserByAccessToken = async () => {
      if (accessToken) {
        try {
          const user = await getMe().unwrap()
          setUser(user)
        } catch (error) {
          console.error(error)
        }
      }
    }
    getUserByAccessToken()
  }, [accessToken, getMe, setUser])

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
