import React from 'react'
import { Avatar } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { User } from '../../'

interface IProfileImageProps {
  user: User
}

export const ProfileImage = ({ user }: IProfileImageProps) => {
  const userHasProfileImage = !!user && !!user.image
  return userHasProfileImage ? (
    <Avatar alt="user profile" src={user.image} className="profile-image" />
  ) : (
    <AccountCircle className="ProfileImage" />
  )
}
