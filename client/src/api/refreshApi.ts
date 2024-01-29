import { store } from '@/store/reduxStore'
import createRefresh from 'react-auth-kit/createRefresh'
import { authApi } from './authApi'

export const refreshApi = createRefresh<object>({
  interval: 0.5,
  refreshApiCallback: async (param) => {
    try {
      if (param.authToken === undefined) return { isSuccess: false }
      const promise = store.dispatch(authApi.endpoints.refresh.initiate(param))
      const response = await promise
      console.log(response)
      return {
        isSuccess: true,
        newAuthToken: response.data.accessToken,
        newAuthTokenExpireIn: 60,
      }
    } catch (error) {
      console.error(error)
      return {
        isSuccess: false,
      }
    }
  },
})
