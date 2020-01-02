import React from 'react'
import {
  Avatar,
  Divider,
  Icon,
  ListItem,
  ListItemText
} from '@material-ui/core'
import { Track }  from 'mm-shared'
import './TrackListItem.scss'

// TODO:  use this: https://codepen.io/dmarcus/pen/vKdWxW
// Also this for styles: https://codepen.io/ArnaudBalland/pen/vGZKLr

interface ITrackListItemProps {
  track: any
  withVoting: boolean
  currentUserVoted: boolean
  numberOfVotes: number
  onVote: (track: Track) => void
  onTrackSelected: (track: Track) => void
  withSuggestingEnabled: boolean
  eventName?: string
}

const TrackListItem = ({
  track,
  withVoting,
  currentUserVoted,
  numberOfVotes,
  onVote,
  onTrackSelected,
  withSuggestingEnabled,
  eventName
}: ITrackListItemProps) => {
  if (!track) {
    return <span />
  }
  const handleTrackSelected = () => {
    onTrackSelected(track)
  }

  const handleTrackVote = () => {
    onVote(track)
  }

  let trackImage = <span />
  if (track.album && track.album.images && track.album.images.length > 0) {
    trackImage = (
      <Avatar>
        <img
          src={track.album.images[track.album.images.length - 1].url}
          alt={track.name}
        />
      </Avatar>
    )
  }
  let votingButton = <span />
  if (withVoting) {
    votingButton = (
      <div className="playList-favorite">
        <div
          className="playList-button-favorite"
          onClick={handleTrackVote}
          style={{ color: currentUserVoted ? 'secondary' : 'primary' }}
        >
          <span className="playList-favorite-count"> {numberOfVotes} </span>
          <Icon
            className={`playList-favorite-icon ${
              currentUserVoted ? 'secondary' : 'primary'
            }`}
          >
            favorite
          </Icon>
        </div>
      </div>
    )
  }

  return (
    <div className="event-list-item">
      <ListItem dense={true} button={true}>
        {trackImage}
        <div className="event-list-name" onClick={handleTrackSelected}>
          <ListItemText
            primary={track.artists[0].name}
            secondary={track.name}
          />
          <span className="event-list-span-name"> {eventName} </span>
        </div>
        {votingButton}
        {withSuggestingEnabled ? (
          <Icon onClick={handleTrackSelected} className="playList-button-add">
            {' '}
            playlist_add{' '}
          </Icon>
        ) : (
          ''
        )}
      </ListItem>
      <Divider variant="inset" />
    </div>
  )
}

export default TrackListItem
