import React from 'react'
import Typography from '@material-ui/core/Typography'
import { withRouter, RouteComponentProps } from 'react-router'
import IEvent from 'event/IEvent'
import './Title.scss'

const pathToTitle = {
  '/create-event': 'Create Event',
  '/all-events': 'Events',
  '/upcoming-events': 'Upcoming Event',
  '/past-events': 'Past Events',
  '/account': 'Account Settings',
  '/insights': 'Insights'
}

interface ITitleProps extends RouteComponentProps {
  event: IEvent
}

const Title = ({ location, event }: ITitleProps) => {
  const path = location.pathname
  let title = ''
  if (event && path === `/events/${event.eventId}`) {
    title = event.name
  } else {
    title = pathToTitle[path] || 'MusicMonkey'
  }
  return (
    <Typography variant="h3" color="inherit" className="Title">
      {title}
    </Typography>
  )
}

export default withRouter(Title)
