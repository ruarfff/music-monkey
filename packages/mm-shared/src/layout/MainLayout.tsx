import React, { FunctionComponent } from 'react'
import { TopBar, BottomBar, Event, User } from '../'
import './MainLayout.scss'

interface MainLayoutProps {
  event: Event
  user: User
  isHost: boolean
  hasPartyNotification: boolean
  logout(): void
}

const MainLayout: FunctionComponent<MainLayoutProps> = ({
  event,
  user,
  logout,
  isHost,
  hasPartyNotification,
  children
}) => {
  return (
    <div className="MainLayout-root">
      <TopBar event={event} user={user} logout={logout} isHost={isHost} />

      <main className="MainLayout-body">
        <div className="MainLayout-toolbar" />
        {children}
      </main>

      <BottomBar event={event} hasPartyNotification={hasPartyNotification} />
    </div>
  )
}

export default MainLayout
