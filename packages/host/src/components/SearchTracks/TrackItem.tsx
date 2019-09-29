import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import * as React from 'react'
import IAction from 'IAction'
import ITrack from 'track/ITrack'
import formatDuration from 'util/formatDuration'
import './TrackItem.scss'

interface ITrackItemProps {
  track: ITrack
  playlistId: string
  layout?: string
  disableAddButton?: boolean
  addTrack(playlistId: string, track: ITrack): IAction
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

  const handleAddTrack = (track: ITrack) => () => {
    addTrack(playlistId, track)
    if (handleClearSearch) {
      handleClearSearch()
    }
  }

  if (track.album && track.album.images && track.album.images.length > 0) {
    trackImage = (
      <ListItemIcon>
        <img
          className="track-image"
          src={track.album.images[0].url}
          alt={track.name}
        />
      </ListItemIcon>
    )
  }

  return (
    <ListItem className="TrackItem-root" dense={true} button={true}>
      {trackImage}
      <div
        className={
          layout === 'column'
            ? 'listItemContent-column listItemContent'
            : 'listItemContent'
        }
      >
        <div className="trackLeftContent">
          <div className="trackNameContainer">
            <span className="trackBand">{track.album.artists[0].name}</span>
            <span className="trackName">{track.name}</span>
          </div>
          <div className="trackDuration">
            {formatDuration(track.duration_ms)}
          </div>
        </div>
        <div className="trackContainer">
          <audio
            src={track.preview_url ? track.preview_url : ''}
            controls={true}
            className="EventSuggestions-audio"
            preload="none"
          />
        </div>
      </div>
      {!disableAddButton && (
        <ListItemSecondaryAction>
          <Button
            className="accept-track"
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
