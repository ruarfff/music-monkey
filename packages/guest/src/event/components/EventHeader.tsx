import React from 'react'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import Icon from '@material-ui/core/Icon'
import { Link } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { Moment } from 'moment'
import { ProfileImage } from '../../topbar/ProfileImage'
import IAction from '../../IAction'
import IEvent from '../IEvent'
import EventResponseMenu from './EventResponseMenuContainer'
import './EventHeader.scss'

interface IEventHeaderProps {
  event: IEvent
  deselectEvent(): IAction
}

const EventHeader = ({ event, deselectEvent }: IEventHeaderProps) => {
  const getEndDateFormat = (startDate: Moment, endDate: Moment) => {
    const message = `${
      startDate.format('DD') === endDate.format('DD') ? 'h:mm a' : 'h:mm a, Do '
    }
     ${startDate.format('MMMM') === endDate.format('MMMM') ? '' : 'MMMM'}`
    return message
  }
  const dateFormat = (event: any) => {
    if (isEmpty(event)) {
      return null
    }
    const { startDateTime, endDateTime } = event
    return `${startDateTime.format('Do MMMM, h:mm a')} to ${endDateTime.format(
      getEndDateFormat(startDateTime, endDateTime)
    )}`
  }

  const times = dateFormat(event)

  return (
    <div className="EventHeader-container">
      <img className="Event-background" src={event.imageUrl} alt="" />
      <div className="Event-img">
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
        <div className="Event-img-info-block">
          <div className="Event-img-calendar">
            <div className="Event-img-calendar-month">
              {event.startDateTime.format('MMM')}
            </div>
            <div className="Event-img-calendar-number">
              {event.startDateTime.format('D')}
            </div>
          </div>
          <div className="Event-img-info">
            <div className="Event-img-info-title">{event.name}</div>
            <div className="Event-img-info-location">{event.description}</div>
            <div className="Event-img-info-location">
              <Icon>location_on</Icon>
              {event.location.address}
            </div>
          </div>
        </div>
        <div className="Event-img-secondRow">
          <div className="Event-img-organizer-wrapper">
            <span>Organizer</span>
            <div>
              <ProfileImage user={event.hostData} />
              <span>{event.organizer}</span>
            </div>
          </div>
          <EventResponseMenu />
          <div className="EventHeader-times-container">
            <div>
              <div className="EventHeader-times-heading">Times</div>
              <div className="EventHeader-times-text">{times}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventHeader
