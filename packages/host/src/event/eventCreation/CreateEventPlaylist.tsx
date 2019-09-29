import React from 'react'
import _ from 'lodash'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IAction from 'IAction'
import EventSearchTracks from 'components/SearchTracks/EventSearchTracksContainer'
import IUser from 'user/IUser'
import IPlaylist from 'playlist/IPlaylist'
import ISearch from 'playlist/ISearch'
import IEvent from 'event/IEvent'
import PlaylistSelection from './PlaylistSelection'

interface CreateEventPlaylistProps {
  event: IEvent
  isEditing: boolean
  user: IUser
  playlists: IPlaylist[]
  isCreatingPlaylist: boolean
  searchResult: ISearch
  selectedPlaylist: IPlaylist
  deselectPlaylist(): IAction
  createEventPlaylist(playlistDetails: any): any
  fetchPlaylists(user: IUser): IAction
  getMoreUsersPlaylists(user: IUser, offset: number): void
  onPlaylistDragDrop(
    playlist: IPlaylist,
    fromIndex: number,
    toIndex: number
  ): IAction
  tryRemoveTrack(playlistId: string, uri: string, position: number): IAction
  handleEventName(name: string): any
  onPlaylistAdded(playlistUrl: string): any
  handlePickGenre(content: string): void
  setEventPlaylist(playlist: IPlaylist): void
  showConfirmationDialog: () => void
  handleCancel: () => void
  handleSaveEvent: () => void
}

const CreateEventPlaylist = ({
  event,
  isEditing,
  user,
  playlists,
  isCreatingPlaylist,
  createEventPlaylist,
  searchResult,
  selectedPlaylist,
  deselectPlaylist,
  onPlaylistDragDrop,
  tryRemoveTrack,
  getMoreUsersPlaylists,
  fetchPlaylists,
  showConfirmationDialog,
  handleCancel,
  handleSaveEvent,
  handleEventName,
  onPlaylistAdded,
  handlePickGenre,
  setEventPlaylist
}: CreateEventPlaylistProps) => {
  return (
    <Grid container={true} spacing={3} direction="row">
      <div className="control-btn-row">
        {isEditing && (
          <Button variant="contained" onClick={showConfirmationDialog}>
            <span className="control-btn-text-primary">Delete Event</span>
          </Button>
        )}
        <Button variant="contained" onClick={handleCancel}>
          <span className="control-btn-text-primary">Cancel</span>
        </Button>
        <Button onClick={handleSaveEvent} color="secondary" variant="contained">
          <span className="control-btn-text-secondary">
            {!event.eventId ? 'Create Event' : 'Next'}
          </span>
        </Button>
      </div>
      <Grid item={true} xs={12} sm={6}>
        <PlaylistSelection
          onPlaylistDragDrop={onPlaylistDragDrop}
          tryRemoveTrack={tryRemoveTrack}
          selectedPlaylist={selectedPlaylist}
          searchResult={searchResult}
          playlists={playlists}
          fetchPlaylists={fetchPlaylists}
          deselectPlaylist={deselectPlaylist}
          user={user}
          getMoreUsersPlaylists={getMoreUsersPlaylists}
          createEventPlaylist={createEventPlaylist}
          isCreatingPlaylist={isCreatingPlaylist}
          handleEventName={handleEventName}
          onPlaylistAdded={onPlaylistAdded}
          handlePickGenre={handlePickGenre}
          setEventPlaylist={setEventPlaylist}
        />
      </Grid>
      <Grid item={true} xs={12} sm={6}>
        {!_.isEmpty(selectedPlaylist) && (
          <div>
            <span>Add tracks to playlist</span>
            <EventSearchTracks playlist={selectedPlaylist} layout={'column'} />
          </div>
        )}
      </Grid>
    </Grid>
  )
}

export default CreateEventPlaylist
