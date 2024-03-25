import { create } from 'zustand'
import {
  getAuthCookie,
  getRefreshCookie,
  setAuthCookies,
  removeAuthCookies,
} from '../../../shared/lib/authUtils'
import { UserPayload } from '../types/UserPayload'

type AuthStore = {
  isAuthenticated: boolean
  accessToken: string | undefined
  refreshToken: string | undefined
  signIn: (accessToken: string, refreshToken: string) => void
  signOut: () => void
  user: UserPayload | null
  setUser: (user: UserPayload) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: !!getAuthCookie(),
  accessToken: getAuthCookie(),
  refreshToken: getRefreshCookie(),
  user: null,
  setUser: (user) => set({ user }),
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
}))
