import { IconButton, Menu, MenuItem } from '@material-ui/core'
import * as React from 'react'
import IUser from '../user/IUser'
import useMenuActive from '../util/useMenuActive'
import { ProfileImage } from './ProfileImage'
import './UserMenu.scss'

interface IUserMenuProps {
  user: IUser
  onLogout(): any
}

const UserMenu = ({ user, onLogout }: IUserMenuProps) => {
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
        <a href="https://hosts.musicmonkey.io/">
          <MenuItem>Host Mode</MenuItem>
        </a>
        <MenuItem onClick={onLogout}>Logout</MenuItem>
      </Menu>
    </div>
  )
}

export default UserMenu
