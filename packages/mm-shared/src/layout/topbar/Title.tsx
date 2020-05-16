import React from 'react'
import Typography from '@material-ui/core/Typography'
import { withRouter, RouteComponentProps } from 'react-router'
import { Event } from '../../'
import './Title.scss'

const pathToTitle = {
  '/': 'Parties',
  '/requests': 'Requests',
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
  const mm = 'MusicMonkey'
  let title = pathToTitle[path] || mm
  if (event && title === mm) {
    if (path.startsWith('/requests/' + event.eventId)) {
      title = 'Requests'
    } else if (path.startsWith('/music/' + event.eventId)) {
      title = 'Music'
    } else if (path.startsWith('/insights/' + event.eventId)) {
      title = 'Insights'
    } else {
      title = event.name
    }
  }
  return (
    <Typography variant="h3" color="inherit" className="Title" noWrap={true}>
      {title}
    </Typography>
  )
}

export default withRouter(Title)
