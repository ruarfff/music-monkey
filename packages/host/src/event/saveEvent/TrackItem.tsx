import React from 'react'
import Fab from '@material-ui/core/Fab'
import ListItem from '@material-ui/core/ListItem'
import { ListItemText, Typography } from '@material-ui/core'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import AddIcon from '@material-ui/icons/Add'
import ITrack from 'track/ITrack'
import head from 'lodash/head'
import sortBy from 'lodash/sortBy'
import formatDuration from 'util/formatDuration'
import IImage from 'playlist/IImage'
import backgroundImg from 'assets/partycover.jpg'

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
    const imageUrl =
      track.album.images.length > 0
        ? (head(sortBy(track.album.images, 'height')) || ({} as IImage)).url
        : backgroundImg
    trackImage = (
      <img className="TrackItem-track-image" src={imageUrl} alt={track.name} />
    )
  }

  return (
    <ListItem className="TrackItem-root" dense={true} button={true}>
      <ListItemIcon>{trackImage}</ListItemIcon>
      <ListItemText>
        <div className="TrackItem-content">
          <Typography variant="h6" gutterBottom noWrap>
            {track.name}
          </Typography>
          <Typography variant="subtitle1" display="inline" align="left" noWrap>
            {track.album.artists[0].name}
          </Typography>
          <Typography variant="subtitle2" display="block" align="right">
            {formatDuration(track.duration_ms)}
          </Typography>
        </div>
        {/* <audio
          src={track.preview_url ? track.preview_url : ''}
          controls={true}
          preload="none"
        /> */}
      </ListItemText>
      <ListItemSecondaryAction>
        <Fab
          color="primary"
          aria-label="add"
          size="small"
          className="TrackItem-accept-track"
          onClick={handleAddTrack(track)}
        >
          <AddIcon />
        </Fab>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default TrackItem
