import {
  Dialog,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'
import * as React from 'react'
import IEvent from '../IEvent'
import './EventPicker.scss'
import IAction from '../../IAction'

interface IEventPickerProps {
  events: IEvent[]
  selectEvent(event: IEvent): IAction
}

const EventPicker = ({ events, selectEvent }: IEventPickerProps) => {
  return (
    <Dialog open={true}>
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
                  }}
                >
                  <img
                    alt={event.name}
                    src={event.imageUrl || '/img/partycover-sm.png'}
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
