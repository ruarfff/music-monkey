import React from 'react'
import { isEmpty } from 'lodash'
import { Event, sortEvents } from 'mm-shared'
import EventList from './EventList'
import './EventListView.scss'
import NoEvents from './NoEvents'

interface IEventListViewProps {
  events: Event[]
}

const EventListView = ({ events }: IEventListViewProps) => {
  if (isEmpty(events)) {
    return <NoEvents />
  }

  const { pastEvents, upcomingEvents, liveEvents } = sortEvents(events)

  return (
    <div className="EventListView-root">
      <EventList
        pastEvents={pastEvents}
        upcomingEvents={upcomingEvents}
        liveEvents={liveEvents}
      />
    </div>
  )
}

export default EventListView
