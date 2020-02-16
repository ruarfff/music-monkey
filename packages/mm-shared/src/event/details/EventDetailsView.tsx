import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { User } from 'user'
import { Event, EventTopMenu } from '../../event'
import './EventDetailsView.scss'

interface EventDetailsViewProps extends RouteComponentProps<any> {
  isHost?: boolean
  user: User
  event: Event
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

const EventDetailsView = ({ isHost, event }: EventDetailsViewProps) => (
  <div className="EventDetailsView-root">
    <EventTopMenu isHost={isHost} event={event} />
    <div className="EventDetailsView-content">
      <h1>DETAILS</h1>
    </div>
  </div>
)

export default withRouter(EventDetailsView)
