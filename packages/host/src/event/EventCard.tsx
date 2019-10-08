import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card/Card'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import * as React from 'react'
import { Link } from 'react-router-dom'
import eventIcon from 'assets/event-date-icon.svg'
import IEvent from './IEvent'
import './EventCard.scss'

interface IEventCardProps {
  event: IEvent
}

const EventCard = ({ event }: IEventCardProps) => {
  const size =
    event.guests && (event.guests.length > 2 ? 3 : event.guests.length)

  return (
    <Card className="EventCard-root">
      <Link to={'/events/' + event.eventId} className="EventCard-link">
        <div className="EventCard-image">
          <img src={event.imageUrl} alt={event.name} />
        </div>
        <div className="EventCard-content-wrapper">
          <Typography className="EventCard-time">
            <img src={eventIcon} alt="event time" />
            {event.startDateTime ? event.startDateTime.format('LT') : ''}
          </Typography>
          <Typography className="EventCard-time-big">
            {event.startDateTime
              ? event.startDateTime.format('dddd, MMMM Do')
              : ''}
          </Typography>
          <Typography className="EventCard-name">
            {event.name && event.name}
          </Typography>

          <Typography noWrap={true} className="EventCard-description">
            {event.location && event.location.address}
          </Typography>
          <Grid container={true} justify={'flex-start'}>
            {event.guests &&
              event.guests
                .slice(0, size)
                .map((guest, i) => (
                  <React.Fragment key={i}>
                    {!guest.user.image ? (
                      <AccountCircle className="EventCard-no-avatar" />
                    ) : (
                      <Avatar
                        src={guest.user.image}
                        className="EventCard-avatar"
                      />
                    )}
                  </React.Fragment>
                ))}
            <Avatar className="EventCard-avatar">
              +{event.guests && (size === 3 ? event.guests.length - 3 : 0)}
            </Avatar>
          </Grid>
        </div>
      </Link>
    </Card>
  )
}

export default EventCard
