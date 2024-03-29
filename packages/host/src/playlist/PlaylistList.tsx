import React from 'react'
import { Divider, List, ListItem, ListItemText } from '@material-ui/core'
import { Link } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import Img from 'react-image'
import backgroundImage from 'assets/music-monkey.jpg'
import { Playlist, getPlaylistImage, getPlaylistTracks } from 'mm-shared'
import './PlaylistList.scss'

interface PlaylistWithEventId extends Playlist {
  eventId: string
}
interface IPlaylistListProps {
  playlists: PlaylistWithEventId[]
}

const PlaylistList = ({ playlists }: IPlaylistListProps) => {
  if (isEmpty(playlists)) return null
  return (
    <List>
      {playlists.map(playlist => (
        <div className="PlaylistList-root" key={playlist.id}>
          <ListItem
            button={true}
            component={Link}
            to={'/events/' + playlist.eventId}
            className="PlaylistList-item"
          >
            <Img
              src={[getPlaylistImage(playlist), backgroundImage]}
              alt="Playlist icon"
              className="PlaylistList-playlist-image"
            />

            <ListItemText
              primary={playlist.name}
              secondary={`${getPlaylistTracks(playlist).length} Tracks`}
              className="PlaylistList-text"
            />
          </ListItem>
          <li>
            <Divider variant="inset" className="PlaylistList-item-divider" />
          </li>
        </div>
      ))}
    </List>
  )
}

export default PlaylistList
