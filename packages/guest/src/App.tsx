import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { StylesProvider, ThemeProvider } from '@material-ui/styles'
import { ConnectedRouter } from 'connected-react-router'
import { History } from 'history'
import { CookiesProvider } from 'react-cookie'
import AuthLoader from './auth/AuthLoaderContainer'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import SubscriptionWrapper from './subscriptions/SubscriptionWrapperContainer'
import { Routes } from './routes'
import theme from './theme/theme'

interface IAppProps {
  store: Store
  history: History
}

const App = ({ store, history }: IAppProps) => (
  <StylesProvider injectFirst>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <CookiesProvider>
            <AuthLoader>
              <SubscriptionWrapper>
                <Routes history={history} />
              </SubscriptionWrapper>
            </AuthLoader>
          </CookiesProvider>
        </ConnectedRouter>
      </Provider>
    </ThemeProvider>
  </StylesProvider>
)

export default App
