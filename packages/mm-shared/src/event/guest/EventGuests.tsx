import React from 'react'
import {
  Avatar,
  Divider,
  ListItem,
  ListItemText,
  List,
  Typography,
  ListItemAvatar
} from '@material-ui/core'
import { Event } from 'mm-shared'
import './EventGuests.scss'

interface IEventGuestsProps {
  event: Event
}

const EventGuests = ({ event }: IEventGuestsProps) => {
  return (
    <List>
      {event.guests!.map(({ user, rsvp }: any, index: number) => {
        let initials: any = 'G'

        if (user && user.displayName) {
          initials = user.displayName.match(/\b\w/g) || []
          initials = (
            (initials.shift() || '') + (initials.pop() || '')
          ).toUpperCase()
        }

        return (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemAvatar>
                {user.image && (
                  <Avatar className="EventGuests-avatar" src={user.image} />
                )}
                {!user.image && (
                  <Avatar className="EventGuests-avatar">{initials}</Avatar>
                )}
              </ListItemAvatar>

              <ListItemText
                primary={user.displayName || 'Guest'}
                secondary={
                  <React.Fragment>
                    <Typography
                      variant="body2"
                      className="EventGuests-inline"
                      color="textPrimary"
                    >
                      {rsvp.status}
                    </Typography>
                    {user.userId === event.userId && ' — Host'}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" />
          </React.Fragment>
        )
      })}
    </List>
  )
}

export default EventGuests
