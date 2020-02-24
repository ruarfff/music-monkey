import React from 'react'
import { User } from 'user'
import { Event, EventTopMenu } from '../../event'
import EventSettings from './EventSettings'
import './EventSettingsView.scss'

interface EventSettingsViewProps {
  isHost: boolean
  user: User
  event: Event
  updateEvent?(event: Event): any
}

const EventSettingsView = ({
  isHost,
  event,
  updateEvent = () => {}
}: EventSettingsViewProps) => (
  <div className="EventSettingsView-root">
    <EventTopMenu isHost={isHost} event={event} />
    <div className="EventSettingsView-content">
      <EventSettings
        event={event}
        onChange={settings => {
          updateEvent({ ...event, settings })
        }}
        isHost={isHost}
      />
    </div>
  </div>
)

export default EventSettingsView
