import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles'
import { ConnectedRouter } from 'connected-react-router'
import { History } from 'history'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { Route, Switch } from 'react-router'
import { SnackbarProvider } from 'notistack'
import SubscriptionWrapper from 'subscriptions/SubscriptionWrapperContainer'
import theme from 'theme/theme'
import Layout from 'layout/LayoutContainer'
import { userIsAuthenticated, userIsNotAuthenticated } from 'routes/routes'
import RouteContextProvider from 'routes/RouteContext'
import { NotificationContextProvider } from 'mm-shared'
import AuthLoader from 'auth/AuthLoaderContainer'
import InviteLoader from 'invite/components/InviteLoader'
import Login from 'auth/LoginContainer'
import SignUp from 'auth/SignUpContainer'
import Invite from 'invite/components/InviteContainer'
import Stepper from 'stepper/StepperContainer'
import './App.scss'

interface IAppProps {
  store: Store
  history: History
}

const App = ({ store, history }: IAppProps) => (
  <StylesProvider injectFirst>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        maxSnack={3}
        preventDuplicate={true}
        autoHideDuration={1000}
        classes={{
          variantSuccess: 'alert-success-custom'
        }}
        dense={true}
      >
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <CookiesProvider>
              <AuthLoader>
                  <NotificationContextProvider>
                <SubscriptionWrapper>
                  <RouteContextProvider>
                    <Switch>
                      <Route
                        path="/invite/:inviteId"
                        component={Invite}
                        exact={true}
                      />
                      <Route
                        path="/login"
                        component={userIsNotAuthenticated(Login)}
                        exact={true}
                      />
                      <Route
                        path="/about"
                        component={userIsNotAuthenticated(Stepper)}
                      />
                      <Route
                        path="/signup"
                        component={userIsNotAuthenticated(SignUp)}
                        exact={true}
                      />
                      <InviteLoader>
                        <Route
                          path="/"
                          component={userIsAuthenticated(Layout)}
                        />
                      </InviteLoader>
                    </Switch>
                  </RouteContextProvider>
                </SubscriptionWrapper>
                  </NotificationContextProvider>
              </AuthLoader>
            </CookiesProvider>
          </ConnectedRouter>
        </Provider>
      </SnackbarProvider>
    </ThemeProvider>
  </StylesProvider>
)

export default App
