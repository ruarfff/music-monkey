import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { User } from 'user'
import { Event } from '../../event'
import EventLocation from './EventLocation'
import './EventDetailsView.scss'

interface EventDetailsViewProps extends RouteComponentProps<any> {
  isHost: boolean
  user: User
  event: Event
  updateEvent?(event: Event): any
}

const EventDetailsView = ({
  isHost,
  event,
  updateEvent = () => {}
}: EventDetailsViewProps) => (
  <div className="EventDetailsView-root">
    <div className="EventDetailsView-content">
      <EventLocation isHost={isHost} event={event} updateEvent={updateEvent} />
    </div>
  </div>
)

export default withRouter(EventDetailsView)
