import React from 'react'
import {
  ClickAwayListener,
  IconButton,
  ListItemText,
  Menu,
  MenuItem
} from '@material-ui/core'
import EventIcon from '@material-ui/icons/Event'
import SearchIcon from '@material-ui/icons/Search'
import AddBoxIcon from '@material-ui/icons/AddBox'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import MenuIcon from '@material-ui/icons/Menu'
import { withRouter } from 'react-router'
import { Link, RouteComponentProps } from 'react-router-dom'
import { User, Event, useMenuActive } from '../../'
import { ProfileImage } from './ProfileImage'
import './SideMenu.scss'

interface ISideMenuProps extends RouteComponentProps<any> {
  user: User
  event: Event
  isHost: boolean
}

const checkLocation = (pathname: string, path: string) => {
  return pathname === path ? 'active' : ''
}

const SideMenu = ({ user, location, event, isHost }: ISideMenuProps) => {
  const { pathname } = location
  const eventId = event && event.eventId ? event.eventId : null
  const eventsLink = eventId ? `/events/${eventId}` : '/'
  const playlistsLink = eventId ? `/playlists/${eventId}` : '/playlists'
  const requestsLink = eventId ? `/requests/${eventId}` : '/requests'
  const finderLink = eventId ? `/finder/${eventId}` : '/finder'
  const createLink = '/create-event'
  const accountLink = '/account'
  const [menuLink, handleMenuOpen, handleMenuClose] = useMenuActive()
  return (
    <div>
      <ClickAwayListener onClickAway={handleMenuClose}>
        <IconButton color="inherit" aria-label="Menu" onClick={handleMenuOpen}>
          <MenuIcon />
        </IconButton>
      </ClickAwayListener>
      <Menu
        anchorEl={menuLink}
        open={Boolean(menuLink)}
        onClose={handleMenuClose}
        disableAutoFocusItem={true}
        className="SideMenu"
        classes={{ paper: 'SideMenu-paper' }}
      >
        <div className="SideMenu-user">
          <ProfileImage user={user} />
          <ListItemText
            className="playlist-content-title"
            primary={user && user.displayName}
            secondary={user && user.email}
          />
        </div>

        <Link to={eventsLink}>
          <MenuItem
            className={`SideMenu-item ${checkLocation(pathname, eventsLink)}`}
          >
            <EventIcon />
            <span>Events</span>
          </MenuItem>
        </Link>
        <Link to={playlistsLink}>
          <MenuItem
            className={`SideMenu-item ${checkLocation(
              pathname,
              playlistsLink
            )}`}
          >
            <LibraryMusicIcon />
            <span>Playlists</span>
          </MenuItem>
        </Link>
        {isHost ? (
          <Link to={createLink}>
            <MenuItem
              className={`SideMenu-item ${checkLocation(pathname, createLink)}`}
            >
              <AddBoxIcon />
              <span>Create Event</span>
            </MenuItem>
          </Link>
        ) : (
          <Link to={finderLink}>
            <MenuItem
              className={`SideMenu-item ${checkLocation(pathname, finderLink)}`}
            >
              <SearchIcon />
              <span>Finder</span>
            </MenuItem>
          </Link>
        )}
        <Link to={requestsLink}>
          <MenuItem
            className={`SideMenu-item ${checkLocation(pathname, requestsLink)}`}
          >
            <FavoriteIcon />
            <span>Requests</span>
          </MenuItem>
        </Link>
        <Link to={accountLink}>
          <MenuItem
            className={`SideMenu-item ${checkLocation(pathname, accountLink)}`}
          >
            <AccountCircleIcon />
            <span>Account</span>
          </MenuItem>
        </Link>
      </Menu>
    </div>
  )
}

export default withRouter(SideMenu)
