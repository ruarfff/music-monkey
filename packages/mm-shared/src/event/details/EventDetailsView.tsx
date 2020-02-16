import React from 'react'
import { ChevronLeft } from '@material-ui/icons'
import { RouteComponentProps, withRouter } from 'react-router'
import { User } from 'user'
import { Event } from 'event'

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

const EventDetailsView = ({ history }: EventDetailsViewProps) => (
  <div>
    <div className="EventHeader-top-menu">
      <ChevronLeft
        className="EventHeader-back-arrow"
        onClick={() => {
          history.goBack()
        }}
      />
    </div>
    <h1>DETAILS</h1>
  </div>
)

export default withRouter(EventDetailsView)
