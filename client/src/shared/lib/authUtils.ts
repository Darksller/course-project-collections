import Cookies from 'js-cookie'

export const getAuthCookie = () =>
  Cookies.get(import.meta.env.VITE_ACCESS_TOKEN)
export const getRefreshCookie = () =>
  Cookies.get(import.meta.env.VITE_REFRESH_TOKEN)

export const setAuthCookies = (accessToken: string, refreshToken: string) => {
  Cookies.set(import.meta.env.VITE_ACCESS_TOKEN, accessToken)
  Cookies.set(import.meta.env.VITE_REFRESH_TOKEN, refreshToken)
}

export const removeAuthCookies = () => {
  Cookies.remove(import.meta.env.VITE_ACCESS_TOKEN)
  Cookies.remove(import.meta.env.VITE_REFRESH_TOKEN)
}
