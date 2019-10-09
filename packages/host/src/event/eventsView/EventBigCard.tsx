import React from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import eventIcon from 'assets/event-icon-small.svg'
import locationIcon from 'assets/location-icon-small.svg'
import IEvent from '../IEvent'
import './EventBigCard.scss'

interface IEventBigCardProps {
  event: IEvent
}

const EventBigCard = ({ event }: IEventBigCardProps) => (
  <Card className="EventBigCard-root">
    <Link to={'/events/' + event.eventId}>
      <div className="EventBigCard-img-container">
        <img src={event.imageUrl} alt="event" />
      </div>
    </Link>
    <Grid
      container={true}
      direction="column"
      justify="space-between"
      className="EventBigCard-content"
    >
      <Typography className="EventBigCard-title">{event.name}</Typography>
      <div>
        <Typography className="EventBigCard-event-description">
          <img alt="event" src={eventIcon} />
          {event.startDateTime
            ? event.startDateTime.format('Do MMMM YYYY')
            : ''}
        </Typography>
        <Typography noWrap={true} className="EventBigCard-event-description">
          <img alt="location" src={locationIcon} />
          {event.location && event.location.address}
        </Typography>
      </div>
      <div>
        <Link to={'/events/' + event.eventId}>
          <Button color="secondary">GO TO EVENT</Button>
        </Link>
        <Link to={'/events/' + event.eventId + '/edit'}>
          <Button color="secondary">EDIT EVENT</Button>
        </Link>
      </div>
    </Grid>
  </Card>
)

export default EventBigCard
