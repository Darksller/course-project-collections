import { store } from '@/store/reduxStore'
import createRefresh from 'react-auth-kit/createRefresh'
import { authApi } from './authApi'

export const refreshApi = createRefresh<object>({
  interval: 0.5,
  //@ts-ignore
  refreshApiCallback: async (param) => {
    try {
      if (param.authToken === undefined) return { isSuccess: false }
      const promise = store.dispatch(authApi.endpoints.refresh.initiate(param))
      const response = await promise
      return {
        isSuccess: true,
        //@ts-ignore
        newAuthToken: response.data,
        newAuthTokenExpireIn: 0.5,
      }
    } catch (error) {
      console.error(error)
      return {
        isSuccess: false,
      }
    }
  },
})
