import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card/Card'
import Grid from '@material-ui/core/Grid'
import { Theme, WithStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import * as React from 'react'
import { Link } from 'react-router-dom'
import eventIcon from 'assets/event-date-icon.svg'
import IEvent from './IEvent'

const decorate = withStyles((theme: Theme) => ({
  card: {
    height: '230px',
    marginLeft: '1em',
    marginRight: '1em',
    width: '210px',
    '&:hover': {
      boxShadow: '0px 1px 1px black'
    }
  },
  link: {
    textDecoration: 'none'
  },
  timeTitle: {
    color: '#979797',
    fontSize: '12px',
    lineHeight: '16px',
    marginTop: '2px',
    marginBottom: '2px'
  },
  timeTitleBig: {
    fontSize: '14px',
    lineHeight: '16px',
    color: 'black',
    fontFamily: 'Roboto, sans-sarif'
  },
  eventName: {
    color: '#979797',
    fontSize: '12px',
    lineHeight: '16px',
    fontWight: 600
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
    fontSize: '10px'
  },
  noAvatar: {
    fontSize: '37px',
    marginTop: '-3px'
  },
  eventImage: {
    height: '120px',
    width: '100%'
  },
  contentWrapper: {
    paddingLeft: '15px'
  },
  img: {
    width: '100%',
    height: 'inherit'
  }
}))

interface IEventCardProps {
  event: IEvent
}

class EventCard extends React.Component<IEventCardProps & WithStyles> {
  public render() {
    const { event, classes } = this.props

    const size =
      event.guests && (event.guests.length > 2 ? 3 : event.guests.length)

    return (
      <Card key={event.eventId} className={classes.card}>
        <Link to={'/events/' + event.eventId} className={classes.link}>
          <div className={classes.eventImage}>
            <img className={classes.img} src={event.imageUrl} alt="" />
          </div>
          <div className={classes.contentWrapper}>
            <Typography className={classes.timeTitle}>
              <img src={eventIcon} alt="" className="eventCardIcon" />
              {event.startDateTime ? event.startDateTime.format('LT') : ''}
            </Typography>
            <Typography className={classes.timeTitleBig}>
              {event.startDateTime
                ? event.startDateTime.format('dddd, MMMM Do')
                : ''}
            </Typography>
            <Typography className={classes.eventName}>
              {event.name && event.name}
            </Typography>

            <Typography noWrap={true} className={classes.eventDescription}>
              {event.location && event.location.address}
            </Typography>
            <Grid container={true} justify={'flex-start'}>
              {event.guests &&
                event.guests
                  .slice(0, size)
                  .map((guest, i) => (
                    <React.Fragment key={i}>
                      {!guest.user.image ? (
                        <AccountCircle className={classes.noAvatar} />
                      ) : (
                        <Avatar
                          src={guest.user.image}
                          className={classes.avatar}
                        />
                      )}
                    </React.Fragment>
                  ))}
              <Avatar className={classes.avatar}>
                +{event.guests && (size === 3 ? event.guests.length - 3 : 0)}
              </Avatar>
            </Grid>
          </div>
        </Link>
      </Card>
    )
  }
}

export default decorate(EventCard)
