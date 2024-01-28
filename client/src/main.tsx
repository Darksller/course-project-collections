import ReactDOM from 'react-dom/client'
import '@/styles/global.css'
import { ThemeProvider } from './components/ThemeProvider.tsx'
import { RouterProvider } from '@tanstack/react-router'
import { router } from '@/router/index.tsx'
import { I18nextProvider } from 'react-i18next'
import i18next from '@/translations'
import { Provider } from 'react-redux'
import { store } from './store/reduxStore.ts'
import authStore from '@/store/authStore.ts'
import AuthProvider from 'react-auth-kit'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <I18nextProvider i18n={i18next}>
    <ThemeProvider defaultTheme="dark">
      <AuthProvider store={authStore}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </AuthProvider>
    </ThemeProvider>
  </I18nextProvider>,
)
