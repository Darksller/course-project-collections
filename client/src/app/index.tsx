import { RouterProvider } from '@tanstack/react-router'
import './styles/index.css'
import { router } from './router'
import { withProviders } from './providers'

const App = () => {
  // const [getMe] = useLazyGetMeQuery()
  // const { accessToken, setUser } = useAuthStore()

  // useEffect(() => {
  //   const getUserByAccessToken = async () => {
  //     if (accessToken) {
  //       try {
  //         const user = await getMe().unwrap()
  //         setUser(user)
  //       } catch (error) {
  //         console.error(error)
  //       }
  //     }
  //   }
  //   getUserByAccessToken()
  // }, [accessToken, getMe, setUser])

  return <RouterProvider router={router} />
}

export const AppWithProviders = withProviders(App)
