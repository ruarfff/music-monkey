import React from 'react'
import Typography from '@material-ui/core/Typography'
import { withRouter, RouteComponentProps } from 'react-router'
import { Event } from '../../'
import './Title.scss'

const pathToTitle = {
  '/': 'Parties',
  '/music': 'Music',
  '/create-event': 'Create Party',
  '/create-event/playlist': 'Seed Playlist',
  '/create-event/tracks': 'Add Tracks',
  '/create-event/details': 'Event Settings',
  '/account': 'Account Settings',
  '/insights': 'Insights'
}

interface ITitleProps extends RouteComponentProps {
  event: Event
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
    <Typography variant="h3" color="inherit" className="Title" noWrap={true}>
      {title}
    </Typography>
  )
}

export default withRouter(Title)
