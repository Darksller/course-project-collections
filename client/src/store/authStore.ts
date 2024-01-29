import createStore from 'react-auth-kit/createStore'
import Cookies from 'js-cookie'
import { refreshApi } from '@/api/refreshApi'

const store = createStore<object>({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: false,
  refresh: refreshApi,
})

export default store
