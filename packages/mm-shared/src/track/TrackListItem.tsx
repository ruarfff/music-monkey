import React, { FC } from 'react'
import FavouriteIcon from '@material-ui/icons/FavoriteBorder'
import AddIcon from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline'
import {
  Badge,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fab,
  Divider,
  Avatar,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core'
import isFunction from 'lodash/isFunction'
import Img from 'react-image'
import backgroundImage from 'assets/music-monkey.jpg'
import {
  Event,
  Track,
  getTrackImage,
  DecoratedSuggestion,
  formatDuration
} from '../'
import { TrackConfig } from './TrackConfig'
import './TrackListItem.scss'

// TODO:  use this: https://codepen.io/dmarcus/pen/vKdWxW
// Also this for styles: https://codepen.io/ArnaudBalland/pen/vGZKLr

/* <ListItemText
        primary={
          tracksWithFeature && 'tempo ' + Math.round(tracksWithFeature.tempo)
        }
      /> */

interface TrackListItemProps {
  track: Track
  suggestion?: DecoratedSuggestion
  numberOfVotes: number
  event?: Event
  currentUserVoted: boolean
  options: TrackConfig
  isPlaying?: boolean
  onPlay?(track: Track): void
  onVote?(track: Track): void
  onSelected?(track: Track): void
  onRemoved?(track: Track): void
}

export const TrackListItem: FC<TrackListItemProps> = ({
  track,
  suggestion,
  currentUserVoted,
  numberOfVotes,
  event,
  options,
  isPlaying = false,
  onPlay = () => {},
  onVote = () => {},
  onSelected = () => {},
  onRemoved = () => {}
}) => {
  if (!track) {
    return <span />
  }

  const user = !!suggestion ? suggestion.user : !!event ? event.hostData : null
  let initials: any = 'G'

  if (!!user && user.displayName) {
    initials = user.displayName.match(/\b\w/g) || []
    initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
  }

  const handleTrackSelected = () => {
    if (isFunction(onSelected)) {
      onSelected(track)
    }
  }

  const handleTrackVote = () => {
    onVote(track)
  }

  const handleRemoveTrack = (track: Track) => () => {
    if (isFunction(onRemoved)) {
      onRemoved(track)
    }
  }

  const trackImage = (
    <div className="TrackListItem-track-image">
      {isPlaying ? (
        <PauseCircleOutlineIcon className="content-overlay" />
      ) : (
        <PlayCircleOutlineIcon className="content-overlay" />
      )}
      <Img src={[getTrackImage(track), backgroundImage]} alt={track.name} />
    </div>
  )

  let avatar = <span />

  if (!!user) {
    avatar = user.image ? (
      <Avatar alt="user avatar" src={user.image} className="avatar" />
    ) : (
      <Avatar className="EventGuests-avatar">{initials}</Avatar>
    )
  }

  let votingButton = <span />
  if (options.canVote) {
    votingButton = (
      <IconButton aria-label="Vote" onClick={handleTrackVote}>
        <Badge
          badgeContent={numberOfVotes}
          color={currentUserVoted ? 'secondary' : 'primary'}
          className="TrackListItem-voting"
        >
          <FavouriteIcon />
        </Badge>
      </IconButton>
    )
  }

  let addButton = <span />
  if (options.canRemove) {
    addButton = (
      <Fab
        aria-label="remove"
        size="small"
        color="secondary"
        onClick={handleRemoveTrack(track)}
      >
        <Remove />
      </Fab>
    )
  }

  let deleteButton = <span />
  if (options.canRequest) {
    deleteButton = (
      <Fab
        color="primary"
        aria-label="add"
        size="small"
        onClick={handleTrackSelected}
      >
        <AddIcon />
      </Fab>
    )
  }

  return (
    <>
      <ListItem className="TrackListItem-root" alignItems="flex-start" button>
        <ListItemIcon
          onClick={() => {
            onPlay(track)
          }}
        >
          {trackImage}
        </ListItemIcon>
        <ListItemText
          className="TrackListItem-content"
          primary={track.name}
          primaryTypographyProps={{ noWrap: true }}
          secondary={
            <span>
              {track.artists[0].name}
              <br />
              {formatDuration(track.duration_ms)}
            </span>
          }
          secondaryTypographyProps={{
            variant: 'body2',
            noWrap: true
          }}
        />

        <ListItemSecondaryAction className="TrackListItem-actions">
          {votingButton}
          {avatar}
          {addButton}
          {deleteButton}
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )
}
