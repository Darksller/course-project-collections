import Cookies from 'js-cookie'

export const getAuthCookie = () => Cookies.get('_auth')
export const getRefreshCookie = () => Cookies.get('_auth_ref')

export const setAuthCookies = (accessToken: string, refreshToken: string) => {
  Cookies.set('_auth', accessToken)
  Cookies.set('_auth_ref', refreshToken)
}

export const removeAuthCookies = () => {
  Cookies.remove('_auth')
  Cookies.remove('_auth_ref')
}
