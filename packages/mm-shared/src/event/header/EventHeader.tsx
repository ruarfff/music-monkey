import React, { useState } from 'react'
import { Avatar, Grid } from '@material-ui/core'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import RoomIcon from '@material-ui/icons/Room'
import { grey } from '@material-ui/core/colors'
import ShareIcon from '@material-ui/icons/Share'
import { Link } from 'react-router-dom'
import { RouteComponentProps, withRouter } from 'react-router'
import { isEmpty } from 'lodash'
import Img from 'react-image'
import backgroundImage from 'assets/music-monkey.jpg'
import EventResponseMenu from './EventResponseMenu'
import { User, Rsvp, getInitials } from './../../'
import { Event, EventTopMenu } from '../../event'
import twitchIcon from '../../assets/twitch.svg'
import LocationDialog from './LocationDialog'
import DateTimeDialog from './DateTimeDialog'
import HostDialog from './HostDialog'
import './EventHeader.scss'

interface IEventHeaderProps extends RouteComponentProps<any> {
  isHost?: boolean
  user: User
  event: Event
  updateRsvp?(rsvp: Rsvp): any
}

const EventHeader = ({
  isHost = false,
  user,
  event,
  updateRsvp = () => {}
}: IEventHeaderProps) => {
  const [locationOpen, setLocationOpen] = useState(false)
  const [dateTimeOpen, setDateTimeOpen] = useState(false)
  const [hostOpen, setHostOpen] = useState(false)

  const handleLocationOpen = () => {
    setLocationOpen(true)
  }

  const handleLocationClose = () => {
    setLocationOpen(false)
  }

  const handleDateTimeOpen = () => {
    setDateTimeOpen(true)
  }

  const handleDateTimeClose = () => {
    setDateTimeOpen(false)
  }

  const handleHostOpen = () => {
    setHostOpen(true)
  }

  const handleHostClose = () => {
    setHostOpen(false)
  }

  return (
    <div className="EventHeader-container">
      <LocationDialog
        event={event}
        open={locationOpen}
        onClose={handleLocationClose}
      />
      <DateTimeDialog
        event={event}
        open={dateTimeOpen}
        onClose={handleDateTimeClose}
      />
      <HostDialog event={event} open={hostOpen} onClose={handleHostClose} />

      <Img
        src={[event.imageUrl, backgroundImage]}
        alt="Event banner"
        className="EventHeader-background"
      />

      <EventTopMenu isHost={isHost} event={event} backTo="/" />

      <Grid container className="EventHeader-actions" spacing={2}>
        {/* Top Row */}
        <Grid container item xs={3} alignItems="center" justify="center">
          <AccessTimeIcon
            style={{ color: grey[900] }}
            fontSize="large"
            onClick={handleDateTimeOpen}
          />
        </Grid>

        <Grid item xs={6}></Grid>

        <Grid container item xs={3} alignItems="center" justify="center">
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="flex-end"
            justify="flex-end"
          >
            {!isEmpty(event.guests) && (
              <Link to={`/events/${event.eventId}/guests`}>
                <Grid item xs={12}>
                  <AvatarGroup spacing={24} max={3}>
                    {event.guests!.map((guest) => (
                      <Avatar
                        key={guest.user.userId}
                        alt={guest.user.displayName || 'G'}
                        src={guest.user.image}
                      >
                        {!guest.user.image
                          ? getInitials(guest.user.displayName)
                          : null}
                      </Avatar>
                    ))}
                  </AvatarGroup>
                </Grid>
              </Link>
            )}
          </Grid>
        </Grid>
        {/* End Top Row */}

        {/* Middle Row */}
        <Grid container item xs={3} alignItems="center" justify="center">
          <RoomIcon
            style={{ color: grey[900] }}
            fontSize="large"
            onClick={handleLocationOpen}
          />
        </Grid>

        <Grid item xs={6}></Grid>

        <Grid
          container
          item
          xs={3}
          alignItems="center"
          justify="center"
          className="EventHeader-response-menu"
        >
          {!isHost && (
            <EventResponseMenu
              event={event}
              user={user}
              updateRsvp={updateRsvp}
            />
          )}
          {isHost && (
            <Link to={`/events/${event.eventId}/guests`}>
              <ShareIcon color="secondary" fontSize="large" />
            </Link>
          )}
        </Grid>
        {/* End Middle Row */}

        {/* Bottom Row */}
        <Grid container item xs={3} alignItems="center" justify="center">
          {event.hostData && event.hostData.twitchId && (
            <Link to={`/events/${event.eventId}/twitch`}>
              <img
                src={twitchIcon}
                alt=""
                width="24"
                height="24"
                className="twitch-icon"
              />
            </Link>
          )}
        </Grid>

        <Grid item xs={6}></Grid>

        <Grid container item xs={3} alignItems="center" justify="center">
          {!!event.hostData && (
            <Avatar
              key={event.hostData.userId}
              alt={event.hostData.displayName || 'H'}
              src={event.hostData.image}
              className="EventHeader-host"
              onClick={handleHostOpen}
            >
              {!event.hostData.image
                ? getInitials(event.hostData.displayName)
                : null}
            </Avatar>
          )}
        </Grid>
        {/* End Bottom Row */}
      </Grid>
    </div>
  )
}

export default withRouter(EventHeader)
