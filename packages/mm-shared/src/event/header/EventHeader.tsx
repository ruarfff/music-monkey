import React from 'react'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import EditIcon from '@material-ui/icons/Edit'
import { Link } from 'react-router-dom'
import { isEmpty, take } from 'lodash'
import { Moment } from 'moment'
import { Action, Event, User, Rsvp } from './../../'
import Img from 'react-image'
import backgroundImage from 'assets/music-monkey.jpg'
import EventResponseMenu from './EventResponseMenu'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import { Typography, Avatar, Tooltip } from '@material-ui/core'
import './EventHeader.scss'

interface IEventHeaderProps {
  isHost?: boolean
  user: User
  event: Event
  deselectEvent(): Action
  updateRsvp(rsvp: Rsvp): Action
}

const EventHeader = ({
  isHost = false,
  user,
  event,
  deselectEvent,
  updateRsvp
}: IEventHeaderProps) => {
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
  console.log(times)
  return (
    <div className="EventHeader-container">
      <Img
        src={[event.imageUrl, backgroundImage]}
        alt="Event banner"
        className="EventHeader-background"
      />
      <div className="EventHeader-content">
        <div className="EventHeader-top-menu">
          <Link
            to="/"
            onClick={() => {
              deselectEvent()
            }}
          >
            <ChevronLeft className="EventHeader-back-arrow" />
          </Link>
          {isHost && (
            <Link to={`/events/${event.eventId}/edit`}>
              <EditIcon className="EventHeader-edit" />
            </Link>
          )}
        </div>

        <div>
          <Typography>Guests</Typography>
          {!isEmpty(event.guests) ? (
            <AvatarGroup>
              {take(event.guests, 3).map(guest => (
                <Avatar
                  key={guest.user.userId}
                  alt={guest.user.displayName || 'G'}
                  src={guest.user.image}
                />
              ))}
              {event.guests!.length > 3 && (
                <Tooltip title="Guests">
                  <Avatar>+{event.guests!.length}</Avatar>
                </Tooltip>
              )}
            </AvatarGroup>
          ) : (
            <Typography>No Guests Yet</Typography>
          )}
        </div>
        {!isHost && (
          <EventResponseMenu
            event={event}
            user={user}
            updateRsvp={updateRsvp}
          />
        )}
      </div>
    </div>
  )
}

export default EventHeader
