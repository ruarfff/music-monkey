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
import Image from 'components/Image'
import backgroundImage from 'assets/music-monkey.jpg'
import Remove from '@material-ui/icons/Remove'
import { Divider, Avatar } from '@material-ui/core'
import getTrackImage from 'track/getTrackImage'
import IDecoratedSuggestion from './IDecoratedSuggestion'
import { Track } from 'mm-shared'
import { User } from 'mm-shared'
import './SuggestionListItem.scss'

interface SuggestionListItemProps {
  suggestion: IDecoratedSuggestion
  withVoting: boolean
  numberOfVotes: number
  disableRemoveTrack?: boolean
  avatar?: string
  onVote(track: Track): void
  onTrackSelected?(track: Track): void
  onTrackRemoved?(track: Track): void
}

const SuggestionListItem = ({
  suggestion,
  withVoting,
  numberOfVotes,
  disableRemoveTrack,
  onVote,
  onTrackSelected,
  onTrackRemoved
}: SuggestionListItemProps) => {
  if (!suggestion) {
    return <span />
  }

  const track: Track = suggestion.track
  const user: User = suggestion.user
  let initials: any = 'G'

  if (user && user.displayName) {
    initials = user.displayName.match(/\b\w/g) || []
    initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
  }

  const handleTrackSelected = () => {
    if (isFunction(onTrackSelected)) {
      onTrackSelected(track)
    }
  }

  const handleTrackVote = () => {
    onVote(track)
  }

  const handleRemoveTrack = (track: Track) => () => {
    if (isFunction(onTrackRemoved)) {
      onTrackRemoved(track)
    }
  }

  const trackImage = (
    <Image
      src={getTrackImage(track)}
      alt={track.name}
      fallbackSrc={backgroundImage}
      className="SuggestionListItem-track-image"
    />
  )

  let votingButton = <span />
  if (withVoting) {
    votingButton = (
      <IconButton aria-label="Vote" onClick={handleTrackVote}>
        <Badge
          badgeContent={numberOfVotes}
          color="secondary"
          className="SuggestionListItem-voting"
        >
          <FavouriteIcon />
        </Badge>
      </IconButton>
    )
  }

  return (
    <>
      <ListItem
        className="SuggestionListItem-root"
        alignItems="flex-start"
        button
        onClick={handleTrackSelected}
      >
        <ListItemIcon>{trackImage}</ListItemIcon>
        <ListItemText
          className="SuggestionListItem-content"
          primary={track.name}
          primaryTypographyProps={{ noWrap: true }}
          secondary={track.album.artists[0].name}
          secondaryTypographyProps={{
            variant: 'body2',
            noWrap: true
          }}
        />

        <ListItemSecondaryAction className="SuggestionListItem-actions">
          {!!user.image && (
            <Avatar alt="user avatar" src={user.image} className="avatar" />
          )}
          {!user.image && (
            <Avatar className="EventGuests-avatar">{initials}</Avatar>
          )}

          {!disableRemoveTrack && (
            <Fab
              aria-label="remove"
              size="small"
              color="primary"
              onClick={handleRemoveTrack(track)}
            >
              <Remove />
            </Fab>
          )}
          {votingButton}
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )
}

export default SuggestionListItem
