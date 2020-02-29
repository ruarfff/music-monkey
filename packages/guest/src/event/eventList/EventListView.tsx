import React, { useEffect } from 'react'
import { isEmpty } from 'lodash'
import { Action, Event, MarvinLoader, sortEvents } from 'mm-shared'
import EventList from './EventList'
import NoEvents from './NoEvents'
import './EventListView.scss'

interface IEventListViewProps {
  event: Event
  events: Event[]
  eventsLoading: boolean
  deselectEvent(): Action
}

const EventListView = ({
  event,
  events,
  eventsLoading,
  deselectEvent
}: IEventListViewProps) => {
  useEffect(() => {
    if (!isEmpty(event)) {
      deselectEvent()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event])

  if (eventsLoading) {
    return <MarvinLoader />
  }

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
