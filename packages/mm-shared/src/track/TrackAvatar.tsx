import React, { FC } from 'react'
import { Avatar } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { User } from 'user'

const UserAvatar = withStyles((theme) => ({
  root: {
    border: `2px solid`,
    backgroundColor: '#ffb000'
  }
}))(Avatar)

interface TrackAvatarProps {
  user: User
  initials: string
}

const TrackAvatar: FC<TrackAvatarProps> = ({ user, initials }) => (
  <UserAvatar
    alt={!!user ? user.displayName : 'user avatar'}
    src={!!user ? user.image : ''}
  >
    {!user || !user.image ? initials : null}
  </UserAvatar>
)

export default TrackAvatar
