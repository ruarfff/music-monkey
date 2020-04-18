import React from 'react'
import { Typography, Avatar, Grid } from '@material-ui/core'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import RoomIcon from '@material-ui/icons/Room'
import { Link } from 'react-router-dom'
import { RouteComponentProps, withRouter } from 'react-router'
import { isEmpty } from 'lodash'
import Img from 'react-image'
import backgroundImage from 'assets/music-monkey.jpg'
import EventResponseMenu from './EventResponseMenu'
import { User, Rsvp } from './../../'
import { Event, EventTopMenu } from '../../event'
import twitchIcon from '../../assets/twitch.svg'
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
  return (
    <div className="EventHeader-container">
      <Img
        src={[event.imageUrl, backgroundImage]}
        alt="Event banner"
        className="EventHeader-background"
      />

      <EventTopMenu isHost={isHost} event={event} backTo="/" />

      <Grid container className="EventHeader-actions" spacing={2}>
        {/* Top Row */}
        <Grid item xs={3} alignItems="center" justify="center">
          <Link to={`/events/${event.eventId}/details`}>
            <AccessTimeIcon color="primary" fontSize="large" />
          </Link>
        </Grid>

        <Grid item xs={6}></Grid>

        <Grid item xs={3} alignItems="center" justify="center">
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
                      />
                    ))}
                  </AvatarGroup>
                </Grid>
              </Link>
            )}
          </Grid>
        </Grid>
        {/* End Top Row */}

        {/* Middle Row */}
        <Grid item xs={3} alignItems="center" justify="center">
          <Link to={`/events/${event.eventId}/details`}>
            <RoomIcon color="primary" fontSize="large" />
          </Link>
        </Grid>

        <Grid item xs={6}></Grid>

        <Grid item xs={3} alignItems="center" justify="center">
          {!isHost && (
            <EventResponseMenu
              event={event}
              user={user}
              updateRsvp={updateRsvp}
            />
          )}
        </Grid>
        {/* End Middle Row */}

        {/* Bottom Row */}
        <Grid item xs={3} alignItems="center" justify="center">
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

        <Grid item xs={3} alignItems="center" justify="center">
          {!!event.hostData && (
            <Avatar
              key={event.hostData.userId}
              alt={event.hostData.displayName || 'H'}
              src={event.hostData.image}
              className="EventHeader-host"
            />
          )}
        </Grid>
        {/* End Bottom Row */}
      </Grid>
    </div>
  )
}

export default withRouter(EventHeader)
