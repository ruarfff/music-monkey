import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Typography,
  Toolbar,
  AppBar,
  IconButton,
  Divider,
  Drawer
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import logo from 'assets/logo-home.png'
import UserMenu from './UserMenuContainer'
import NavMenu from './NavMenu'
import Content from './Content'
import './MobileLayout.scss'

const MobileLayout = () => {
  const [navOpen, setNavOpen] = useState(false)
  const handleNavToggle = () => {
    setNavOpen(!navOpen)
  }

  return (
    <div className="MobileLayout-root">
      <AppBar position="fixed" className="MobileLayout-app-bar">
        <Toolbar>
          {!navOpen && (
            <IconButton
              className="MobileLayout-app-bar-menu-button"
              color="inherit"
              aria-label="open menu"
              edge="start"
              onClick={handleNavToggle}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h3"
            color="inherit"
            className="MobileLayout-title"
          ></Typography>
          <UserMenu />
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={navOpen}
        onClose={handleNavToggle}
        classes={{
          paper: 'MobileLayout-nav'
        }}
        ModalProps={{
          keepMounted: true
        }}
      >
        <div className="MobileLayout-nav-menu-header">
          <IconButton onClick={handleNavToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className="MobileLayout-nav-logo">
          <Link to={'/'}>
            <img src={logo} alt="" />
          </Link>
        </div>
        <Divider />
        <NavMenu />
      </Drawer>
      <main className="MobileLayout-content">
        <div className="MobileLayout-toolbar" />
        <Content />
      </main>
    </div>
  )
}

export default MobileLayout
