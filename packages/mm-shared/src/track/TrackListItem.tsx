import React, { FC, useState, useEffect } from 'react'
import AddIcon from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline'
import ExplicitIcon from '@material-ui/icons/Explicit'
import {
  List,
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  ListItemSecondaryAction,
  ListItemAvatar,
  IconButton,
  Typography,
  Box
} from '@material-ui/core'
import Img from 'react-image'
import Rating from '@material-ui/lab/Rating'
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
import TrackAvatar from './TrackAvatar'
import VoteButton from './VoteButton'
import VoteButtonSmall from './VoteButtonSmall'
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
    setExpanded(!expanded)
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

  let deleteButton = <span />
  if (options.canRemove) {
    deleteButton = (
      <IconButton
        aria-label="remove"
        size="small"
        color="secondary"
        onClick={handleRemove}
      >
        <Remove />
      </IconButton>
    )
  }

  let addButton = <span />
  if (options.canRequest) {
    addButton = (
      <IconButton
        color="primary"
        aria-label="add"
        size="small"
        onClick={handleSelected}
      >
        <AddIcon />
      </IconButton>
    )
  }

  const expandIcon = () => {
    return expanded ? (
      <ExpandLess onClick={handleExpandToggle} />
    ) : (
      <ExpandMore onClick={handleExpandToggle} />
    )
  }

  return (
    <>
      <Collapse in={!hidden} timeout="auto">
        <ListItem
          className={
            highlight
              ? 'TrackListItem-root TrackListItem-highlight'
              : 'TrackListItem-root'
          }
          alignItems="flex-start"
          button
        >
          {options.showProfile ? (
            <ListItemAvatar>
              <TrackAvatar user={user!} initials={initials} />
            </ListItemAvatar>
          ) : (
            <ListItemIcon
              onClick={() => {
                onPlay(track)
              }}
            >
              {trackImage}
            </ListItemIcon>
          )}

          <ListItemText
            className="TrackListItem-content"
            disableTypography
            primary={
              <Typography noWrap={true} variant="body1">
                {track.name}
              </Typography>
            }
            secondary={
              <Typography component="div">
                <Typography
                  variant="caption"
                  noWrap={true}
                  className="MuiTypography-colorTextSecondary"
                >
                  {track.artists[0].name}
                </Typography>
                <Typography
                  component="div"
                  variant="body2"
                  noWrap={true}
                  gutterBottom
                  className="MuiTypography-colorTextSecondary"
                >
                  <div className="TrackListItem-secondary-items">
                    {options.canVote && isHost && (
                      <div className="TrackListItem-votes">
                        <VoteButtonSmall
                          voteDetails={{
                            currentUserVoted,
                            numberOfVotes,
                            track,
                            isHost
                          }}
                          onVote={onVote}
                        />
                      </div>
                    )}

                    {track.explicit && (
                      <ExplicitIcon color="primary" className="explicit-icon" />
                    )}
                    {formatDuration(track.duration_ms)}
                  </div>
                </Typography>
              </Typography>
            }
          />

          <ListItemSecondaryAction className="TrackListItem-actions">
            <div className="TrackListItem-host-actions">
              {options.canVote && !isHost && (
                <VoteButton
                  onVote={onVote}
                  voteDetails={{
                    currentUserVoted,
                    numberOfVotes,
                    track,
                    isHost
                  }}
                />
              )}
              {addButton}
              {!options.deleteSecondary && deleteButton}
            </div>
            {expandIcon()}
          </ListItemSecondaryAction>
        </ListItem>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className="TrackListItem-nested">
              {options.showProfile && (
                <ListItemIcon
                  onClick={() => {
                    onPlay(track)
                  }}
                >
                  {trackImage}
                </ListItemIcon>
              )}
              <Box component="fieldset" mb={1} borderColor="transparent">
                <Rating
                  name={'popularity-' + track.id}
                  defaultValue={Math.abs(track.popularity / 20)}
                  max={5}
                  size="small"
                />
              </Box>
              <ListItemSecondaryAction className="TrackListItem-actions-nested">
                {options.deleteSecondary && deleteButton}
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Collapse>
      </Collapse>
      <Divider variant="inset" component="li" />
    </>
  )
}
