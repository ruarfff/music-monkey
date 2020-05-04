import React, { FC } from 'react'
import { Button, Divider, Icon, Typography } from '@material-ui/core'
import { isEmpty } from 'lodash'
import { Action, Event, ErrorNotification } from 'mm-shared'
import LoginInvite from './LoginInvite'
import logo from 'assets/logo-home.png'
import spotifyLoginButtonImage from 'assets/spotify-login.svg'

import './Login.scss'

const serviceUrl = process.env.REACT_APP_MM_API_URL
const authSuffix = process.env.REACT_APP_AUTH_SUFFIX

interface LoginProps {
  authError: any
  inviteEvent: Event
  clearAuthError(): Action
  loginAsGuest(): Action
}

const Login: FC<LoginProps> = ({
  authError,
  inviteEvent,
  clearAuthError,
  loginAsGuest
}) => {
  const spotifyLoginUrl = serviceUrl + '/auth/spotify-guest' + authSuffix

  return (
    <div className="Login-container">
      <div className="Login-block">
        <div className="Login-section">
          <img src={logo} alt="MusicMonkey" className="Login-logo" />
        </div>
        <div className="Login-section">
          {!isEmpty(inviteEvent) && <LoginInvite event={inviteEvent} />}
        </div>
        {isEmpty(inviteEvent) && <div className="Login-buttons-space" />}
        <div className="Login-section">
          <div className="Login-content">
            <a href={spotifyLoginUrl} className="text-decoration-none">
              <img
                src={spotifyLoginButtonImage}
                className="Login-spotify-button"
                alt="login"
              />
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
              className="Login-content-text"
              onClick={loginAsGuest}
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
            (authError.response && authError.response.data) || authError.message
          }
          onClose={clearAuthError}
        />
      )}
    </div>
  )
}

export default Login
