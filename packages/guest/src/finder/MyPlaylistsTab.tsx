import { Typography } from '@material-ui/core'
import IAction from '../IAction'
//import PlaylistListView from '../playlist/components/PlaylistListView'
import IPlaylist from '../playlist/IPlaylist'
import ITrack from '../track/ITrack'
import IUser from '../user/IUser'
import React, { useEffect } from 'react'

interface IMyPlaylistsTabProps {
  user: IUser
  playlists: IPlaylist[]
  attached: boolean
  selectedUserPlaylist: IPlaylist
  onTrackSelected(track: ITrack): any
  savePlaylistSuggestion(suggestions: IPlaylist): any
  fetchMorePlaylists(user: IUser): IAction
}

const MyPlaylistsTab = ({
  selectedUserPlaylist,
  user,
  playlists,
  onTrackSelected,
  savePlaylistSuggestion,
  fetchMorePlaylists
}: IMyPlaylistsTabProps) => {
  const handleFetchMorePlaylists = () => {
    fetchMorePlaylists(user)
  }

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

  /**
  const renderPlaylistSimpleList = () => {
    return (
      <PlaylistListView
        events={[]}
        attached={true}
        disableLinks={true}
      />
    )
  }
  /**
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
  } */

  return (
    <Typography component="div" dir="1">
      <div className="Finder-stopper-block" />
    </Typography>
  )
}

export default MyPlaylistsTab
