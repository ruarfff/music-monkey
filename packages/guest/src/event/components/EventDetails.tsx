import { isEmpty } from 'lodash'
import { Moment } from 'moment'
import * as React from 'react'
import IAction from '../../IAction'
import IRsvp from '../../rsvp/IRsvp'
import { ProfileImage } from '../../topbar/ProfileImage'
import IUser from '../../user/IUser'
import IEvent from '../IEvent'
import './EventDetails.scss'

interface IEventDetailsProps {
  event: IEvent
  user: IUser
  updateRsvp(rsvp: IRsvp): IAction
}

class EventDetails extends React.PureComponent<IEventDetailsProps> {

  public render() {
    const { event, user } = this.props

    const times = this.dateFormat(event)
    return (
      <div className="EventDetails-root">
        <div className="EventDetails-container">
          <div>
            <div className="event-organiser-desc-container">
              <div className="event-description-container-column-desc">
                <span className='Event-description-title'>
                  Organizer
                </span><br/>
                <ProfileImage user={user}/>{event.organizer}
              </div>
            </div>
          </div>
        </div>
        {event.description &&
          <div className="event-description-container">
            <div className="Event-description-title">
              Description
            </div>
            <div className="event-description-container-column-desc">
              {event.description}
            </div>
          </div>
        }
        <div className="event-times-container">
          <div className="event-times-container-column">
            <div className="Event-description-title">
              Times
            </div>
            <div className="event-times-container-column-desc">
              {times}
            </div>
          </div>
        </div>
      </div>
    )
  }

  private getEndDateFormat = (startDate: Moment, endDate: Moment) => {
    const message = `${
      startDate.format('DD') === endDate.format('DD') ? 'h:mm a' : 'h:mm a, Do '
      }
     ${startDate.format('MMMM') === endDate.format('MMMM') ? '' : 'MMMM'}`
    return message
  }

  private dateFormat = (event: any) => {
    if (isEmpty(event)) {
      return null
    }
    const { startDateTime, endDateTime } = event
    return `${startDateTime.format('Do MMMM, h:mm a')} to ${endDateTime.format(
      this.getEndDateFormat(startDateTime, endDateTime)
    )}`
  }
}



export default EventDetails
