import React from 'react'
import { TopBar, BottomBar, Event, User } from 'mm-shared'
import Content from './ContentContainer'
import './MobileLayout.scss'

interface MobileLayoutProps {
  event: Event
  user: User
  logout(): void
}

const MobileLayout = ({ event, user, logout }: MobileLayoutProps) => {
  return (
    <div className="MobileLayout-root">
      <TopBar event={event} user={user} logout={logout} />

      <main className="MobileLayout-content">
        <div className="MobileLayout-toolbar" />
        <Content />
      </main>

      <BottomBar event={event} isHost={true} />
    </div>
  )
}

export default MobileLayout
