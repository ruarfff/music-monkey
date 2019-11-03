import React from 'react'
import Fab from '@material-ui/core/Fab'
import ListItem from '@material-ui/core/ListItem'
import { ListItemText, ListItemIcon, Divider } from '@material-ui/core'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import AddIcon from '@material-ui/icons/Add'
import ITrack from 'track/ITrack'
import Image from 'components/Image'
import backgroundImg from 'assets/partycover.jpg'
import getTrackImage from 'track/getTrackImage'

import './TrackItem.scss'

interface ITrackItemProps {
  track: ITrack
  onSelected(track: ITrack): void
}

const TrackItem = ({ track, onSelected }: ITrackItemProps) => {
  const handleAddTrack = (track: ITrack) => () => {
    onSelected(track)
  }

  const trackImage = (
    <Image
      src={getTrackImage(track)}
      alt={track.name}
      fallbackSrc={backgroundImg}
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
        <ListItemSecondaryAction>
          <Fab
            color="secondary"
            aria-label="add"
            size="small"
            className="TrackItem-accept-track"
            onClick={handleAddTrack(track)}
          >
            <AddIcon />
          </Fab>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )
}

export default TrackItem
