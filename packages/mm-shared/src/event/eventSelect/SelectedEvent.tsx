import React from 'react'
import { List, ListItemText, ListItem, ListItemIcon } from '@material-ui/core'
import { Event } from '../../'
import './SelectedEvent.scss'

interface ISelectedEventProps {
  event: Event
  onClick(): void
}

const SelectedEvent = ({ event, onClick }: ISelectedEventProps) => {
  return (
    <List>
      <ListItem
        className="SelectedEvent-block"
        onClick={onClick}
        button={true}
        alignItems="center"
      >
        <ListItemIcon className="SelectedEvent-image">
          <img alt="event" src={event.imageUrl} />
        </ListItemIcon>

        <ListItemText
          className="SelectedEvent-content"
          primary={event.name}
          secondary={event.organizer}
        />
      </ListItem>
    </List>
  )
}

export default SelectedEvent
