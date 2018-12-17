import {
  Dialog,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'
import * as React from 'react'
import IEvent from '../event/IEvent'

import './EventPicker.scss'

interface IEventPickerProps {
  events: IEvent[]
  onSelectEvent(event: IEvent): any
}

interface IEventListProps {
  events: IEvent[]
  onSelectEvent(event: IEvent): any
}

const EventList = ({ events, onSelectEvent }: IEventListProps) => (
  <List>
    {events.map((event, index) => (
      <div className="EventPicker-item" key={index}>
        <ListItem button={true} onClick={onSelectEvent(event)}>
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
          <Divider variant='inset' className="EventPicker-item-divider" />
        </li>
      </div>
    ))}
    <div className="EventPicker-stopper-block" />
  </List>
)

const EventPicker = ({ events, onSelectEvent }: IEventPickerProps) => {
  const handleEventSelected = (event: IEvent) => () => {
    onSelectEvent(event)
  }

  return (
    <Dialog open={true}>
      <div className="EventPicker-modal">
        <DialogTitle className="EventPicker-modal-title">
          Select Event for Requests
        </DialogTitle>
        <div className="EventPicker-events">
          <EventList events={events} onSelectEvent={handleEventSelected} />
        </div>
      </div>
    </Dialog>
  )
}

export default EventPicker
