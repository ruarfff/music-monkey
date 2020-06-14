import React from 'react'
import { AppBar, Toolbar } from '@material-ui/core'
import { ChevronLeft, Home } from '@material-ui/icons'
import { ReactCookieProps } from 'react-cookie'
import { useHistory, RouteComponentProps, Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { User, Event, LinkButton } from '../../'
import UserMenu from './UserMenu'
import Title from './Title'
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

  const atHome = history.location.pathname === '/'
  const inCreate = history.location.pathname.includes('create-event')

  return (
    <AppBar position="fixed" className="top-appBar">
      <Toolbar variant="dense">
        {history.length > 0 && !atHome && (
          <ChevronLeft
            onClick={() => {
              history.goBack()
            }}
          />
        )}

        <Title event={event} />
        {isHost && !inCreate && (
          <div className={atHome ? 'new-party-lft' : 'new-party'}>
            <LinkButton
              to="/create-event"
              variant="outlined"
              color="secondary"
              size="small"
            >
              Create Party
            </LinkButton>
          </div>
        )}
        {!atHome && (
          <div className="home">
            <Link to="/">
              <Home color="secondary" fontSize="large" />
            </Link>
          </div>
        )}
        <UserMenu user={user} onLogout={handleLogout} isHost={isHost} />
      </Toolbar>
    </AppBar>
  )
}
export default withRouter(TopAppBar)
