import React from 'react'
import { Divider, List, ListItem, ListItemText } from '@material-ui/core'
import { Link } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import Image from 'components/Image'
import backgroundImage from 'assets/music-monkey.jpg'
import { Playlist } from 'mm-shared'
import getPlaylistImage from './getPlaylistImage'
import getPlaylistTracks from './getPlaylistTracks'
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
            <Image
              src={getPlaylistImage(playlist)}
              alt="Playlist icon"
              fallbackSrc={backgroundImage}
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
