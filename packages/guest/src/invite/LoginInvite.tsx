import Icon from '@material-ui/core/Icon'
import * as React from 'react'
import IAuthState from '../auth/IAuthState'
import Login from '../auth/LoginContainer'
import IEvent from '../event/IEvent'
import IAction from '../IAction'
import Images from '../img/ImportImg'
import ErrorNotification from '../util/ErrorNotification'

import '../auth/Login.scss'
import './LoginInvite.scss'

interface ILoginInviteProps {
  auth: IAuthState
  inviteId: string
  event: IEvent
  clearAuthError(): IAction
  loginAsGuest(): IAction
}

class LoginInvite extends React.PureComponent<ILoginInviteProps> {
  public render() {
    const { event } = this.props
    const { authError } = this.props.auth

    const contentLoginInvite = (
      <div>
        <img src={Images.Image} />
        <span className="Login-content-text">
          {event.organizer} has invited you
        </span>
        <div className="Login-section">
          <div className="Login-content">
            <span className="Login-content-text title">
              {event.name} <br />
              {event.description}
            </span>
            <span className="Login-content-text default-icons location">
              <Icon>location_on</Icon>
              {event.location ? event.location.address : event.venue}
            </span>
            <span className="Login-content-text calendar">
              <Icon>event</Icon>
              {event.startDateTime}
            </span>
          </div>
        </div>
      </div>
    )

    return (
      <div>
        {contentLoginInvite}
        <Login />
        {authError &&
          authError.errorContext === 'guest-login' && (
            <ErrorNotification
              message={
                (authError.response && authError.response.data) ||
                authError.message
              }
              onClose={this.handleErrorAcknowledged}
            />
          )}
      </div>
    )
  }

  private handleErrorAcknowledged = () => {
    this.props.clearAuthError()
  }
}

export default LoginInvite
