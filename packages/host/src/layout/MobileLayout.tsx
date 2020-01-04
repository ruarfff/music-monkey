import React from 'react'
import { BottomBar, Event } from 'mm-shared'
import Content from './ContentContainer'
import TopBar from './topbar/TopBarContainer'
import './MobileLayout.scss'

interface MobileLayoutProps {
  event: Event
}

const MobileLayout = ({ event }: MobileLayoutProps) => {
  return (
    <div className="MobileLayout-root">
      <TopBar />

      <main className="MobileLayout-content">
        <div className="MobileLayout-toolbar" />
        <Content />
      </main>

      <BottomBar event={event} />
    </div>
  )
}

export default MobileLayout
