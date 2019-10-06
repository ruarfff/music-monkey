import React, { useState } from 'react'
import { Link, LinkProps } from 'react-router-dom'
import { Route } from 'react-router'
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
import Button from '@material-ui/core/Button'
//import { RouteWithSubRoutes } from 'routes'
//import Events from 'event/EventsContainer'
import eventIcon from 'assets/monkey_logo.png'
import logo from 'assets/logo-home.png'
import UserMenu from './UserMenuContainer'
import NavMenu from './NavMenu'
import './DesktopLayout.scss'

interface IDesktopLayoutProps {
  routes: Route[]
}

const DesktopLayout = ({ routes }: IDesktopLayoutProps) => {
  const [navOpen, setNavOpen] = useState(true)
  const handleNavToggle = () => {
    setNavOpen(!navOpen)
  }

  const ButtonLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
    (props, ref) => <Link innerRef={ref} {...props} />
  )

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

          <Typography
            variant="h3"
            color="inherit"
            className="DesktopLayout-title"
          >
            Test
          </Typography>

          <Button
            component={ButtonLink}
            to="/create-event"
            variant="contained"
            size="small"
            color="secondary"
            className="DesktopLayout-event-btn"
          >
            <img
              className="DesktopLayout-event-icon"
              src={eventIcon}
              alt="event icon"
            />
            Create new event
          </Button>

          <UserMenu />
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
      <main className="DesktopLayout-content DesktopLayout-content-shifted">
        {/* <Route exact={true} path="/" component={Events} />
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))} */}
      </main>
    </div>
  )
}

export default DesktopLayout
