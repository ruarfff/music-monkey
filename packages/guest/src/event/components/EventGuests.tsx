import { Avatar, Divider, ListItem, ListItemText } from '@material-ui/core'
import * as React from 'react'
import IEvent from '../IEvent'
import './EventGuests.scss'

interface IEventGuestsProps {
  event: IEvent
}

const EventGuests = ({ event }: IEventGuestsProps) => {
  return (
    <div className="event-colendar-tab">
      <div className="event-img-info-title guests-title">
        {event.guests.length} Guests Invited
      </div>
      {event.guests.map((user: any, index: number) => {
        return (
          <div key={index}>
            <ListItem>
              <Avatar>
                <img className="img-cover" src={user.user.image || ''} />
              </Avatar>
              <ListItemText primary={user.user.displayName || 'guest'} />
              <ListItemText primary={user.rsvp.status} />
              {user.user.userId === event.userId && <ListItemText primary='Host'/>}
            </ListItem>
            <Divider variant='inset' />
          </div>
        )
      })}
    </div>
  )
}

export default EventGuests
