import React, { useState, FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Toolbar, AppBar, IconButton, Divider, Drawer } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import logo from '../../assets/logo-home.svg'
import UserMenu from './UserMenu'
import NavMenu from './NavMenu'
import CreateEventMenuButton from './CreateEventMenuButton'
import { User, Event } from '../..'
import './DesktopLayout.scss'

interface DesktopLayoutProps {
  event: Event
  user: User
  isHost: boolean
  logout(): void
}

const DesktopLayout: FunctionComponent<DesktopLayoutProps> = ({
  children,
  user,
  isHost,
  logout
}) => {
  const [navOpen, setNavOpen] = useState(true)
  const handleNavToggle = () => {
    setNavOpen(!navOpen)
  }

  return (
    <div className="DesktopLayout-root">
      <AppBar position="fixed" className="DesktopLayout-app-bar">
        <Toolbar
          className={`${navOpen ? 'DesktopLayout-app-bar-shifted' : ''}`}
        >
          {!navOpen && (
            <IconButton
              className="DesktopLayout-app-bar-menu-button"
              color="inherit"
              aria-label="open menu"
              edge="start"
              onClick={handleNavToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
          <CreateEventMenuButton />
          <UserMenu user={user} logout={logout} />
        </Toolbar>
      </AppBar>

      <Drawer
        className="DesktopLayout-nav"
        classes={{
          paper: 'DesktopLayout-nav-drawer-paper'
        }}
        variant="persistent"
        anchor="left"
        open={navOpen}
      >
        <div className="DesktopLayout-nav-menu-header">
          <IconButton onClick={handleNavToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className="DesktopLayout-nav-logo">
          <Link to={'/'}>
            <img src={logo} alt="" />
          </Link>
        </div>
        <Divider />
        <NavMenu />
      </Drawer>
      <main
        className={`DesktopLayout-content ${
          navOpen ? 'DesktopLayout-content-shifted' : ''
        }`}
      >
        <div className="DesktopLayout-toolbar" />
        {children}
      </main>
    </div>
  )
}

export default DesktopLayout
