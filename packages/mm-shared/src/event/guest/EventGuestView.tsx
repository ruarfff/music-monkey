import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { User } from 'user'
import { Event, EventTopMenu, ShareEvent } from '../../event'
import EventGuests from './EventGuests'
import './EventGuestView.scss'

interface EventGuestViewProps extends RouteComponentProps<any> {
  isHost?: boolean
  user: User
  event: Event
}

const EventGuestView = ({ isHost, event }: EventGuestViewProps) => (
  <div className="EventGuestView-root">
    <EventTopMenu isHost={isHost} event={event} />
    <div className="EventGuestView-content">
      <ShareEvent event={event} />
      <EventGuests event={event} />
    </div>
  </div>
)

export default withRouter(EventGuestView)
