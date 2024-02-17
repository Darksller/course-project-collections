import ReactDOM from 'react-dom/client'
import '@/styles/global.css'
import { ThemeProvider } from './components/ThemeProvider.tsx'
import { I18nextProvider } from 'react-i18next'
import i18next from '@/translations'
import { Provider } from 'react-redux'
import { store } from './store/reduxStore.ts'
import { RouterContext } from './router/routerContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <I18nextProvider i18n={i18next}>
    <ThemeProvider defaultTheme="dark">
      <Provider store={store}>
        <RouterContext />
      </Provider>
    </ThemeProvider>
  </I18nextProvider>,
)
