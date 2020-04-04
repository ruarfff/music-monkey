import React from 'react'
import { Typography, Avatar, Tooltip, Grid } from '@material-ui/core'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import RoomIcon from '@material-ui/icons/Room'
import { Link } from 'react-router-dom'
import { RouteComponentProps, withRouter } from 'react-router'
import { isEmpty, take } from 'lodash'
import Img from 'react-image'
import backgroundImage from 'assets/music-monkey.jpg'
import EventResponseMenu from './EventResponseMenu'
import { User, Rsvp } from './../../'
import { Event, EventTopMenu } from '../../event'
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

      <Grid container className="EventHeader-actions" spacing={0}>
        <Grid
          container
          item
          xs={4}
          className="EventHeader-details"
          direction="column"
        >
          <Grid item>
            <Link to={`/events/${event.eventId}/details`}>
              <AccessTimeIcon color="primary" fontSize="large" />
            </Link>
          </Grid>
          <Grid item>
            <Link to={`/events/${event.eventId}/details`}>
              <RoomIcon color="primary" fontSize="large" />
            </Link>
          </Grid>
        </Grid>

        <Grid item xs={4}></Grid>

        <Grid item xs={4} className="EventHeader-guests">
          <Link to={`/events/${event.eventId}/guests`}>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="flex-end"
              justify="flex-end"
            >
              <Grid item xs={12}>
                <Typography className="EventHeader-heading">Guests</Typography>
              </Grid>
              <Grid item xs={12}>
                {!isEmpty(event.guests) ? (
                  <AvatarGroup spacing="small" max={3}>
                    {event.guests.map((guest) => (
                      <Avatar
                        key={guest.user.userId}
                        alt={guest.user.displayName || 'G'}
                        src={guest.user.image}
                      />
                    ))}
                    {/* {event.guests!.length > 3 && (
                      <Tooltip title="Guests">
                        <Avatar>+{(event.guests!.length = 3)}</Avatar>
                      </Tooltip>
                    )} */}
                  </AvatarGroup>
                ) : (
                  <Typography className="EventHeader-heading">
                    No Guests Yet
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Link>
        </Grid>
      </Grid>

      {!isHost && (
        <div className="EventHeader-response-menu">
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={12}>
              <EventResponseMenu
                event={event}
                user={user}
                updateRsvp={updateRsvp}
              />
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  )
}

export default withRouter(EventHeader)
