import React from 'react'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import { Typography, Avatar, Tooltip, Grid } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import { Link } from 'react-router-dom'
import { isEmpty, take } from 'lodash'
import Img from 'react-image'
import backgroundImage from 'assets/music-monkey.jpg'
import EventResponseMenu from './EventResponseMenu'
import { Action, Event, User, Rsvp } from './../../'
import './EventHeader.scss'

interface IEventHeaderProps {
  isHost?: boolean
  user: User
  event: Event
  deselectEvent(): Action
  updateRsvp?(rsvp: Rsvp): any
}

const EventHeader = ({
  isHost = false,
  user,
  event,
  deselectEvent,
  updateRsvp = () => {}
}: IEventHeaderProps) => {
  return (
    <div className="EventHeader-container">
      <Img
        src={[event.imageUrl, backgroundImage]}
        alt="Event banner"
        className="EventHeader-background"
      />

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

      <Grid container className="EventHeader-actions">
        <Grid item xs={4} className="EventHeader-details">
          <Link to={`/events/${event.eventId}/details`}>
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              className="EventHeader-heading"
            >{`${event.startDateTime.format('Do MMM, h:mm a')}`}</Typography>

            <Typography>{event.location.address}</Typography>
          </Link>
        </Grid>

        <Grid item xs={4} className="EventHeader-guests">
          <Link to={`/events/${event.eventId}/guests`}>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Grid item xs={12}>
                <Typography className="EventHeader-heading">Guests</Typography>
              </Grid>
              <Grid item xs={12}>
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
                  <Typography className="EventHeader-heading">
                    No Guests Yet
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Link>
        </Grid>

        <Grid item xs={4} className="EventHeader-settings">
          <Link to={`/events/${event.eventId}/settings`}>
            <Typography className="EventHeader-heading">Modes</Typography>
            <ul>
              <li>
                {event.settings.autoAcceptSuggestionsEnabled
                  ? 'Auto Accept On'
                  : 'Auto Accept Off'}
              </li>
              <li>
                {event.settings.dynamicVotingEnabled
                  ? 'Dynamic Voting On'
                  : 'Dynamic Voting Off'}
              </li>
              <li>
                {event.settings.suggestingPlaylistsEnabled
                  ? 'Request Playlists On'
                  : 'Request Playlists Off'}
              </li>
            </ul>
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

export default EventHeader
