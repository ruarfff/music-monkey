import React from 'react'
import IEvent from 'event/IEvent'
import EventCard from 'catalogue/EventCard'

interface IMyEventsProps {
  events: IEvent[]
}

const MyEvents = ({ events }: IMyEventsProps) => (
  <>
    {events.map(event => (
      <EventCard key={event.eventId} event={event} />
    ))}
  </>
)

export default MyEvents
