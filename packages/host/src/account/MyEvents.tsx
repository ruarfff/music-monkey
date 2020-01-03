import React from 'react'
import { Event } from 'mm-shared'
import EventCard from 'catalogue/EventCard'

interface IMyEventsProps {
  events: Event[]
}

const MyEvents = ({ events }: IMyEventsProps) => (
  <>
    {events.map(event => (
      <EventCard key={event.eventId} event={event} />
    ))}
  </>
)

export default MyEvents
