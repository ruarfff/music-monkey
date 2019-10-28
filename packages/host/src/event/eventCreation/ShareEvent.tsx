import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { Theme, WithStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import * as React from 'react'
import { Link } from 'react-router-dom'
import IAction from 'IAction'
import dateIcon from 'assets/date-icon.svg'
import locationIcon from 'assets/location-marker-icon.svg'
import backgroundImg from 'assets/partycover.jpg'
import InviteCopyAlert from 'components/InviteLink/InviteCopyAlert'
import MapComponent from 'location/MapComponent'
import ShareEventByEmail from 'components/ShareEvent/ShareEventByEmailContainer'
import IEvent from 'event/IEvent'
import './CreateEvent.scss'

const decorate = withStyles((theme: Theme) => ({
  img: {
    width: '100%',
    maxWidth: '500px',
    borderRadius: '4px'
  },
  title: {
    fontSize: '34px',
    lineHeight: '40px',
    color: 'black',
    marginBottom: '40px'
  },
  descriptionItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    height: '30px'
  },
  descriptionItemImg: {
    marginRight: '10px',
    width: '25px'
  },
  viewOnMap: {
    color: '#FFB000',
    paddingLeft: '30px',
    cursor: 'pointer'
  },
  navigationContainer: {
    marginTop: '20px',
    height: '100px',
    display: 'flex'
  },
  link: {
    textDecoration: 'none'
  }
}))

interface IShareEventProps {
  event: IEvent
  copiedToClipboard: boolean
  message: string
  clearMessage(): IAction
  copyEventInvite(): IAction
  acknowledgeEventInviteCopied(): IAction
}

class ShareEvent extends React.PureComponent<IShareEventProps & WithStyles> {
  public state = {
    showMap: false
  }

  public handleToggleMap = () => {
    this.setState({ showMap: !this.state.showMap })
  }

  public render() {
    const {
      classes,
      event,
      copyEventInvite,
      acknowledgeEventInviteCopied,
      copiedToClipboard,
      message,
      clearMessage
    } = this.props

    const eventImg = !event.imageUrl ? backgroundImg : event.imageUrl
    return (
      <React.Fragment>
        {copiedToClipboard && (
          <InviteCopyAlert
            message="Copied to Clipboard"
            onClose={acknowledgeEventInviteCopied}
          />
        )}
        <Grid item={true} md={4}>
          <div>
            <img alt={event.name} className={classes.img} src={eventImg} />
          </div>
          <div className={classes.title}>{event.name}</div>
          {event.description !== '' && (
            <div className={classes.descriptionItem}>
              Event Description: {event.description}
            </div>
          )}
          <div>
            <div className={classes.descriptionItem}>
              <img
                alt={event.description}
                className={classes.descriptionItemImg}
                src={dateIcon}
              />
              <span>{event.startDateTime.format('Do MMMM YYYY LT')}</span>
            </div>
            <div className={classes.descriptionItem}>
              <img
                alt={event.description}
                className={classes.descriptionItemImg}
                src={locationIcon}
              />
              <span>{event.location && event.location.address}</span>
            </div>
            <span className={classes.viewOnMap} onClick={this.handleToggleMap}>
              View on Map
            </span>
          </div>

          <Grid
            container={true}
            direction={'column'}
            justify={'space-between'}
            className={classes.navigationContainer}
          >
            <Link className={classes.link} to={'/events/' + event.eventId}>
              <Button variant="contained" color="secondary" fullWidth={true}>
                GO TO EVENT SUMMARY
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid item={true} md={8}>
          <ShareEventByEmail
            clearMessage={clearMessage}
            message={message}
            withPreview={true}
            event={event}
            inviteId={event && event.invites ? event.invites[0] : ''}
            onCopyEventInvite={copyEventInvite}
          />
        </Grid>
        <Grid item={true} md={12}>
          {!!event.location &&
            !!event.location.latLng &&
            this.state.showMap && (
              <MapComponent coords={event.location.latLng} />
            )}
        </Grid>
      </React.Fragment>
    )
  }
}

export default decorate(ShareEvent)
