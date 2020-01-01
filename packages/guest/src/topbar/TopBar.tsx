import { AppBar, Toolbar } from '@material-ui/core'
import * as React from 'react'
import { ReactCookieProps } from 'react-cookie'
import { RouteComponentProps } from 'react-router-dom'
import { Action } from 'mm-shared'
import IUser from '../user/IUser'
import SideMenu from './SideMenuContainer'
import './TopBar.scss'
import UserMenu from './UserMenu'

interface ITopBarProps extends RouteComponentProps<any>, ReactCookieProps {
  user: IUser
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
