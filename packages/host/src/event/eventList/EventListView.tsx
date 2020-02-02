import React from 'react'
import AddIcon from '@material-ui/icons/Add'
import { Typography, Zoom, Fab, Hidden } from '@material-ui/core'
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
  const transitionDuration = {
    enter: 1000,
    exit: 1000
  }

  return (
    <div className="EventListView-root">
      <EventList
        pastEvents={pastEvents}
        upcomingEvents={upcomingEvents}
        liveEvents={liveEvents}
      />
      <Hidden lgUp>
        <div className="EventListView-action">
          <Zoom in={true} timeout={transitionDuration} unmountOnExit>
            <Link to="/create-event">
              <Fab aria-label="New Party" color="primary">
                <AddIcon />
              </Fab>
            </Link>
          </Zoom>
        </div>
      </Hidden>
    </div>
  )
}

export default EventListView
