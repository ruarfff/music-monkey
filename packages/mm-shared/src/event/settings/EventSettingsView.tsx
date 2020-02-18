import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { User } from 'user'
import { Event, EventTopMenu } from '../../event'
import EventSettings from './EventSettings'
import './EventSettingsView.scss'

interface EventSettingsViewProps extends RouteComponentProps<any> {
  isHost?: boolean
  user: User
  event: Event
}

const EventSettingsView = ({ isHost, event }: EventSettingsViewProps) => (
  <div className="EventSettingsView-root">
    <EventTopMenu isHost={isHost} event={event} />
    <div className="EventSettingsView-content">
      <EventSettings event={event} onChange={() => {}} />
    </div>
  </div>
)

export default withRouter(EventSettingsView)
