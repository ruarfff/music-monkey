import * as React from 'react'
import logo from 'assets/logo-home.png'
import IAction from 'IAction'
import LoadingSpinner from 'loading/LoadingSpinner'
import ErrorNotification from 'util/ErrorNotification'
import IAuthState from './IAuthState'
import './Login.scss'
import spotifyLoginButtonImage from './spotify-login.svg'

const serviceUrl = process.env.REACT_APP_MM_API_URL
const authSuffix = process.env.REACT_APP_AUTH_SUFFIX

interface ILoginProps {
  auth: IAuthState
  clearAuthError(): IAction
  login(): IAction
}

class Login extends React.Component<ILoginProps, {}> {
  public componentDidMount() {
    this.props.login()
  }

  public render() {
    const { isAuthenticating, authError } = this.props.auth
    if (isAuthenticating) {
      return <LoadingSpinner />
    }

    const spotifyLoginUrl = serviceUrl + '/auth/spotify-host' + authSuffix

    return (
      <div className="Login-background">
        <div className="Login-overlay">
          <div className="Login">
            <div className="Login-logo-section">
              <img className="Login-logo" src={logo} alt="logo" />
            </div>
            <div className="Login-text-section">
              <h1 className="Login-title">Playlist for Everyone</h1>
              <h2 className="Login-subtitle">
                Get started today, login or sign
                <br />
                up with your spotify account.
              </h2>
            </div>
            <div className="Login-content">
              <div>
                <a href={spotifyLoginUrl}>
                  <img
                    src={spotifyLoginButtonImage}
                    className="Login-spotify-button"
                    alt="login"
                  />
                </a>
              </div>

              {authError && authError.errorContext === 'host-login' && (
                <ErrorNotification
                  message={
                    (authError.response && authError.response.data) ||
                    authError.message
                  }
                  onClose={this.handleErrorAcknowledged}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
  private handleErrorAcknowledged = () => {
    this.props.clearAuthError()
  }
}

export default Login
