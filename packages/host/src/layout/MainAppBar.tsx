import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { RouteComponentProps, withRouter } from 'react-router'
import AppBar from '@material-ui/core/AppBar'
import { IconButton, Hidden } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar/Avatar'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AccountCircle from '@material-ui/icons/AccountCircle'
import IAction from 'IAction'
import eventIcon from 'assets/monkey_logo.png'
import IEvent from 'event/IEvent'
import IUser from 'user/IUser'
import './MainAppBar.scss'

interface IMainAppBarProps extends RouteComponentProps {
  user: IUser
  event: IEvent
  logout(): IAction
  handleTitleClicked(): void
  onNavMenuToggle(): void
}

const MainAppBar = ({
  user,
  location,
  handleTitleClicked,
  event,
  logout,
  onNavMenuToggle
}: IMainAppBarProps) => {
  const [anchorEl, setAnchorEl] = useState(undefined)

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(undefined)
  }

  const menuName = (history: string) => {
    switch (history) {
      case '/':
        return 'Dashboard'
      case '/create-event':
        return 'Create Event'
      case '/all-events':
        return 'Events'
      case '/upcoming-events':
        return 'Events'
      case '/past-events':
        return 'Events'
      case `/events/${event && event.eventId}`:
        return event.name
      case '/account':
        return 'Account Settings'
      case '/insights':
        return 'Insights'
      default:
        return 'Dashboard'
    }
  }

  const userHasProfileImage = !!user && !!user.image
  const userHasName = !!user && !!user.displayName
  const open = Boolean(anchorEl)

  const profilePic = (
    <div className="MainAppBar-profile">
      <IconButton
        aria-owns={open ? 'menu-appbar' : undefined}
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        {userHasProfileImage ? (
          <Avatar alt="user profile" src={user.image} />
        ) : (
          <AccountCircle />
        )}
      </IconButton>
      {userHasName ? (
        <Typography
          className="MainAppBar-user-name"
          onClick={handleTitleClicked}
        >
          {user.displayName}
        </Typography>
      ) : (
        <Typography
          className="MainAppBar-user-name"
          onClick={handleTitleClicked}
        >
          Name
        </Typography>
      )}
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }}
        open={open}
        onClose={handleClose}
      >
        <Link to={'/account'}>
          <MenuItem onClick={handleClose}>My Account</MenuItem>
        </Link>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
  )

  const mobileMenuToggle = () => (
    <IconButton
      color="inherit"
      aria-label="open drawer"
      edge="start"
      onClick={onNavMenuToggle}
    >
      <MenuIcon />
    </IconButton>
  )

  return (
    <AppBar position="fixed" className="MainAppBar-root">
      <Toolbar>
        <Hidden smUp implementation="css">
          {mobileMenuToggle}
        </Hidden>

        <Hidden xsDown implementation="css"></Hidden>
        <Typography
          variant="h6"
          color="inherit"
          className="MainAppBar-title"
          onClick={handleTitleClicked}
        >
          {menuName(location.pathname)}
        </Typography>
        {location.pathname !== '/create-event' && (
          <Button
            href="/create-event"
            variant="contained"
            size="small"
            color="secondary"
            className="MainAppBar-event-btn"
          >
            <img
              className="MainAppBar-event-icon"
              src={eventIcon}
              alt="event icon"
            />
            Create new event
          </Button>
        )}

        {profilePic}
      </Toolbar>
    </AppBar>
  )
}

export default withRouter(MainAppBar)
