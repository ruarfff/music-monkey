import React from 'react'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import FavouriteIcon from '@material-ui/icons/FavoriteBorder'
import isFunction from 'lodash/isFunction'
import formatDuration from 'util/formatDuration'
import ITrack from './ITrack'
import ITrackWithFeatures from './ITrackWithFeatures'
import './TrackListItem.scss'

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
      {trackImage}
      <Grid container={true} spacing={3}>
        <Grid
          item={true}
          md={12}
          container={true}
          direction={'row'}
          alignItems={'flex-end'}
        >
          <Grid
            container={true}
            direction={'column'}
            justify={'center'}
            md={3}
            item={true}
          >
            <ListItemText
              className="TrackListItem-name"
              primary={track.album.artists[0].name}
            />
            <ListItemText className="TrackListItem-name" primary={track.name} />
          </Grid>
          <ListItemText primary={formatDuration(track.duration_ms)} />
          <ListItemText
            primary={
              tracksWithFeature &&
              'tempo ' + Math.round(tracksWithFeature.tempo)
            }
          />
          {!disableRemoveTrack && (
            <Button onClick={handleRemoveTrack(track)}>REMOVE</Button>
          )}
        </Grid>
      </Grid>
      {votingButton}
    </ListItem>
  )
}

export default TrackListItem
