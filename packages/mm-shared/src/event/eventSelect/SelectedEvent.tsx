import React from 'react'
import { ListItemText } from '@material-ui/core'
import { Event } from '../../'
import './SelectedEvent.scss'

interface ISelectedEventProps {
  event: Event
  onClick(): void
}

const SelectedEvent = ({ event, onClick }: ISelectedEventProps) => {
  return (
    <div className="SelectedEvent-block" onClick={onClick}>
      <div className="SelectedEvent-image">
        <img alt="event" src={event.imageUrl} />
      </div>
      <div className="SelectedEvent-content">
        <ListItemText primary={event.name} secondary={event.organizer} />
      </div>
    </div>
  )
}

export default SelectedEvent
