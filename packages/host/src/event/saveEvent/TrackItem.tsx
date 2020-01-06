import React from 'react'
import Fab from '@material-ui/core/Fab'
import ListItem from '@material-ui/core/ListItem'
import { ListItemText, ListItemIcon, Divider } from '@material-ui/core'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import AddIcon from '@material-ui/icons/Add'
import { Track, getTrackImage } from 'mm-shared'
import Img from 'react-image'

import './TrackItem.scss'

interface ITrackItemProps {
  track: Track
  onSelected(track: Track): void
}

const TrackItem = ({ track, onSelected }: ITrackItemProps) => {
  const handleAddTrack = (track: Track) => () => {
    onSelected(track)
  }

  const trackImage = (
    <Img
      src={getTrackImage(track)}
      alt={track.name}
      className="TrackItem-track-image"
    />
  )

  return (
    <>
      <ListItem className="TrackItem-root" alignItems="flex-start" button>
        <ListItemIcon>{trackImage}</ListItemIcon>
        <ListItemText
          className="TrackItem-content"
          primary={track.name}
          primaryTypographyProps={{ noWrap: true }}
          secondary={track.album.artists[0].name}
          secondaryTypographyProps={{
            variant: 'body2',
            noWrap: true
          }}
        />
        <ListItemSecondaryAction
          className="TrackItem-accept-track"
          onClick={handleAddTrack(track)}
        >
          <Fab color="primary" aria-label="add" size="small">
            <AddIcon />
          </Fab>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )
}

export default TrackItem
