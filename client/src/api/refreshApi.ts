import { store } from '@/store/reduxStore'
import createRefresh from 'react-auth-kit/createRefresh'
import { authApi } from './authApi'

export type RefreshApiType = {
  authToken?: string | undefined
  refreshToken?: string | undefined
  authUserState: unknown
}

export const refreshApi = createRefresh({
  interval: 10,
  refreshApiCallback: async (param) => {
    try {
      if (param.authToken === undefined) return { isSuccess: false }

      const promise = store.dispatch(authApi.endpoints.refresh.initiate(param))

      const response = await promise

      return {
        isSuccess: true,
        newAuthToken: response.data,
        newAuthTokenExpireIn: 10,
        newRefreshTokenExpiresIn: 60,
      }
    } catch (error) {
      console.error(error)
      return {
        isSuccess: false,
      }
    }
  },
})
