import {
  ClickAwayListener,
  IconButton,
  ListItemText,
  Menu,
  MenuItem
} from '@material-ui/core'
import EventIcon from '@material-ui/icons/Event'
import SearchIcon from '@material-ui/icons/Search'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import MenuIcon from '@material-ui/icons/Menu'
import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import useMenuActive from '../util/useMenuActive'
import { ProfileImage } from './ProfileImage'
import './SideMenu.scss'
import IUser from '../user/IUser'
import IEvent from '../event/IEvent'

interface ISideMenuProps extends RouteComponentProps<any> {
  user: IUser
  event: IEvent
}

const checkLocation = (pathname: string, path: string) => {
  return pathname === path ? 'active' : ''
}

const SideMenu = ({ user, location, event }: ISideMenuProps) => {
  const { pathname } = location
  const eventId = event && event.eventId ? event.eventId : null
  const eventsLink = eventId ? `/events/${eventId}` : '/'
  const playlistsLink = eventId ? `/playlists/${eventId}` : '/playlists'
  const requestsLink = eventId ? `/requests/${eventId}` : '/requests'
  const finderLink = eventId ? `/finder/${eventId}` : '/finder'
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
        <Link to={finderLink}>
          <MenuItem
            className={`SideMenu-item ${checkLocation(pathname, finderLink)}`}
          >
            <SearchIcon />
            <span>Finder</span>
          </MenuItem>
        </Link>
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

export default SideMenu
