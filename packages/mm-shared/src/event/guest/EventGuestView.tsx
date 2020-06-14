import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { User } from 'user'
import { Event, ShareEvent } from '../../event'
import EventGuests from './EventGuests'
import './EventGuestView.scss'

interface EventGuestViewProps extends RouteComponentProps<any> {
  isHost: boolean
  user: User
  event: Event
}

const EventGuestView = ({ isHost, event }: EventGuestViewProps) => (
  <div className="EventGuestView-root">
    <div className="EventGuestView-content">
      {isHost && <ShareEvent event={event} />}
      <EventGuests event={event} />
    </div>
  </div>
)

export default withRouter(EventGuestView)
