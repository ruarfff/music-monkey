import React from 'react'
import Badge from '@material-ui/core/Badge'
import Fab from '@material-ui/core/Fab'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import FavouriteIcon from '@material-ui/icons/FavoriteBorder'
import isFunction from 'lodash/isFunction'
import formatDuration from 'util/formatDuration'
import ITrack from './ITrack'
import ITrackWithFeatures from './ITrackWithFeatures'
import Remove from '@material-ui/icons/Remove'
import './TrackListItem.scss'
import { Typography } from '@material-ui/core'

// TODO:  use this: https://codepen.io/dmarcus/pen/vKdWxW
// Also this for styles: https://codepen.io/ArnaudBalland/pen/vGZKLr

interface ITrackListItemProps {
  track: ITrack
  tracksWithFeature: ITrackWithFeatures
  withVoting: boolean
  numberOfVotes: number
  disableRemoveTrack?: boolean
  onVote(track: ITrack): void
  onTrackSelected?(track: ITrack): void
  onTrackRemoved?(track: ITrack): void
}

const TrackListItem = ({
  track,
  tracksWithFeature,
  withVoting,
  numberOfVotes,
  disableRemoveTrack,
  onVote,
  onTrackSelected,
  onTrackRemoved
}: ITrackListItemProps) => {
  if (!track) {
    return <span />
  }
  const handleTrackSelected = () => {
    if (isFunction(onTrackSelected)) {
      onTrackSelected(track)
    }
  }

  const handleTrackVote = () => {
    onVote(track)
  }

  const handleRemoveTrack = (track: ITrack) => () => {
    if (isFunction(onTrackRemoved)) {
      onTrackRemoved(track)
    }
  }

  let trackImage = <span />
  if (track.album && track.album.images && track.album.images.length > 0) {
    trackImage = (
      <img
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
      className="TrackListItem-root"
      dense={true}
      button={true}
      onClick={handleTrackSelected}
    >
      <ListItemIcon>{trackImage}</ListItemIcon>
      <ListItemText>
        <div className="TrackItem-content">
          <Typography variant="h6" gutterBottom noWrap>
            {track.name}
          </Typography>
          <Typography variant="subtitle1" display="inline" align="left" noWrap>
            {track.album.artists[0].name}
          </Typography>
          <Typography variant="subtitle2" display="block" align="right">
            {formatDuration(track.duration_ms)}
          </Typography>
        </div>
      </ListItemText>
      {/* <ListItemText
        primary={
          tracksWithFeature && 'tempo ' + Math.round(tracksWithFeature.tempo)
        }
      /> */}

      <ListItemSecondaryAction>
        {!disableRemoveTrack && (
          <Fab
            color="primary"
            aria-label="add"
            size="small"
            onClick={handleRemoveTrack(track)}
          >
            <Remove />
          </Fab>
        )}
        {votingButton}
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default TrackListItem
