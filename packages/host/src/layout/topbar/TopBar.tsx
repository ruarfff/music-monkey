import React from 'react'
import { AppBar, Toolbar } from '@material-ui/core'
import { ReactCookieProps } from 'react-cookie'
import { RouteComponentProps } from 'react-router-dom'
import IAction from 'IAction'
import IUser from 'user/IUser'
import UserMenu from './UserMenu'
import Title from 'layout/TitleContainer'
import './TopBar.scss'

interface ITopBarProps extends RouteComponentProps<any>, ReactCookieProps {
  user: IUser
  logout(): IAction
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
        <Title />
        <UserMenu user={user} onLogout={handleLogout} />
      </Toolbar>
    </AppBar>
  )
}
export default TopAppBar
