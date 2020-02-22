import React from 'react'
import {
  ClickAwayListener,
  IconButton,
  ListItemText,
  Menu,
  MenuItem
} from '@material-ui/core'
import ShowChartIcon from '@material-ui/icons/ShowChart'
import EventIcon from '@material-ui/icons/Event'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic'
import SearchIcon from '@material-ui/icons/Search'
import AddBoxIcon from '@material-ui/icons/AddBox'
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
  const requestsLink = eventId ? `/requests/${eventId}` : '/requests'
  const finderLink = eventId ? `/finder/${eventId}` : '/finder'
  const insightsLink = '/insights'
  const musicLink = '/music'
  const createLink = '/create-event'
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
        {isHost ? (
          <Link to={createLink}>
            <MenuItem
              className={`SideMenu-item ${checkLocation(pathname, createLink)}`}
            >
              <AddBoxIcon />
              <span>Create Party</span>
            </MenuItem>
          </Link>
        ) : (
          <Link to={finderLink}>
            <MenuItem
              className={`SideMenu-item ${checkLocation(pathname, finderLink)}`}
            >
              <SearchIcon />
              <span>Marvin</span>
            </MenuItem>
          </Link>
        )}
        <Link to={eventsLink}>
          <MenuItem
            className={`SideMenu-item ${checkLocation(pathname, eventsLink)}`}
          >
            <EventIcon />
            <span>Parties</span>
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
        <Link to={musicLink}>
          <MenuItem
            className={`SideMenu-item ${checkLocation(pathname, musicLink)}`}
          >
            <LibraryMusicIcon />
            <span>Music</span>
          </MenuItem>
        </Link>
        <Link to={insightsLink}>
          <MenuItem
            className={`SideMenu-item ${checkLocation(pathname, insightsLink)}`}
          >
            <ShowChartIcon />
            <span>Insights</span>
          </MenuItem>
        </Link>
      </Menu>
    </div>
  )
}

export default withRouter(SideMenu)
