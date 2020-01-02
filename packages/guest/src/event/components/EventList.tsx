import React from 'react'
import { Divider, List, ListItem, ListItemText } from '@material-ui/core'
import { Link } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import { Event } from 'mm-shared'
import './EventList.scss'

interface IEventListProps {
  pastEvents: Event[]
  liveEvents: Event[]
  upcomingEvents: Event[]
}

const renderEvents = (events: Event[], status: string) => {
  if (isEmpty(events)) return null

  const getItemText = (event: Event, status: string) => {
    if (status === 'live') return 'Happening Now'
    if (status === 'upcoming')
      return `Starts at ${event.startDateTime.format(' Do MMMM, YYYY')}`

    return `Finished at ${event.endDateTime.format(' Do MMMM, YYYY')}`
  }

  return (
    <React.Fragment>
      {events.map((event, index) => (
        <div className="EventList-root" key={index + status}>
          <ListItem
            button={true}
            component={Link}
            to={'/events/' + event.eventId}
            className="EventList-item"
          >
            <img
              alt={event.name}
              src={event.imageUrl || '/img/music-monkey.jpg'}
              className="EventList-event-image"
            />

            <ListItemText
              primary={event.name}
              secondary={getItemText(event, status)}
              className="EventList-text"
            />
          </ListItem>
          <li>
            <Divider variant="inset" className="EventList-item-divider" />
          </li>
        </div>
      ))}
    </React.Fragment>
  )
}

const EventList = ({
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

export default EventList
