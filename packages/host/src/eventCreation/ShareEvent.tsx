import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { Theme, WithStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import dateIcon from '../assets/date-icon.svg'
import locationIcon from '../assets/location-marker-icon.svg'
import backgroundImg from '../assets/partycover.png'
import InviteCopyAlert from '../components/InviteLink/InviteCopyAlert'
import MapComponent from '../components/MapComponent'
import ShareEventByEmail from '../components/ShareEvent/ShareEventByEmailContainer'
import IEvent from '../event/IEvent'
import IAction from '../IAction'
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
  copyEventInvite(): IAction
  acknowledgeEventInviteCopied(): IAction
}

const ShareEvent = ({
  classes,
  event,
  copyEventInvite
}: IShareEventProps & WithStyles) => {
  const [showMap, setShowMap] = useState(false)
  const [copiedToClipboard, setCopiedToClipboard] = useState(false)
  const eventImg = !event.imageUrl ? backgroundImg : event.imageUrl

  return (
    <Grid container={true} spacing={24} direction="row">
      {copiedToClipboard && (
        <InviteCopyAlert
          message="Copied to Clipboard"
          onClose={() => {
            setCopiedToClipboard(false)
          }}
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
          <span
            className={classes.viewOnMap}
            onClick={() => {
              setShowMap(!showMap)
            }}
          >
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
          withPreview={true}
          event={event}
          inviteId={event && event.invites ? event.invites[0] : ''}
          onCopyEventInvite={copyEventInvite}
        />
      </Grid>
      <Grid item={true} md={12}>
        {!!event.location && !!event.location.latLng && showMap && (
          <MapComponent coords={event.location.latLng} />
        )}
      </Grid>
    </Grid>
  )
}

export default decorate(ShareEvent)
