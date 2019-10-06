import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AccountCircle from '@material-ui/icons/AccountCircle'
import IUser from 'user/IUser'
import './UserMenu.scss'

interface IUserMenuProps {
  user: IUser
  logout(): void
}

const UserMenu = ({ user, logout }: IUserMenuProps) => {
  const [anchorEl, setAnchorEl] = useState(undefined)
  const menuOpen = Boolean(anchorEl)
  const userHasProfileImage = !!user && !!user.image
  const userHasName = !!user && !!user.displayName

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
      {userHasName && (
        <Typography className="UserMenu-name">{user.displayName}</Typography>
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
        open={menuOpen}
        onClose={handleClose}
      >
        <Link to={'/account'}>
          <MenuItem onClick={handleClose}>My Account</MenuItem>
        </Link>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
  )
}

export default UserMenu
