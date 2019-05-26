import { Divider, List, ListItem, ListItemText } from '@material-ui/core'
import * as React from 'react'
import { Link } from 'react-router-dom'
import IEvent from '../IEvent'
import './EventList.scss'
import { isEmpty } from 'lodash'

interface IEventListProps {
  pastEvents: IEvent[]
  liveEvents: IEvent[]
  upcomingEvents: IEvent[]
}

const renderEvents = (events: IEvent[], status: string) => {
  const listLink = (to: string) => ({ innerRef, ...props }: any) => (
    <Link {...props} to={to} />
  )

  if (isEmpty(events)) return null

  return (
    <React.Fragment>
      {events.map((event, index) => (
        <div className="EventList-item" key={index + status}>
          <ListItem component={listLink('/events/' + event.eventId)}>
            <img
              alt={event.name}
              src={event.imageUrl || '/img/partycover-sm.png'}
              className="EventList-event-image"
            />
            {status === 'live' && (
              <ListItemText primary={event.name} secondary={'Happening Now'} />
            )}
            {status === 'upcoming' && (
              <ListItemText
                primary={event.name}
                secondary={`Starts at ${event.startDateTime.format(
                  ' Do MMMM, YYYY'
                )}`}
              />
            )}
            {status === 'past' && (
              <ListItemText
                primary={event.name}
                secondary={`Finished at ${event.endDateTime.format(
                  ' Do MMMM, YYYY'
                )}`}
              />
            )}
          </ListItem>
          <li>
            <Divider variant="inset" className="EventList-item-divider" />
          </li>
        </div>
      ))}
    </React.Fragment>
  )
}

export default ({
  pastEvents,
  upcomingEvents,
  liveEvents
}: IEventListProps) => (
  <List>
    {renderEvents(liveEvents, 'live')}
    {renderEvents(upcomingEvents, 'upcoming')}
    {renderEvents(pastEvents, 'past')}
  </List>
)
