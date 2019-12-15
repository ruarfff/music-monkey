import React from 'react'
import { Divider, List, ListItem, ListItemText } from '@material-ui/core'
import { Link } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import Image from 'components/Image'
import backgroundImage from 'assets/music-monkey.jpg'
import IEvent from 'event/IEvent'
import './EventList.scss'

interface IEventListProps {
  pastEvents: IEvent[]
  liveEvents: IEvent[]
  upcomingEvents: IEvent[]
}

const renderEvents = (events: IEvent[], status: string) => {
  if (isEmpty(events)) return null

  const getItemText = (event: IEvent, status: string) => {
    if (status === 'live') return 'Happening Now'
    if (status === 'upcoming')
      return `Starts at ${event.startDateTime.format(' Do MMMM, YYYY')}`

    return `Finished at ${event.endDateTime.format(' Do MMMM, YYYY')}`
  }

  return (
    <>
      {events.map((event, index) => (
        <div className="EventList-root" key={index + status}>
          <ListItem
            button={true}
            component={Link}
            to={'/events/' + event.eventId}
            className="EventList-item"
          >
            <Image
              src={event.imageUrl || backgroundImage}
              alt="Event icon"
              fallbackSrc={backgroundImage}
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
    </>
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
