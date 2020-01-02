import React from 'react'
import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import { Action, Track } from 'mm-shared'
import formatDuration from 'util/formatDuration'
import './TrackItem.scss'

interface ITrackItemProps {
  track: Track
  playlistId: string
  layout?: string
  disableAddButton?: boolean
  addTrack(playlistId: string, track: Track): Action
  handleClearSearch?(): void
}

const TrackItem = ({
  track,
  layout,
  playlistId,
  disableAddButton,
  handleClearSearch,
  addTrack
}: ITrackItemProps) => {
  let trackImage = <span />

  const handleAddTrack = (track: Track) => () => {
    addTrack(playlistId, track)
    if (handleClearSearch) {
      handleClearSearch()
    }
  }

  if (track.album && track.album.images && track.album.images.length > 0) {
    trackImage = (
      <ListItemIcon>
        <img
          className="TrackItem-track-image"
          src={track.album.images[0].url}
          alt={track.name}
        />
      </ListItemIcon>
    )
  }

  return (
    <ListItem className="TrackItem-root" dense={true} button={true}>
      {trackImage}
      <div className="TrackItem-content">
        <div className="TrackItem-left-content">
          <div className="TrackItem-name-container">
            <span className="TrackItem-band">
              {track.album.artists[0].name}
            </span>
            <span>{track.name}</span>
          </div>
          <div className="TrackItem-duration">
            {formatDuration(track.duration_ms)}
          </div>
        </div>
        <audio
          src={track.preview_url ? track.preview_url : ''}
          controls={true}
          preload="none"
        />
      </div>
      {!disableAddButton && (
        <ListItemSecondaryAction>
          <Button
            className="TrackItem-accept-track"
            variant="contained"
            onClick={handleAddTrack(track)}
          >
            ADD
          </Button>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  )
}

export default TrackItem
