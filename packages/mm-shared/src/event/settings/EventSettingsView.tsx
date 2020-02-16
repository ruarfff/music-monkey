import React from 'react'
import { ChevronLeft } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { User } from 'user'
import { Action } from 'state'
import { Event } from 'event'

interface EventSettingsViewProps {
  isHost?: boolean
  user: User
  event: Event
  deselectEvent(): Action
}

const EventSettingsView = ({ deselectEvent }: EventSettingsViewProps) => (
  <div>
    <div className="EventHeader-top-menu">
      <Link
        to="/"
        onClick={() => {
          deselectEvent()
        }}
      >
        <ChevronLeft className="EventHeader-back-arrow" />
      </Link>
    </div>
    <h1>Settings</h1>
  </div>
)

export default EventSettingsView
