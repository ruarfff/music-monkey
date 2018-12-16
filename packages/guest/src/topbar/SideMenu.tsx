import {
  ClickAwayListener,
  Icon,
  IconButton,
  ListItemText,
  Menu,
  MenuItem
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import * as React from 'react'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import useMenuActive from '../util/useMenuActive'
import { ProfileImage } from './ProfileImage'
import './SideMenu.scss'

interface ISideMenuProps extends RouteComponentProps<any> {
  user: any
}

const SideMenu = ({ user, location }: ISideMenuProps) => {
  const { pathname } = location
  const [menuLink, handleMenuOpen, handleMenuClose] = useMenuActive()
  return (
    <span>
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

        <Link to={'/'}>
          <MenuItem
            className={`SideMenu-item ${
              pathname === '/' ? 'active' : ''
            }`}
          >
            <Icon>event</Icon>
            <span>Events</span>
          </MenuItem>
        </Link>
        <Link to={'/playlists'}>
          <MenuItem
            className={`SideMenu-item ${
              pathname === '/playlists' ? 'active' : ''
            }`}
          >
            <Icon>library_music</Icon>
            <span>Playlists</span>
          </MenuItem>
        </Link>
        <Link to={'/finder'}>
          <MenuItem
            className={`SideMenu-item ${
              pathname === '/finder' ? 'active' : ''
            }`}
          >
            <Icon>search</Icon>
            <span>Finder</span>
          </MenuItem>
        </Link>
        <Link to={'/requests'}>
          <MenuItem
            className={`SideMenu-item ${
              pathname === '/requests' ? 'active' : ''
            }`}
          >
            <Icon>favorite</Icon>
            <span>My Requests</span>
          </MenuItem>
        </Link>
        <Link to={'/account'}>
          <MenuItem
            className={`SideMenu-item ${
              pathname === '/account' ? 'active' : ''
            }`}
          >
            <Icon>account_circle</Icon>
            <span>Account</span>
          </MenuItem>
        </Link>
      </Menu>
    </span>
  )
}

export default withRouter(SideMenu)
