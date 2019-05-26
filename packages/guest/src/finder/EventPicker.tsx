import {
  Dialog,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'
import * as React from 'react'
import { Link } from 'react-router-dom'
import IEvent from '../event/IEvent'

import './EventPicker.scss'

interface IEventPickerProps {
  isFinder: boolean
  events: IEvent[]
}

interface IEventListProps {
  events: IEvent[]
  isFinder: boolean
}

const EventList = ({ isFinder, events }: IEventListProps) => (
  <List>
    {events.map((event, index) => (
      <Link
        to={`/${isFinder ? 'finder' : 'requests'}/${event.eventId}`}
        key={index}
      >
        <div className="EventPicker-item">
          <ListItem button={true}>
            <img
              alt={event.name}
              src={event.imageUrl || '/img/partycover-sm.png'}
              className="EventPicker-event-image"
            />

            <ListItemText
              primary={event.name}
              secondary={`${event.startDateTime.format(' Do MMMM, YYYY')}`}
            />
          </ListItem>
          <li>
            <Divider variant="inset" className="EventPicker-item-divider" />
          </li>
        </div>
      </Link>
    ))}
    <div className="EventPicker-stopper-block" />
  </List>
)

const EventPicker = ({ events, isFinder }: IEventPickerProps) => {
  return (
    <Dialog open={true}>
      <div className="EventPicker-modal">
        <DialogTitle className="EventPicker-modal-title">
          Select Event for Requests
        </DialogTitle>
        <div className="EventPicker-events">
          <EventList isFinder={isFinder} events={events} />
        </div>
      </div>
    </Dialog>
  )
}

export default EventPicker
