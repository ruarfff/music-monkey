import React, { useEffect } from 'react'
import { Typography } from '@material-ui/core'
import { isEmpty } from 'lodash'
import IAction from 'IAction'
import LoadingSpinner from 'loading/LoadingSpinner'
import IEvent from './IEvent'
import EventList from './EventList'
import sortEvents from './sortEvents'
import { Link } from 'react-router-dom'

interface IEventListViewProps {
  events: IEvent[]
  eventsLoading: boolean
  getEvents(): IAction
}

const EventListView = ({
  events,
  eventsLoading,
  getEvents
}: IEventListViewProps) => {
  useEffect(() => {
    if (isEmpty(events) && !eventsLoading) {
      getEvents()
    }
  })
  if (eventsLoading) {
    return <LoadingSpinner />
  }

  if (isEmpty(events)) {
    return (
      <div>
        <Typography align={'center'} variant={'h6'}>
          It looks like you don't have any events yet :({' '}
          <Link to="/create-event">Create one?</Link>
        </Typography>
      </div>
    )
  }

  const { pastEvents, upcomingEvents, liveEvents } = sortEvents(events)

  return (
    <EventList
      pastEvents={pastEvents}
      upcomingEvents={upcomingEvents}
      liveEvents={liveEvents}
    />
  )
}

export default EventListView
