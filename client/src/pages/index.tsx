import { useAuthStore, useLazyFetchMeQuery } from '@/entities/viewer'
import { Header } from '@/widgets/header'
import { Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'
import Headroom from 'react-headroom'
export const Index = () => {
  const [getMe] = useLazyFetchMeQuery()
  const { accessToken, setUser } = useAuthStore()

  useEffect(() => {
    const getUserByAccessToken = async () => {
      if (accessToken) {
        try {
          const user = await getMe().unwrap()
          setUser(user)
          console.log(user)
        } catch (error) {
          console.error(error)
        }
      }
    }
    getUserByAccessToken()
  }, [accessToken, getMe, setUser])

  return (
    <div className="font-inter">
      <Headroom className="mt-1">
        <Header />
      </Headroom>
      <Outlet />
    </div>
  )
}
