import { create } from 'zustand'
import Cookies from 'js-cookie'
import { UserPayload } from '@/api/types/dto/UserPayload'

type AuthStore = {
  isAuthenticated: boolean
  accessToken: string | undefined
  refreshToken: string | undefined
  signIn: (accessToken: string, refreshToken: string) => void
  signOut: () => void
  user: UserPayload | null
  setUser: (user: UserPayload) => void
}

const getAuthCookie = () => Cookies.get('_auth')
const getRefreshCookie = () => Cookies.get('_auth_ref')

const setAuthCookies = (accessToken: string, refreshToken: string) => {
  Cookies.set('_auth', accessToken)
  Cookies.set('_auth_ref', refreshToken)
}

const removeAuthCookies = () => {
  Cookies.remove('_auth')
  Cookies.remove('_auth_ref')
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: !!getAuthCookie(),
  accessToken: getAuthCookie(),
  refreshToken: getRefreshCookie(),
  signIn: (accessToken, refreshToken) => {
    setAuthCookies(accessToken, refreshToken)
    set({
      isAuthenticated: true,
      accessToken,
      refreshToken,
    })
    window.location.reload()
  },
  signOut: () => {
    removeAuthCookies()
    set({
      isAuthenticated: false,
      accessToken: '',
      refreshToken: '',
    })
    window.location.reload()
  },
  user: null,
  setUser: (user) => set({ user }),
}))
