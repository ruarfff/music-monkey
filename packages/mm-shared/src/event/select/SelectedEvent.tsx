import React from 'react'
import { List, ListItemText, ListItem, ListItemIcon } from '@material-ui/core'
import { Event } from '../..'
import backgroundImage from 'assets/music-monkey.jpg'
import './SelectedEvent.scss'
import Img from 'react-image'

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
          <Img src={[event.imageUrl, backgroundImage]} alt="Event icon" />
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
