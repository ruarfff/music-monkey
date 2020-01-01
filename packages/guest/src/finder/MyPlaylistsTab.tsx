import {
  Typography,
  List,
  Button,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from '@material-ui/core'
import { Action } from 'mm-shared'
import { isEmpty, sortBy, head } from 'lodash'
import IPlaylist from '../playlist/IPlaylist'
import ITrack from '../track/ITrack'
import IUser from '../user/IUser'
import React, { useEffect, useState } from 'react'
import TrackList from '../track/TrackList'
import backgroundImage from 'assets/music-monkey.jpg'
import IPlaylistImage from '../playlist/IPlaylistImage'

interface IMyPlaylistsTabProps {
  user: IUser
  playlists: IPlaylist[]
  playlistsEnabled: boolean
  onTrackSelected(track: ITrack): any
  savePlaylistSuggestion(suggestions: IPlaylist): any
  fetchMorePlaylists(user: IUser): Action
}

const MyPlaylistsTab = ({
  user,
  playlists,
  playlistsEnabled,
  onTrackSelected,
  savePlaylistSuggestion,
  fetchMorePlaylists
}: IMyPlaylistsTabProps) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState({} as IPlaylist)

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
        {playlists.map((playlist: IPlaylist, i: number) => {
          const playlistImage =
            playlist.images.length > 0
              ? (
                  head(sortBy(playlist.images, 'height')) ||
                  ({} as IPlaylistImage)
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
      <React.Fragment>
        <Button onClick={() => setSelectedPlaylist({} as IPlaylist)}>
          BACK TO PLAYLISTS
        </Button>
        {playlistsEnabled && (
          <Button onClick={savePlaylistSuggestion(selectedPlaylist)}>
            ADD ALL TRACKS
          </Button>
        )}
        <List>
          <TrackList
            tracks={selectedPlaylist.tracks.items.map(t => t.track)}
            onTrackSelected={onTrackSelected}
            withSuggestingEnabled={true}
          />
        </List>
      </React.Fragment>
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
