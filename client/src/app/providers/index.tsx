import compose from 'compose-function'
import { TranslationProvider } from './translation-provider'
import { RtkProvider } from './rtk-provider'
import { ThemeProvider } from './theme-provider'

export const withProviders = compose(
  ThemeProvider,
  TranslationProvider,
  RtkProvider,
)
