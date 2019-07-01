import {
  Avatar,
  Divider,
  ListItem,
  ListItemText,
  List,
  Typography
} from '@material-ui/core'
import * as React from 'react'
import IEvent from '../IEvent'
import './EventGuests.scss'

interface IEventGuestsProps {
  event: IEvent
}

const EventGuests = ({ event }: IEventGuestsProps) => {
  return (
    <List>
      {event.guests.map(({ user, rsvp }: any, index: number) => {
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
              {user.image && (
                <Avatar className="EventGuests-avatar" src={user.image} />
              )}
              {!user.image && (
                <Avatar className="EventGuests-avatar">{initials}</Avatar>
              )}

              <ListItemText
                primary={user.displayName || 'Guest'}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
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
