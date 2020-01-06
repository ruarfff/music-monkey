import React, { FunctionComponent } from 'react'
import Img from 'react-image'
import {
  Divider,
  Icon,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Avatar
} from '@material-ui/core'
import Badge from '@material-ui/core/Badge'
import FavouriteIcon from '@material-ui/icons/FavoriteBorder'
import IconButton from '@material-ui/core/IconButton'
import { Track, getTrackImage } from 'mm-shared'
import IDecoratedSuggestion from 'requests/IDecoratedSuggestion'
import './TrackListItem.scss'

// TODO:  use this: https://codepen.io/dmarcus/pen/vKdWxW
// Also this for styles: https://codepen.io/ArnaudBalland/pen/vGZKLr

interface TrackListItemProps {
  track: any
  suggestion?: IDecoratedSuggestion
  withVoting: boolean
  currentUserVoted: boolean
  numberOfVotes: number
  withSuggestingEnabled: boolean
  eventName?: string
  onVote: (track: Track) => void
  onTrackSelected: (track: Track) => void
}

const TrackListItem: FunctionComponent<TrackListItemProps> = ({
  track,
  suggestion,
  withVoting,
  currentUserVoted,
  numberOfVotes,
  withSuggestingEnabled,
  eventName,
  onVote,
  onTrackSelected
}) => {
  if (!track) {
    return <span />
  }

  console.log(suggestion)
  const user = !!suggestion ? suggestion.user : null
  let initials: any = 'G'

  if (!!user && user.displayName) {
    initials = user.displayName.match(/\b\w/g) || []
    initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
  }

  const handleTrackSelected = () => {
    onTrackSelected(track)
  }

  const handleTrackVote = () => {
    onVote(track)
  }

  const trackImage = (
    <Img
      src={getTrackImage(track)}
      alt={track.name}
      className="TrackListItem-track-image"
    />
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
  if (withVoting) {
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

  return (
    <>
      <ListItem
        className="TrackListItem-root"
        alignItems="flex-start"
        dense
        button
        onClick={handleTrackSelected}
      >
        <ListItemIcon>{trackImage}</ListItemIcon>
        <ListItemText
          className="TrackListItem-content"
          primary={track.name}
          primaryTypographyProps={{ noWrap: true }}
          secondary={track.artists[0].name}
          secondaryTypographyProps={{
            variant: 'body2',
            noWrap: true
          }}
        />

        <span> {eventName} </span>
        <ListItemSecondaryAction className="TrackListItem-actions">
          {avatar}
          {votingButton}
          {withSuggestingEnabled && (
            <Icon onClick={handleTrackSelected}> playlist_add </Icon>
          )}
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )
}

export default TrackListItem
