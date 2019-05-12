import { Button, List, Typography } from '@material-ui/core'
import { isEmpty } from 'lodash'
import IEvent from '../event/IEvent'
import IAction from '../IAction'
import PlaylistsSimpleList from '../playlist/components/PlaylistsSimpleList'
import IPlaylist from '../playlist/IPlaylist'
import ITrack from '../track/ITrack'
import TrackList from '../track/TrackList'
import IUser from '../user/IUser'
import React, { useEffect } from 'react'

interface IMyPlaylistsTabProps {
  user: IUser
  selectedEvent: IEvent
  playlists: IPlaylist[]
  attached: boolean
  selectedUserPlaylist: IPlaylist
  selectPlaylist(playlist: IPlaylist): IAction
  addedPlaylist?(value: IPlaylist): any
  onTrackSelected(track: ITrack): any
  savePlaylistSuggestion(suggestions: IPlaylist): any
  fetchMorePlaylists(user: IUser): IAction
}

const MyPlaylistsTab = ({
  selectedUserPlaylist,
  selectedEvent,
  user,
  playlists,
  selectPlaylist,
  addedPlaylist,
  onTrackSelected,
  savePlaylistSuggestion,
  fetchMorePlaylists
}: IMyPlaylistsTabProps) => {
  const handleFetchMorePlaylists = () => {
    fetchMorePlaylists(user)
  }

  useEffect(() => {
    if (!isEmpty(selectedUserPlaylist)) {
      selectPlaylist({} as IPlaylist)
    }
  }, [selectPlaylist, selectedUserPlaylist])

  useEffect(() => {
    const trackScrolling = () => {
      if (
        document.body.offsetHeight ===
        window.pageYOffset + window.innerHeight
      ) {
        handleFetchMorePlaylists()
      }
    }

    document.addEventListener('scroll', trackScrolling)

    return function cleanup() {
      document.removeEventListener('scroll', trackScrolling)
    }
  })

  const renderPlaylistSimpleList = () => {
    return (
      <PlaylistsSimpleList
        playlists={playlists}
        selectPlaylist={selectPlaylist}
        attached={true}
        addedPlaylist={addedPlaylist}
        disableLinks={true}
      />
    )
  }

  const renderListOfTracks = () => {
    return (
      <React.Fragment>
        <Button onClick={() => selectPlaylist({} as IPlaylist)}>
          BACK TO PLAYLISTS
        </Button>
        <Button onClick={savePlaylistSuggestion(selectedUserPlaylist)}>
          ADD ALL TRACKS
        </Button>
        <List>
          <TrackList
            tracks={selectedUserPlaylist.tracks.items.map(t => t.track)}
            onTrackSelected={onTrackSelected}
            withSuggestingEnabled={true}
          />
        </List>
      </React.Fragment>
    )
  }

  return (
    <Typography component="div" dir="1">
      {isEmpty(selectedUserPlaylist)
        ? renderPlaylistSimpleList()
        : renderListOfTracks()}
      <div className="Finder-stopper-block" />
    </Typography>
  )
}

export default MyPlaylistsTab
