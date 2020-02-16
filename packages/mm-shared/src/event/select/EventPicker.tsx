import React from 'react'
import {
  Dialog,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'
import { Action, Event } from '../..'
import backgroundImage from 'assets/music-monkey.jpg'

import './EventPicker.scss'

interface IEventPickerProps {
  events: Event[]
  isOpen: boolean
  selectEvent(event: Event): Action
  getRequestsByEventId(eventId: string): Action
  onClose(): void
}

const EventPicker = ({
  events,
  isOpen,
  selectEvent,
  getRequestsByEventId,
  onClose
}: IEventPickerProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="EventPicker-modal">
        <DialogTitle className="EventPicker-modal-title">
          Select Event for Requests
        </DialogTitle>
        <div className="EventPicker-events">
          <List>
            {events.map((event, index) => (
              <div className="EventPicker-item" key={index}>
                <ListItem
                  button={true}
                  onClick={() => {
                    selectEvent(event)
                    getRequestsByEventId(event.eventId!)
                    onClose()
                  }}
                >
                  <img
                    alt={event.name}
                    src={event.imageUrl || backgroundImage}
                    className="EventPicker-event-image"
                  />

                  <ListItemText
                    primary={event.name}
                    secondary={`${event.startDateTime.format(
                      ' Do MMMM, YYYY'
                    )}`}
                  />
                </ListItem>
                <li>
                  <Divider
                    variant="inset"
                    className="EventPicker-item-divider"
                  />
                </li>
              </div>
            ))}
            <div className="EventPicker-stopper-block" />
          </List>
        </div>
      </div>
    </Dialog>
  )
}

export default EventPicker
