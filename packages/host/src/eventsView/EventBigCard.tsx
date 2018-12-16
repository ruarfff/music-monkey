import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card/Card'
import Grid from '@material-ui/core/Grid'
import { Theme, WithStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography/Typography'
import * as React from 'react'
import { Link } from 'react-router-dom'
import eventIcon from '../assets/event-icon-small.svg'
import locationIcon from '../assets/location-icon-small.svg'
import IEvent from '../event/IEvent'

const decorate = withStyles((theme: Theme) => ({
  card: {
    height: '390px',
    marginTop: '1em',
    marginLeft: '1em',
    marginRight: '1em',
    width: '300px'
  },
  title: {
    marginBottom: 24,
    fontSize: '20px',
    lineHeight: '23px'
  },
  link: {
    textDecoration: 'none'
  },
  eventDescription: {
    color: '#979797',
    fontSize: '12px',
    lineHeight: '16px',
    marginBottom: '4px',
    display: 'flex'
  },
  imgContainer: {
    width: '100%'
  },
  img: {
    width: 'inherit',
    height: '190px'
  },
  cardContent: {
    padding: '15px 25px',
    height: 'calc(100% - 194px)',
    display: 'flex',
    justifyContent: 'space-between'
  }
}))

interface IEventBigCardProps {
  event: IEvent
}

class EventBigCard extends React.Component<
  IEventBigCardProps & WithStyles
> {
  public render() {
    const { event, classes } = this.props
    return (
      <Card className={classes.card}>
        <Link to={'/events/' + event.eventId} className={classes.link}>
          <div className={classes.imgContainer}>
            <img className={classes.img} src={event.imageUrl} alt="" />
          </div>
        </Link>
        <Grid
          container={true}
          direction="column"
          justify="space-between"
          className={classes.cardContent}
        >
          <Typography className={classes.title}>{event.name}</Typography>
          <div>
            <Typography className={classes.eventDescription}>
              <img src={eventIcon} />
              {event.startDateTime
                ? event.startDateTime.format('Do MMMM YYYY')
                : ''}
            </Typography>
            <Typography noWrap={true} className={classes.eventDescription}>
              <img src={locationIcon} />
              {event.location && event.location.address}
            </Typography>
          </div>
          <div>
            <Link to={'/events/' + event.eventId} className={classes.link}>
              <Button color="secondary">GO TO EVENT</Button>
            </Link>
            <a
              href={event.playlist ? event.playlist.external_urls.spotify : '/'}
              target="_blank"
              className={classes.link}
            >
              <Button color="secondary">PLAYLIST</Button>
            </a>
          </div>
        </Grid>
      </Card>
    )
  }
}

export default decorate(EventBigCard)
