import React from 'react'
import { Button, Divider, Icon, Typography } from '@material-ui/core'
import { isEmpty } from 'lodash'
import { Action, Event } from 'mm-shared'
import Images from 'img/ImportImg'
import ErrorNotification from 'util/ErrorNotification'

import './Login.scss'

const serviceUrl = process.env.REACT_APP_MM_API_URL
const authSuffix = process.env.REACT_APP_AUTH_SUFFIX

interface ILoginProps {
  authError: any
  inviteEvent: Event
  clearAuthError(): Action
  login(): Action
  loginAsGuest(): Action
  loginWithPassword(email: string, password: string): Action
}

class Login extends React.PureComponent<ILoginProps> {
public componentDidMount() {
    this.props.login()
  }
  public render() {
    const { authError, inviteEvent } = this.props
    let spotifyLoginUrl
    let facebookLoginUrl

    spotifyLoginUrl = serviceUrl + '/auth/spotify-guest' + authSuffix
    facebookLoginUrl = serviceUrl + '/auth/facebook-guest' + authSuffix

    const eventDetails = !isEmpty(inviteEvent) ? (
      <div className="Login-section">
        <Typography variant="h6">
          You have been invited to {inviteEvent.name} by {inviteEvent.organizer}
        </Typography>
      </div>
    ) : null
    return (
      <div>
        <div className="Login-container">
          <div className="Login-block">
            <div className="Login-section">
              <Typography variant="h3">Login</Typography>
            </div>
            {eventDetails}
            <div className="Login-section">
              <div className="Login-content">
                <a href={facebookLoginUrl} className="text-decoration-none">
                  <Button
                    color="default"
                    className="Login-content-text facebook"
                  >
                    <img alt="facebook login" src={Images.Facebook} />
                    SIGN IN WITH FACEBOOK
                  </Button>
                </a>
                <a href={spotifyLoginUrl} className="text-decoration-none">
                  <Button color="default" className="Login-content-text email">
                    <img
                      alt="spotify login"
                      className="spotify-img"
                      src={Images.Spotify}
                    />
                    SIGN IN WITH SPOTIFY
                  </Button>
                </a>
              </div>
            </div>
            <div className="Login-section">
              <Divider className="Login-divider" />
              <Typography variant="subtitle1">OR</Typography>
            </div>
            <div className="Login-section">
              <div className="Login-content">
                <Button
                  color="default"
                  className="Login-content-text account"
                  onClick={this.handleLoginAsGuestSelected}
                >
                  <Icon>account_circle</Icon>
                  CONTINUE AS GUEST
                </Button>
              </div>
            </div>
          </div>
          {authError && authError.errorContext === 'guest-login' && (
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
    )
  }

  private handleLoginAsGuestSelected = () => {
    this.props.loginAsGuest()
  }

  private handleErrorAcknowledged = () => {
    this.props.clearAuthError()
  }
}

export default Login
