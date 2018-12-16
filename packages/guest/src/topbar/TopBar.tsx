import { AppBar, Toolbar, Typography } from '@material-ui/core'
import * as React from 'react'
import { ReactCookieProps } from 'react-cookie'
import { RouteComponentProps } from 'react-router-dom'
import IAction from '../IAction'
import IUser from '../user/IUser'
import SideMenu from './SideMenu'
import './TopBar.scss'
import UserMenu from './UserMenu'

interface ITopBarProps extends RouteComponentProps<any>, ReactCookieProps {
  user: IUser
  logout(): IAction
}

const TopAppBar = ({ location, user, cookies, logout }: ITopBarProps) => {
  const { pathname } = location

  const handleLogout = () => {
    if (cookies) {
      cookies.remove('jwt')
    }
    logout()
  }

  return (
    <AppBar position="fixed" className="top-appBar">
      <Toolbar variant="dense">
        <SideMenu user={user} />
        <Typography variant="h6" className="top-appBar-title">
          {pathname === '/finder' && 'MUSIC FINDER'}
        </Typography>
        <UserMenu user={user} onLogout={handleLogout} />
      </Toolbar>
    </AppBar>
  )
}
export default TopAppBar
