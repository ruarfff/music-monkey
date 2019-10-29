import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card/Card'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import * as React from 'react'
import { Link } from 'react-router-dom'
import eventIcon from 'assets/event-date-icon.svg'
import IEvent from 'event/IEvent'
import './SmallEventCard.scss'

interface ISmallEventCardProps {
  event: IEvent
}

const SmallEventCard = ({ event }: ISmallEventCardProps) => {
  const size =
    event.guests && (event.guests.length > 2 ? 3 : event.guests.length)

  return (
    <Card className="SmallEventCard-root">
      <Link to={'/events/' + event.eventId} className="SmallEventCard-link">
        <div className="SmallEventCard-image">
          <img src={event.imageUrl} alt={event.name} />
        </div>
        <div className="SmallEventCard-content-wrapper">
          <Typography className="SmallEventCard-time">
            <img src={eventIcon} alt="event time" />
            {event.startDateTime ? event.startDateTime.format('LT') : ''}
          </Typography>
          <Typography className="SmallEventCard-time-big">
            {event.startDateTime
              ? event.startDateTime.format('dddd, MMMM Do')
              : ''}
          </Typography>
          <Typography className="SmallEventCard-name">
            {event.name && event.name}
          </Typography>

          <Typography noWrap={true} className="SmallEventCard-description">
            {event.location && event.location.address}
          </Typography>
          <Grid container={true} justify={'flex-start'}>
            {event.guests &&
              event.guests
                .slice(0, size)
                .map((guest, i) => (
                  <React.Fragment key={i}>
                    {!guest.user.image ? (
                      <AccountCircle className="SmallEventCard-no-avatar" />
                    ) : (
                      <Avatar
                        src={guest.user.image}
                        className="SmallEventCard-avatar"
                      />
                    )}
                  </React.Fragment>
                ))}
            <Avatar className="SmallEventCard-avatar">
              +{event.guests && (size === 3 ? event.guests.length - 3 : 0)}
            </Avatar>
          </Grid>
        </div>
      </Link>
    </Card>
  )
}

export default SmallEventCard
