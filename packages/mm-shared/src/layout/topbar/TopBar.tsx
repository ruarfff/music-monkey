import React from 'react'
import { AppBar, Toolbar } from '@material-ui/core'
import { ReactCookieProps } from 'react-cookie'
import { RouteComponentProps } from 'react-router-dom'
import { withRouter } from 'react-router'
import { User, Event } from '../../'
import SideMenu from './SideMenu'
import UserMenu from './UserMenu'
import Title from './Title'
import './TopBar.scss'

interface ITopBarProps extends RouteComponentProps<any>, ReactCookieProps {
  user: User
  event: Event
  logout(): void
}

const TopAppBar = ({ user, event, cookies, logout }: ITopBarProps) => {
  const handleLogout = () => {
    if (cookies) {
      cookies.remove('jwt')
    }
    logout()
  }

  return (
    <AppBar position="fixed" className="top-appBar">
      <Toolbar variant="dense">
        <SideMenu user={user} event={event} />
        <Title event={event} />
        <UserMenu user={user} onLogout={handleLogout} />
      </Toolbar>
    </AppBar>
  )
}
export default withRouter(TopAppBar)
