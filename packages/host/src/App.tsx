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
import CloseIcon from '@material-ui/icons/Close'
import { IconButton } from '@material-ui/core'
import theme from 'theme/theme'
import Layout from 'layout/LayoutContainer'
import Login from 'auth/LoginContainer'
import { userIsAuthenticated, userIsNotAuthenticated } from 'routes/routes'
import RouteContextProvider from 'routes/RouteContext'
import AuthLoader from 'auth/AuthLoaderContainer'
import { NotificationContextProvider } from 'mm-shared'
import SubscriptionWrapper from './subscriptions/SubscriptionWrapperContainer'
import './App.scss'

interface AppProps {
  store: Store
  history: History
}

const App = ({ store, history }: AppProps) => {
  const notistackRef: any = React.createRef()
  const onClickDismiss = (key: any) => () => {
    try {
      notistackRef!.current.closeSnackbar(key)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <StylesProvider injectFirst>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={Utils}>
          <SnackbarProvider
            autoHideDuration={2000}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            maxSnack={3}
            preventDuplicate={true}
            classes={{
              variantSuccess: 'alert-success-custom'
            }}
            dense={true}
            ref={notistackRef}
            action={(key) => (
              <IconButton onClick={onClickDismiss(key)} aria-label="dismiss">
                <CloseIcon />
              </IconButton>
            )}
          >
            <Provider store={store}>
              <ConnectedRouter history={history}>
                <CookiesProvider>
                  <AuthLoader>
                    <NotificationContextProvider>
                      <SubscriptionWrapper>
                        <RouteContextProvider>
                          <Route
                            path="/"
                            component={userIsAuthenticated(Layout)}
                          />
                          <Route
                            path="/login"
                            component={userIsNotAuthenticated(Login)}
                          />
                        </RouteContextProvider>
                      </SubscriptionWrapper>
                    </NotificationContextProvider>
                  </AuthLoader>
                </CookiesProvider>
              </ConnectedRouter>
            </Provider>
          </SnackbarProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </StylesProvider>
  )
}

export default App
