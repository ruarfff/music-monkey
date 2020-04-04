import React, { FunctionComponent } from 'react'
import { Badge, Avatar } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { User } from 'user'

const SmallAvatar = withStyles((theme) => ({
  root: {
    width: 22,
    height: 22,
    border: `2px solid`,
    backgroundColor: '#af00ff'
  }
}))(Avatar)

interface WithBadgeProps {
  initials: string
  user: User
}

const WithBadge: FunctionComponent<WithBadgeProps> = ({
  children,
  user,
  initials
}) => (
  <Badge
    overlap="circle"
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    badgeContent={
      <SmallAvatar alt="User avatar" src={!!user ? user.image : ''}>
        {!user || !user.image ? initials : null}
      </SmallAvatar>
    }
  >
    {children}
  </Badge>
)

export default WithBadge
