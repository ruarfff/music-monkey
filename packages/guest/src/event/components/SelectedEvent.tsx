import { ListItemText } from '@material-ui/core'
import IEvent from '../IEvent'
import { Action } from 'mm-shared'
import './SelectedEvent.scss'
import React from 'react'

interface ISelectedEventProps {
  event: IEvent
  deselectEvent(): Action
}

const SelectedEvent = ({ event, deselectEvent }: ISelectedEventProps) => {
  return (
    <div onClick={deselectEvent} className="SelectedEvent-block">
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
