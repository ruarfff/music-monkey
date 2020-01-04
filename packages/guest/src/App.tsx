import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { StylesProvider, ThemeProvider } from '@material-ui/styles'
import { ConnectedRouter } from 'connected-react-router'
import { History } from 'history'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { Route } from 'react-router'
import { SnackbarProvider } from 'notistack'
import SubscriptionWrapper from 'subscriptions/SubscriptionWrapperContainer'
import theme from 'theme/theme'
import Layout from 'layout/LayoutContainer'
import { userIsAuthenticated, userIsNotAuthenticated } from 'routes/routes'
import RouteContextProvider from 'routes/RouteContext'

import Login from 'auth/LoginContainer'
//import SignUp from 'auth/SignUpContainer'
//import Invite from 'invite/components/InviteContainer'
//import Stepper from 'stepper/StepperContainer'

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
              <SubscriptionWrapper>
                <RouteContextProvider>
                  <Route path="/" component={userIsAuthenticated(Layout)} />
                  <Route
                    path="/login"
                    component={userIsNotAuthenticated(Login)}
                  />
                  {/* <Route
                        path="/invite/:inviteId"
                        component={userIsNotAuthenticated(Invite)}
                      /> */}
                  {/* <Route
                    path="/about"
                    component={userIsNotAuthenticated(Stepper)}
                  />
                  <Route
                    path="/signup"
                    component={userIsNotAuthenticated(SignUp)}
                  /> */}
                </RouteContextProvider>
              </SubscriptionWrapper>
            </CookiesProvider>
          </ConnectedRouter>
        </Provider>
      </SnackbarProvider>
    </ThemeProvider>
  </StylesProvider>
)

export default App
