import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { ConnectedRouter } from 'connected-react-router'
import { History } from 'history'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import Utils from '@date-io/moment'
import { Route } from 'react-router'
import { SnackbarProvider } from 'notistack'
import SubscriptionWrapper from 'subscriptions/SubscriptionWrapperContainer'
import theme from 'theme/theme'
import Layout from 'layout/LayoutContainer'
import Login from 'auth/LoginContainer'
import { userIsAuthenticated, userIsNotAuthenticated } from 'routes/routes'
import RouteContextProvider from 'routes/RouteContext'
import AuthLoader from 'auth/AuthLoaderContainer'

interface IAppProps {
  store: Store
  history: History
}

const App = ({ store, history }: IAppProps) => (
  <StylesProvider injectFirst>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={Utils}>
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
                      <Route path="/" component={userIsAuthenticated(Layout)} />
                      <Route
                        path="/login"
                        component={userIsNotAuthenticated(Login)}
                      />
                    </RouteContextProvider>
                  </SubscriptionWrapper>
                </AuthLoader>
              </CookiesProvider>
            </ConnectedRouter>
          </Provider>
        </SnackbarProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  </StylesProvider>
)

export default App
