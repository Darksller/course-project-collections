import { create } from 'zustand'
import { User } from '@/shared/api/types'
import {
  getAuthCookie,
  getRefreshCookie,
  setAuthCookies,
  removeAuthCookies,
} from '../lib/authUtils'

type AuthStore = {
  isAuthenticated: boolean
  accessToken: string | undefined
  refreshToken: string | undefined
  signIn: (accessToken: string, refreshToken: string) => void
  signOut: () => void
  user: User | null
  setUser: (user: User) => void
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
