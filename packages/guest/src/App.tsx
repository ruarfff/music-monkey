import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { StylesProvider, ThemeProvider } from '@material-ui/styles'
import { ConnectedRouter } from 'connected-react-router'
import { History } from 'history'
import { CookiesProvider } from 'react-cookie'
import AuthLoader from './auth/AuthLoaderContainer'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { SnackbarProvider } from 'notistack'
import SubscriptionWrapper from './subscriptions/SubscriptionWrapperContainer'
import { Routes } from './routes/routes'
import theme from 'theme/theme'
import RouteContextProvider from 'routes/RouteContext'

interface IAppProps {
  store: Store
  history: History
}

const App = ({ store, history }: IAppProps) => (
  <StylesProvider injectFirst>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        preventDuplicate={true}
        autoHideDuration={1500}
      >
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <CookiesProvider>
              <AuthLoader>
                <SubscriptionWrapper>
                  <RouteContextProvider>
                    <Routes history={history} />
                  </RouteContextProvider>
                </SubscriptionWrapper>
              </AuthLoader>
            </CookiesProvider>
          </ConnectedRouter>
        </Provider>
      </SnackbarProvider>
    </ThemeProvider>
  </StylesProvider>
)

export default App
