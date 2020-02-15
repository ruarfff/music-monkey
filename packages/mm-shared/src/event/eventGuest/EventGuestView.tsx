import React from 'react'
import { ChevronLeft } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { User } from 'user'
import { Action } from 'state'
import { Rsvp } from 'rsvp'
import { Event } from 'event'

interface EventGuestViewProps {
  isHost?: boolean
  user: User
  event: Event
  deselectEvent(): Action
}

const EventGuestView = ({ deselectEvent }: EventGuestViewProps) => (
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
    <h1>Guests</h1>
  </div>
)

export default EventGuestView
