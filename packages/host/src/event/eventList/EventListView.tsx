import React from 'react'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { Event, sortEvents } from 'mm-shared'
import EventList from './EventList'
import './EventListView.scss'

interface IEventListViewProps {
  events: Event[]
}

const EventListView = ({ events }: IEventListViewProps) => {
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
