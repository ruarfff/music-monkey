import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { Theme, WithStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
// import AccountCircle from '@material-ui/icons/AccountCircle'
import * as React from 'react'
import { Link } from 'react-router-dom'
import dateIcon from '../assets/date-icon.svg'
import locationIcon from '../assets/location-marker-icon.svg'
import InviteCopyAlert from '../components/InviteLink/InviteCopyAlert'
import InviteLink from '../components/InviteLink/InviteLink'
import MapComponent from '../components/MapComponent'
import IEvent from '../event/IEvent'
import IAction from '../IAction'
import './CreateEvent.scss'

const decorate = withStyles((theme: Theme) => ({
  img: {
    width: '100%',
    maxWidth: '500px',
    borderRadius:'4px'
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
    height: '30px',
  },
  descriptionItemImg: {
    marginRight: '10px',
    width: '25px'
  },
  viewOnMap: {
    color: '#FFB000',
    paddingLeft: '30px',
    cursor: 'pointer',
  },
  navigationContainer: {
    height: '160px',
    display: 'flex',
  },
  link: {
    textDecoration: 'none',
  }
}))

interface IShareEventProps {
  event: IEvent
  copiedToClipboard: boolean
  copyEventInvite(): IAction
  acknowledgeEventInviteCopied(): IAction
}

class ShareEvent extends React.PureComponent<IShareEventProps & WithStyles> {

  public state = {
    showMap: false,
  }

  public renderMap = (coords: any) => {
    return (
      <MapComponent
        coords={coords}
      />
    )
  }

  public handleToggleMap = () => {
    this.setState({showMap: !this.state.showMap})
  }

  public render() {
    const {
      classes,
      event,
      copyEventInvite,
      acknowledgeEventInviteCopied,
      copiedToClipboard,
    } = this.props

    return (
      <React.Fragment>
        {copiedToClipboard &&
          <InviteCopyAlert
            message="Copied to Clipboard"
            onClose={acknowledgeEventInviteCopied}
          />
        }
        <Grid item={true} md={8}>
          <div>
            <img
              className={classes.img}
              src={event.imageUrl}
            />
          </div>
          <div className={classes.title}>
            {event.name}
          </div>
          <div>
            <div className={classes.descriptionItem}>
              <img className={classes.descriptionItemImg} src={dateIcon} />
              <span>{event.startDateTime.format('Do MMMM YYYY LT')}</span>
            </div>
            <div>
              <img className={classes.descriptionItemImg} src={locationIcon} />
              <span>{event.location && event.location.address}</span>
            </div>
            <span
              className={classes.viewOnMap}
              onClick={this.handleToggleMap}
            >
              View on Map
            </span>
          </div>
          {/*<div className={classes.descriptionItem}>*/}
            {/*<span>Co-Hosts</span>*/}
            {/*<AccountCircle/>*/}
          {/*</div>*/}
        </Grid>
        <Grid item={true} md={4}>
          <Grid
            container={true}
            direction={'column'}
            justify={'space-between'}
            className={classes.navigationContainer}
          >
            <InviteLink
              inviteId={event && event.invites ? event.invites[0] : ''}
              onCopyEventInvite={copyEventInvite}
            />
            <a className={classes.link} target="_blank" href={event.playlistUrl}>
              <Button
                variant='contained'
                color='secondary'
                target='_blank'
                fullWidth={true}
              >
                GO TO PLAYLIST
              </Button>
            </a>
            <Link className={classes.link} to={'/events/' + event.eventId}>
              <Button
                variant="contained"
                color='secondary'
                fullWidth={true}
              >
                GO TO EVENT
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid item={true} md={12}>
            {(event.location && this.state.showMap) && this.renderMap(event.location.latLng)}
        </Grid>
      </React.Fragment>
    )
  }
}

export default decorate(ShareEvent)