import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { WithStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import FavouriteIcon from '@material-ui/icons/FavoriteBorder'
import * as React from 'react'
import { formatDuration } from '../util/formatDuration'
import ITrack from './ITrack'
import ITrackWithFeatures from './ITrackWithFeatures'
import './TrackListItem.scss'

// TODO:  use this: https://codepen.io/dmarcus/pen/vKdWxW
// Also this for styles: https://codepen.io/ArnaudBalland/pen/vGZKLr

const decorate = withStyles(() => ({
  trackName: {
    paddingLeft: '10px!important',
  },
  trackWrapper: {
    borderBottom: '1px solid #979797',
  },
  img: {
    borderRadius: '4px',
  },
}))

interface ITrackListItemProps {
  track: ITrack
  tracksWithFeature: ITrackWithFeatures
  withVoting: boolean
  currentUserVoted: boolean
  numberOfVotes: number
  onVote: ((track: ITrack) => void)
  onTrackSelected: ((track: ITrack) => void)
  removeTrack?: ((uri:string, position: number) => void)
  handleShowNotification: (() => void)
  disableRemoveTrack?: boolean
}

const TrackListItem = ({
  track,
  tracksWithFeature,
  withVoting,
  currentUserVoted,
  numberOfVotes,
  onVote,
  onTrackSelected,
  removeTrack,
  classes,
  handleShowNotification,
  disableRemoveTrack
}: ITrackListItemProps & WithStyles) => {
  if (!track) {
    return <span />
  }
  const handleTrackSelected = () => {
    onTrackSelected(track)
  }

  const handleTrackVote = () => {
    onVote(track)
  }

  const handleRemoveTrack = (uri: string, position: number) => () => {
    if (!!removeTrack) {
      removeTrack(uri, position)
      handleShowNotification()
    }
  }

  let trackImage = <span />
  if (track.album && track.album.images && track.album.images.length > 0) {
    trackImage = (
      <img
        className={classes.img}
        src={track.album.images[track.album.images.length - 1].url}
        alt={track.name}
      />
    )
  }
  let votingButton = <span />
  if (withVoting) {
    votingButton = (
      <IconButton aria-label="Vote" onClick={handleTrackVote}>
        <Badge
          badgeContent={numberOfVotes}
          color="secondary"
          className="TrackListItem-voting"
        >
          <FavouriteIcon />
        </Badge>
      </IconButton>
    )
  }

  return (
    <ListItem
      className={classes.trackWrapper}
      dense={true}
      button={true}
      onClick={handleTrackSelected}
    >
        {trackImage}
        <Grid container={true} spacing={24}>
          <Grid item={true} md={12} container={true} direction={'row'} alignItems={'flex-end'}>
            <Grid container={true} direction={'column'} justify={'center'} md={3} item={true}>
              <ListItemText className={classes.trackName} primary={track.album.artists[0].name} />
              <ListItemText className={classes.trackName} primary={track.name} />
            </Grid>
            <ListItemText primary={formatDuration(track.duration_ms)}/>
            <ListItemText primary={tracksWithFeature && 'tempo ' + Math.round(tracksWithFeature.tempo)} />
            {!disableRemoveTrack &&
              <Button onClick={handleRemoveTrack(track.uri, track.track_number)}>
                REMOVE
              </Button>
            }
          </Grid>
        </Grid>
          {votingButton}
    </ListItem>
  )
}

export default decorate(TrackListItem)
