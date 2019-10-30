import React from 'react'
import Badge from '@material-ui/core/Badge'
import Fab from '@material-ui/core/Fab'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import FavouriteIcon from '@material-ui/icons/FavoriteBorder'
import isEmpty from 'lodash/isEmpty'
import head from 'lodash/head'
import sortBy from 'lodash/sortBy'
import isFunction from 'lodash/isFunction'
import formatDuration from 'util/formatDuration'
import IImage from 'playlist/IImage'
import Image from 'components/Image'
import backgroundImg from 'assets/partycover.jpg'
import ITrack from './ITrack'
import ITrackWithFeatures from './ITrackWithFeatures'
import Remove from '@material-ui/icons/Remove'
import { Typography } from '@material-ui/core'
import './TrackListItem.scss'

// TODO:  use this: https://codepen.io/dmarcus/pen/vKdWxW
// Also this for styles: https://codepen.io/ArnaudBalland/pen/vGZKLr

/* <ListItemText
        primary={
          tracksWithFeature && 'tempo ' + Math.round(tracksWithFeature.tempo)
        }
      /> */

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

  const imageUrl =
    track.album && !isEmpty(track.album.images)
      ? (head(sortBy(track.album.images, 'height')) || ({} as IImage)).url
      : backgroundImg

  const trackImage = (
    <Image src={imageUrl} alt={track.name} fallbackSrc={backgroundImg} />
  )

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
      alignItems="flex-start"
      dense
      button
      onClick={handleTrackSelected}
    >
      <ListItemIcon>{trackImage}</ListItemIcon>
      <ListItemText
        className="TrackItem-content"
        primary={track.name}
        secondary={
          <>
            <Typography component="span" variant="body2" color="textPrimary">
              {track.album.artists[0].name}
            </Typography>
            {` —  ${formatDuration(track.duration_ms)}`}
          </>
        }
      />

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
