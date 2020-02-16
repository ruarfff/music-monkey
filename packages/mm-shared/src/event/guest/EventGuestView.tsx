import React from 'react'
import { ChevronLeft } from '@material-ui/icons'
import { RouteComponentProps, withRouter } from 'react-router'
import { User } from 'user'
import { Event } from 'event'
import EventGuests from './EventGuests'

interface EventGuestViewProps extends RouteComponentProps<any> {
  isHost?: boolean
  user: User
  event: Event
}

const EventGuestView = ({ event, history }: EventGuestViewProps) => (
  <div>
    <div className="EventHeader-top-menu">
      <ChevronLeft
        className="EventHeader-back-arrow"
        onClick={() => {
          history.goBack()
        }}
      />
    </div>
    <EventGuests event={event} />
  </div>
)

export default withRouter(EventGuestView)
