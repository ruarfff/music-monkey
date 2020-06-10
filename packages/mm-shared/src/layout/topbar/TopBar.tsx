import React from 'react'
import AddIcon from '@material-ui/icons/Add'
import { AppBar, Toolbar } from '@material-ui/core'
import { ReactCookieProps } from 'react-cookie'
import { useHistory, RouteComponentProps, Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { User, Event } from '../../'
import UserMenu from './UserMenu'
import Title from './Title'
import { ChevronLeft } from '@material-ui/icons'
import './TopBar.scss'

interface ITopBarProps extends RouteComponentProps<any>, ReactCookieProps {
  user: User
  event: Event
  isHost: boolean
  logout(): void
}

const TopAppBar = ({ user, event, cookies, isHost, logout }: ITopBarProps) => {
  const handleLogout = () => {
    if (cookies) {
      cookies.remove('jwt')
    }
    logout()
  }

  const history = useHistory()

  return (
    <AppBar position="fixed" className="top-appBar">
      <Toolbar variant="dense">
        {history.length > 0 && history.location.pathname !== '/' && (
          <ChevronLeft
            className="EventTopMenu-back-arrow"
            onClick={() => {
              history.goBack()
            }}
          />
        )}

        <Title event={event} />
        {isHost && (
          <div className="new-party">
            <Link to="/create-event">
              <AddIcon color="secondary" fontSize="large" />
            </Link>
          </div>
        )}
        <UserMenu user={user} onLogout={handleLogout} isHost={isHost} />
      </Toolbar>
    </AppBar>
  )
}
export default withRouter(TopAppBar)
