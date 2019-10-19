import React from 'react'
import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ITrack from 'track/ITrack'
import head from 'lodash/head'
import sortBy from 'lodash/sortBy'
import formatDuration from 'util/formatDuration'
import IImage from 'playlist/IImage'
import './TrackItem.scss'

interface ITrackItemProps {
  track: ITrack
  disableAddButton?: boolean
  onSelected(track: ITrack): void
}

const TrackItem = ({
  track,
  disableAddButton,
  onSelected
}: ITrackItemProps) => {
  let trackImage = <span />

  const handleAddTrack = (track: ITrack) => () => {
    onSelected(track)
  }

  if (track.album && track.album.images && track.album.images.length > 0) {    
    const imageUrl = track.album.images.length > 0
              ? (
                  head(sortBy(track.album.images, 'height')) ||
                  ({} as IImage)
                ).url
              : '/img/partycover-sm.png'
    trackImage = (
      <ListItemIcon>
        <img
          className="TrackItem-track-image"
          src={imageUrl}
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
