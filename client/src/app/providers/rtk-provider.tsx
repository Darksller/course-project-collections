import { store } from '@/app/rtk/store'
import { Provider } from 'react-redux'

export const RtkProvider = (component: () => React.ReactNode) => () => (
  <Provider store={store}>{component()}</Provider>
)
