import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card/Card'
import Grid from '@material-ui/core/Grid'
import { Theme, WithStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import * as React from 'react'
import { Link } from 'react-router-dom'
import eventIcon from '../assets/event-date-icon.svg'
import IEvent from './IEvent'

const decorate = withStyles((theme: Theme) => ({
  actions: {
    display: 'flex'
  },
  card: {
    height: '150px',
    marginTop: '2em',
    marginLeft: '1em',
    marginRight: '1em',
    width: '200px',
    paddingLeft: '15px',
    paddingTop: '15px',
    '&:hover': {
      boxShadow: '0px 1px 1px black',
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  link: {
    textDecoration: 'none',
  },
  timeTitle: {
    color: '#979797',
    fontSize: '12px',
    lineHeight: '16px',
    marginBottom: '8px',
  },
  timeTitleBig: {
    fintSize: '16px',
    lineHeight: '24px',
    color: 'black',
    fontFamily: 'Roboto, sans-sarif',
  },
  eventName: {
    color: '#979797',
    fontSize: '12px',
    lineHeight: '16px',
    fontWight: 600,
  },
  eventDescription: {
    color: '#979797',
    fontSize: '12px',
    lineHeight: '16px',
    marginBottom: '4px'
  },
  avatar: {
    width: '30px',
    height: '30px',
    fontSize: '10px',
  },
  noAvatar: {
    fontSize: '37px',
    marginTop: '-3px'

  }
}))

interface IEventCardProps {
  event: IEvent,
}


class EventCard extends React.Component<IEventCardProps & WithStyles> {
  public render() {
    const {event, classes} = this.props

    const size = event.guests && (event.guests.length > 2 ? 3 : event.guests.length)

    return (
      <Card key={event.eventId} className={classes.card}>
        <Link to={'/events/' + event.eventId} className={classes.link}>
          <Typography className={classes.timeTitle}>
            <img src={eventIcon} alt="" className="eventCardIcon"/>
            {event.startDateTime ? event.startDateTime.format('LT') : ''}
          </Typography>
          <Typography className={classes.timeTitleBig}>
            {event.startDateTime ? event.startDateTime.format('dddd, MMMM Do') : ''}
          </Typography>
          <Typography className={classes.eventName}>
            {event.name && event.name}
          </Typography>

          <Typography noWrap={true} className={classes.eventDescription}>
            {event.location && event.location.address}
          </Typography>
          <Grid container={true} justify={'flex-start'}>
            {event.guests && event.guests.slice(0, size).map((guest, i) => (
              <React.Fragment key={i}>
                {!guest.user.image ? <AccountCircle className={classes.noAvatar} /> :
                  <Avatar src={guest.user.image} className={classes.avatar}/>}
              </React.Fragment>
            ))}
            <Avatar className={classes.avatar}>
              +{event.guests && (size === 3 ? event.guests.length - 3 : 0)}
            </Avatar>
          </Grid>
        </Link>
      </Card>
    )
  }
}

export default decorate(EventCard)
