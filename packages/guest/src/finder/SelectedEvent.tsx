import { ListItemText } from '@material-ui/core'
import IEvent from '../event/IEvent'
import IAction from '../IAction'
import './SelectedEvent.scss'
import React from 'react'

interface ISelectedEventProps {
  event: IEvent
  deselectEvent(): IAction
}

const SelectedEvent = ({ event, deselectEvent }: ISelectedEventProps) => {
  return (
    <div onClick={deselectEvent} className="SelectedEvent-block">
      <div className="SelectedEvent-image">
        <img alt="event" src={event.imageUrl} />
      </div>
      <div className="SelectedEvent-content">
        <ListItemText
          primary={event.name}
          secondary={event.organizer}
          classes={{ primary: 'Finder-event-title' }}
        />
      </div>
    </div>
  )
}

export default SelectedEvent
