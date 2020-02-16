import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { User } from 'user'
import { Event, EventTopMenu } from '../../event'
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
      <h1>Settings</h1>
    </div>
  </div>
)

export default withRouter(EventSettingsView)
