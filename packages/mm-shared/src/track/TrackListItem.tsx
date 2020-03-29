import React, { FC, useState, useEffect } from 'react'
import isEqual from 'lodash/isEqual'
import FavouriteIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIconFill from '@material-ui/icons/Favorite'
import AddIcon from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline'
import {
  Badge,
  List,
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fab,
  Divider,
  Avatar,
  ListItemSecondaryAction
} from '@material-ui/core'
import Img from 'react-image'
import backgroundImage from 'assets/music-monkey.jpg'
import {
  Event,
  Track,
  getTrackImage,
  DecoratedSuggestion,
  formatDuration,
  Suggestion
} from '../'
import { TrackConfig } from './TrackConfig'
import { withStyles } from '@material-ui/core/styles'
import './TrackListItem.scss'

interface TrackListItemProps {
  isHost: boolean
  track: Track
  suggestion?: DecoratedSuggestion
  numberOfVotes: number
  event?: Event
  currentUserVoted: boolean
  options: TrackConfig
  isPlaying?: boolean
  highlight: boolean
  onPlay?(track: Track): void
  onVote?(track: Track): void
  onSelected?(track: Track, suggestion: Suggestion): void
  onRemoved?(track: Track, suggestion: Suggestion): void
}

interface VoteDetails {
  isHost: boolean
  currentUserVoted: boolean
  numberOfVotes: number
  track: Track
}

interface VoteButtonProps {
  voteDetails: VoteDetails
  onVote(track: Track): void
}
const VoteButton: FC<VoteButtonProps> = ({ voteDetails, onVote }) => {
  const [vote, setVote] = useState<VoteDetails>({
    currentUserVoted: false,
    numberOfVotes: 0,
    isHost: false,
    track: {} as Track
  })

  useEffect(() => {
    if (!isEqual(vote, voteDetails)) {
      setVote(voteDetails)
    }
  }, [vote, voteDetails])

  const handleTrackVote = () => {
    if (!vote.isHost) {
      setVote({
        isHost: vote.isHost,
        track: vote.track,
        currentUserVoted: !vote.currentUserVoted,
        numberOfVotes: vote.currentUserVoted
          ? vote.numberOfVotes - 1
          : vote.numberOfVotes + 1
      })
      const doVote = async () => {
        onVote(vote.track)
      }

      doVote()
    }
  }

  return vote.currentUserVoted ? (
    <div onClick={handleTrackVote}>
      <Badge badgeContent={vote.numberOfVotes} className="current-user">
        <FavoriteIconFill color="primary" fontSize="large" />
      </Badge>
    </div>
  ) : (
    <div onClick={handleTrackVote}>
      <Badge badgeContent={vote.numberOfVotes}>
        <FavouriteIcon fontSize="large" />
      </Badge>
    </div>
  )
}

const SmallAvatar = withStyles(theme => ({
  root: {
    width: 22,
    height: 22,
    border: `2px solid`,
    backgroundColor: '#af00ff'
  }
}))(Avatar)

export const TrackListItem: FC<TrackListItemProps> = ({
  isHost,
  track,
  suggestion,
  currentUserVoted,
  numberOfVotes,
  event,
  highlight,
  options = {},
  isPlaying = false,
  onPlay = () => {},
  onVote = () => {},
  onSelected = () => {},
  onRemoved = () => {}
}) => {
  const hasOptions = options.canRequest || options.canRemove
  const [hidden, setHidden] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    setHidden(false)
  }, [track])

  if (!track) {
    return <span />
  }

  const handleSelected = () => {
    setExpanded(false)
    setHidden(true)
    const actualSuggestion = !!suggestion
      ? suggestion.suggestion
      : ({} as Suggestion)
    onSelected(track, actualSuggestion)
  }

  const handleRemove = () => {
    setExpanded(false)
    setHidden(true)
    const actualSuggestion = !!suggestion
      ? suggestion.suggestion
      : ({} as Suggestion)
    onRemoved(track, actualSuggestion)
  }

  const user = !!suggestion ? suggestion.user : !!event ? event.hostData : null
  let initials: any = 'G'

  if (!!user && user.displayName) {
    initials = user.displayName.match(/\b\w/g) || []
    initials = (initials.shift() || '').toUpperCase()
  }

  const handleExpandToggle = () => {
    if (hasOptions) {
      setExpanded(!expanded)
    }
  }

  const withBadge = (child: any) => (
    <Badge
      overlap="circle"
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      badgeContent={
        <SmallAvatar alt="User avatar" src={!!user ? user.image : ''}>
          {!user || !user.image ? initials : null}
        </SmallAvatar>
      }
    >
      {child}
    </Badge>
  )

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

  let addButton = <span />
  if (options.canRemove) {
    addButton = (
      <Fab
        aria-label="remove"
        size="small"
        color="secondary"
        onClick={handleRemove}
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
        onClick={handleSelected}
      >
        <AddIcon />
      </Fab>
    )
  }

  const expandIcon = () => {
    return expanded ? <ExpandLess /> : <ExpandMore />
  }

  return (
    <>
      <Collapse in={!hidden} timeout="auto" unmountOnExit>
        <ListItem
          className={
            highlight
              ? 'TrackListItem-root TrackListItem-highlight'
              : 'TrackListItem-root'
          }
          alignItems="flex-start"
          button
        >
          <ListItemIcon
            onClick={() => {
              onPlay(track)
            }}
          >
            {!!user ? withBadge(trackImage) : trackImage}
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

          <ListItemSecondaryAction
            className="TrackListItem-actions"
            onClick={handleExpandToggle}
          >
            {options.canVote && (
              <VoteButton
                onVote={onVote}
                voteDetails={{ currentUserVoted, numberOfVotes, track, isHost }}
              />
            )}
            {hasOptions && expandIcon()}
          </ListItemSecondaryAction>
        </ListItem>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className="TrackListItem-nested">
              <div className="TrackListItem-host-actions">
                {addButton}
                {deleteButton}
              </div>
            </ListItem>
          </List>
        </Collapse>
      </Collapse>
      <Divider variant="inset" component="li" />
    </>
  )
}
