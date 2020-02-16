import React from 'react'
import { ChevronLeft } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { User } from 'user'
import { Action } from 'state'
import { Event } from 'event'

interface EventDetailsViewProps {
  isHost?: boolean
  user: User
  event: Event
  deselectEvent(): Action
}

//   const getEndDateFormat = (startDate: Moment, endDate: Moment) => {
//     const message = `${
//       startDate.format('DD') === endDate.format('DD') ? 'h:mm a' : 'h:mm a, Do '
//     }
//      ${startDate.format('MMMM') === endDate.format('MMMM') ? '' : 'MMMM'}`
//     return message
//   }
//   const dateFormat = (event: any) => {
//     if (isEmpty(event)) {
//       return null
//     }
//     const { startDateTime, endDateTime } = event
//     return `${startDateTime.format('Do MMM, h:mm a')} to ${endDateTime.format(
//       getEndDateFormat(startDateTime, endDateTime)
//     )}`
//   }

//   const times = dateFormat(event)

const EventDetailsView = ({ deselectEvent }: EventDetailsViewProps) => (
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
    <h1>DETAILS</h1>
  </div>
)

export default EventDetailsView
