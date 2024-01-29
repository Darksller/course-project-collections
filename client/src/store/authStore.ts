import createStore from 'react-auth-kit/createStore'
import { refreshApi } from '@/api/refreshApi'

const store = createStore<object>({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: true,
  refresh: refreshApi,
})

export default store
