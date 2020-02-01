import React, { FC, useEffect, useState } from 'react'
import {
  Typography,
  List,
  Button,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from '@material-ui/core'
import { isEmpty, sortBy, head } from 'lodash'
import {
  Action,
  Playlist,
  PlaylistImage,
  Track,
  TrackList,
  User
} from 'mm-shared'
import backgroundImage from 'assets/music-monkey.jpg'

interface MyPlaylistsTabProps {
  user: User
  playlists: Playlist[]
  playlistsEnabled: boolean
  onTrackSelected(track: Track): any
  savePlaylistSuggestion(suggestions: Playlist): any
  fetchMorePlaylists(user: User): Action
}

const MyPlaylistsTab: FC<MyPlaylistsTabProps> = ({
  user,
  playlists,
  playlistsEnabled,
  onTrackSelected,
  savePlaylistSuggestion,
  fetchMorePlaylists
}) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState({} as Playlist)

  useEffect(() => {
    const trackScrolling = () => {
      if (
        document.body.offsetHeight ===
        window.pageYOffset + window.innerHeight
      ) {
        console.log('Bug: Not fetching more playlists')
        //handleFetchMorePlaylists()
      }
    }

    document.addEventListener('scroll', trackScrolling)

    return function cleanup() {
      document.removeEventListener('scroll', trackScrolling)
    }
  })

  const renderPlaylistSimpleList = () => {
    if (isEmpty(playlists)) {
      return (
        <Typography align={'center'} variant={'h6'}>
          It looks like you don't have any playlists yet :(
        </Typography>
      )
    }
    return (
      <List>
        {playlists.map((playlist: Playlist, i: number) => {
          const playlistImage =
            playlist.images.length > 0
              ? (
                  head(sortBy(playlist.images, 'height')) ||
                  ({} as PlaylistImage)
                ).url
              : backgroundImage

          const playlistDisabled = playlist.tracks.total < 1
          return (
            <ListItem
              disabled={playlistDisabled}
              button={true}
              key={i}
              onClick={() => {
                if (!playlistDisabled) setSelectedPlaylist(playlist)
              }}
            >
              <ListItemAvatar>
                <Avatar alt={playlist.name} src={playlistImage} />
              </ListItemAvatar>
              <ListItemText
                primary={playlist.name}
                secondary={`${playlist.tracks.total} tracks`}
              />
            </ListItem>
          )
        })}
      </List>
    )
  }

  const renderListOfTracks = () => {
    return (
      <>
        <Button onClick={() => setSelectedPlaylist({} as Playlist)}>
          BACK TO PLAYLISTS
        </Button>
        {playlistsEnabled && (
          <Button onClick={savePlaylistSuggestion(selectedPlaylist)}>
            ADD ALL TRACKS
          </Button>
        )}
        <TrackList
          tracks={selectedPlaylist.tracks.items.map(t => t.track)}
          onTrackSelected={onTrackSelected}
          withSuggestingEnabled={true}
        />
      </>
    )
  }

  return (
    <Typography component="div" dir="1">
      {isEmpty(selectedPlaylist)
        ? renderPlaylistSimpleList()
        : renderListOfTracks()}
      <div className="Finder-stopper-block" />
    </Typography>
  )
}

export default MyPlaylistsTab
