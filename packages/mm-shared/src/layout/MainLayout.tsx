import React, { FunctionComponent } from 'react'
import { TopBar, BottomBar, Event, User } from '../'
import './MainLayout.scss'

interface MainLayoutProps {
  event: Event
  user: User
  isHost: boolean
  logout(): void
}

const MainLayout: FunctionComponent<MainLayoutProps> = ({
  event,
  user,
  logout,
  isHost,
  children
}) => {
  return (
    <div className="MainLayout-root">
      <TopBar event={event} user={user} logout={logout} />

      <main className="MainLayout-body">
        <div className="MainLayout-toolbar" />
        {children}
      </main>

      <BottomBar event={event} isHost={isHost} />
    </div>
  )
}

export default MainLayout
