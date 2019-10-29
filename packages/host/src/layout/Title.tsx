import React from 'react'
import Typography from '@material-ui/core/Typography'
import { withRouter, RouteComponentProps } from 'react-router'
import IEvent from 'event/IEvent'
import './Title.scss'

const pathToTitle = {
  '/create-event': 'Create Event',
  '/create-event/playlist': 'Seed Playlist',
  '/create-event/tracks': 'Add Tracks',
  '/create-event/details': 'Event Settings',
  '/catalogue/all-events': 'Events',
  '/catalogue/upcoming-events': 'Upcoming Event',
  '/catalogue/past-events': 'Past Events',
  '/catalogue/all-playlists': 'Playlists',
  '/catalogue/upcoming-playlists': 'Upcoming Playlists',
  '/catalogue/past-playlists': 'Past Playlists',
  '/account': 'Account Settings',
  '/insights': 'Insights'
}

interface ITitleProps extends RouteComponentProps {
  event: IEvent
}

const Title = ({ location, event }: ITitleProps) => {
  const path = location.pathname
  let title = ''
  if (event && path.startsWith('/events/' + event.eventId)) {
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
