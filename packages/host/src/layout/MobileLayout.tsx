import React from 'react'
import Content from './ContentContainer'
import TopBar from './topbar/TopBarContainer'
import BottomBar from './bottombar/BottomBarContainer'
import './MobileLayout.scss'

const MobileLayout = () => {
  return (
    <div className="MobileLayout-root">
      <TopBar />

      <main className="MobileLayout-content">
        <div className="MobileLayout-toolbar" />
        <Content />
      </main>

      <BottomBar />
    </div>
  )
}

export default MobileLayout
