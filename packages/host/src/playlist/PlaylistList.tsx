import React from 'react'
import { Divider, List, ListItem, ListItemText } from '@material-ui/core'
import { Link } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import Image from 'components/Image'
import backgroundImg from 'assets/partycover.jpg'
import IPlaylist from './IPlaylist'
import getPlaylistImage from './getPlaylistImage'
import getPlaylistTracks from './getPlaylistTracks'
import './PlaylistList.scss'

interface IPlaylistListProps {
  playlists: IPlaylist[]
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
            to={'/playlists/' + playlist.id}
            className="PlaylistList-item"
          >
            <Image
              src={getPlaylistImage(playlist)}
              alt="Playlist icon"
              fallbackSrc={backgroundImg}
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