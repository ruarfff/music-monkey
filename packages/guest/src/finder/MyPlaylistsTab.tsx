import { Button, List, Typography } from '@material-ui/core'
import { isEmpty } from 'lodash'
import IEvent from '../event/IEvent'
import IAction from '../IAction'
import PlaylistsSimpleList from '../playlist/components/PlaylistsSimpleList'
import IPlaylist from '../playlist/IPlaylist'
import ITrack from '../track/ITrack'
import TrackList from '../track/TrackList'
import IUser from '../user/IUser'

const React = require('react')

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
}: IMyPlaylistsTabProps) => {

  React.useEffect(() => {
    if (!isEmpty(selectedUserPlaylist)) {
      deselectPlaylist()
    }
  }, [])

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

  const deselectPlaylist = () => {
    selectPlaylist({} as IPlaylist)
  }

  const renderListOfTracks = () => {
    return (
      <React.Fragment>
        <Button
          onClick={deselectPlaylist}
        >
          BACK TO PLAYLISTS
        </Button>
        <Button
          onClick={savePlaylistSuggestion(selectedUserPlaylist)}
        >
          ADD ALL TRACKS
        </Button>
        <List>
          <TrackList
            tracks={selectedUserPlaylist.tracks.items.map((t) => t.track)}
            onTrackSelected={onTrackSelected}
            withSuggestingEnabled={true}
          />
        </List>
      </React.Fragment>
    )
  }

  return (
    <Typography component="div" dir="1">
      {isEmpty(selectedUserPlaylist) ?
        renderPlaylistSimpleList() :
        renderListOfTracks()}
      <div className="Finder-stopper-block" />
    </Typography>
  )
}

export default MyPlaylistsTab
