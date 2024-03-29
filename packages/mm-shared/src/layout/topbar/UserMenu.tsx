import React from 'react'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { User, useMenuActive } from 'mm-shared'
import { ProfileImage } from './ProfileImage'
import './UserMenu.scss'
import { Link } from 'react-router-dom'

interface IUserMenuProps {
  user: User
  isHost: boolean
  onLogout(): any
}

const UserMenu = ({ user, onLogout, isHost }: IUserMenuProps) => {
  const [menuLink, handleMenuOpen, handleMenuClose] = useMenuActive()
  const isOpen = Boolean(menuLink)
  return (
    <div className="UserMenu">
      <IconButton
        aria-owns={'menu-appbar'}
        aria-haspopup="true"
        onClick={handleMenuOpen}
        color="inherit"
      >
        <ProfileImage user={user} />
      </IconButton>
      <Menu
        anchorEl={menuLink}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }}
        open={isOpen}
        onClose={handleMenuClose}
      >
        {isHost ? (
          <a href="https://guests.musicmonkey.io/">
            <MenuItem>Guest Mode</MenuItem>
          </a>
        ) : (
          <a href="https://musicmonkey.io/">
            <MenuItem>Host Mode</MenuItem>
          </a>
        )}

        <Link to="/account">
          <MenuItem>My Account</MenuItem>
        </Link>
        <MenuItem onClick={onLogout}>Logout</MenuItem>
      </Menu>
    </div>
  )
}

export default UserMenu
