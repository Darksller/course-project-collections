import { store } from '@/store/reduxStore'
import createRefresh from 'react-auth-kit/createRefresh'
import { authApi } from './authApi'

export const refreshApi = createRefresh<object>({
  interval: 0.5,
  refreshApiCallback: async (param) => {
    try {
      if (param.authToken === undefined)
        return { isSuccess: false, newAuthToken: '' }
      const promise = store.dispatch(authApi.endpoints.refresh.initiate(param))
      const response = await promise
      if ('data' in response) {
        return {
          isSuccess: true,
          newAuthToken: response.data,
          newAuthTokenExpireIn: 60,
        }
      }
      console.error(response.error)
      return {
        isSuccess: false,
        newAuthToken: '',
      }
    } catch (error) {
      console.error(error)
      return {
        isSuccess: false,
        newAuthToken: '',
      }
    }
  },
})
