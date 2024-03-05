import { store } from '@/shared/config/redux-toolkit'
import { Provider } from 'react-redux'

export const RtkProvider = (component: () => React.ReactNode) => () => (
  <Provider store={store}>{component()}</Provider>
)
