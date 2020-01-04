import React from 'react'
import { AppBar, Toolbar } from '@material-ui/core'
import { ReactCookieProps } from 'react-cookie'
import { RouteComponentProps } from 'react-router-dom'
import { Action, User } from 'mm-shared'
import SideMenu from './SideMenuContainer'
import UserMenu from './UserMenu'
import './TopBar.scss'

interface ITopBarProps extends RouteComponentProps<any>, ReactCookieProps {
  user: User
  logout(): Action
}

const TopAppBar = ({ user, cookies, logout }: ITopBarProps) => {
  const handleLogout = () => {
    if (cookies) {
      cookies.remove('jwt')
    }
    logout()
  }

  return (
    <AppBar position="fixed" className="top-appBar">
      <Toolbar variant="dense">
        <SideMenu />
        <UserMenu user={user} onLogout={handleLogout} />
      </Toolbar>
    </AppBar>
  )
}
export default TopAppBar