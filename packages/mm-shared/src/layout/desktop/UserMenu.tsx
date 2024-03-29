import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { User } from '../../'
import './UserMenu.scss'

interface IUserMenuProps {
  user: User
  logout(): void
}

const UserMenu = ({ user, logout }: IUserMenuProps) => {
  const [anchorEl, setAnchorEl] = useState(undefined)
  const menuOpen = Boolean(anchorEl)
  const userHasProfileImage = !!user && !!user.image

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(undefined)
  }

  return (
    <div className="UserMenu-root">
      <IconButton
        aria-owns={menuOpen ? 'menu-appbar' : undefined}
        aria-haspopup="true"
        color="inherit"
        onClick={handleMenu}
      >
        {userHasProfileImage ? (
          <Avatar alt="user profile" src={user.image} />
        ) : (
          <AccountCircle />
        )}
      </IconButton>

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
        open={menuOpen}
        onClose={handleClose}
      >
        <a href="https://guests.musicmonkey.io/">
          <MenuItem>Guest Mode</MenuItem>
        </a>
        <Link to={'/account'}>
          <MenuItem onClick={handleClose}>My Account</MenuItem>
        </Link>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
  )
}

export default UserMenu
