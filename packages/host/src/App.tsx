import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { StylesProvider, ThemeProvider } from '@material-ui/styles'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { ConnectedRouter } from 'connected-react-router'
import { History } from 'history'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import Utils from '@date-io/date-fns'
import { Route } from 'react-router'
import SubscriptionWrapper from 'subscriptions/SubscriptionWrapperContainer'
import theme from 'theme/theme'
import Layout from 'layout/LayoutContainer'
import Login from 'auth/LoginContainer'
import { userIsAuthenticated, userIsNotAuthenticated } from 'routes/routes'
import RouteContextProvider from 'routes/RouteContext'

interface IAppProps {
  store: Store
  history: History
}

const App = ({ store, history }: IAppProps) => (
  <StylesProvider injectFirst>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={Utils}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <CookiesProvider>
              <SubscriptionWrapper>
                <RouteContextProvider>
                  <Route path="/" component={userIsAuthenticated(Layout)} />
                  <Route
                    path="/login"
                    component={userIsNotAuthenticated(Login)}
                  />
                </RouteContextProvider>
              </SubscriptionWrapper>
            </CookiesProvider>
          </ConnectedRouter>
        </Provider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  </StylesProvider>
)

export default App
