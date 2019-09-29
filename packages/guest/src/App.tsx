import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { StylesProvider } from '@material-ui/styles'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { ConnectedRouter } from 'connected-react-router'
import { History } from 'history'
import { CookiesProvider } from 'react-cookie'
import AuthLoader from './auth/AuthLoaderContainer'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import SubscriptionWrapper from './subscriptions/SubscriptionWrapperContainer'
import { Routes } from './routes'
import theme from './theme/theme'
import './App.scss'

interface IAppProps {
  store: Store
  history: History
}

const App = ({ store, history }: IAppProps) => (
  <StylesProvider injectFirst>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
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
    </MuiThemeProvider>

  </StylesProvider>
)

export default App
