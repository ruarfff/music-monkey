import React, { useState } from 'react'
import _ from 'lodash'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import EventSearchTracks from '../components/SearchTracks/EventSearchTracksContainer'
import PlaylistSelection from './PlaylistSelection'
import IUser from '../user/IUser'
import IPlaylist from '../playlist/IPlaylist'
import IAction from '../IAction'
import IEvent from '../event/IEvent'
import EventInput from '../components/EventInput/EventInput'
import GenrePicker from '../components/GenrePicker/GenrePicker'
import { Typography } from '@material-ui/core'

interface CreateEventPlaylistProps {
  event: IEvent
  isEditing: boolean
  user: IUser
  playlists: IPlaylist[]
  fetchPlaylists(user: IUser): IAction
  getMoreUsersPlaylists(user: IUser, offset: number): void
  onPlaylistDragDrop(
    playlist: IPlaylist,
    fromIndex: number,
    toIndex: number
  ): IAction
  tryRemoveTrack(playlistId: string, uri: string, position: number): IAction
  showConfirmationDialog: () => void
  handleCancel: () => void
  handleSaveEvent: (event: IEvent) => void
}

const CreateEventPlaylist = ({
  event,
  isEditing,
  user,
  playlists,
  onPlaylistDragDrop,
  tryRemoveTrack,
  getMoreUsersPlaylists,
  fetchPlaylists,
  showConfirmationDialog,
  handleCancel,
  handleSaveEvent
}: CreateEventPlaylistProps) => {
  const currentEvent = event || ({} as IEvent)
  const [name, setName] = useState(currentEvent.name || '')
  const [description, setDescription] = useState(currentEvent.description || '')
  const [genre, setGenre] = useState(currentEvent.genre || 'Alternative Music')
  const [playlist, setPlaylist] = useState(currentEvent.playlist)

  return (
    <Grid container={true} spacing={24} direction="row">
      <div className="control-btn-row">
        <Typography align="left" variant="h4" component="h4">
          Add or pick a playlist
        </Typography>

        {isEditing && (
          <Button
            className="control-btn"
            variant="contained"
            onClick={showConfirmationDialog}
          >
            <span className="control-btn-text-primary">Delete Event</span>
          </Button>
        )}
        <Button
          className="control-btn"
          variant="contained"
          onClick={handleCancel}
        >
          <span className="control-btn-text-primary">Cancel</span>
        </Button>
        <Button
          className="control-btn"
          onClick={() => {
            handleSaveEvent({
              ...currentEvent,
              name,
              description,
              playlist
            })
          }}
          color="secondary"
          variant="contained"
        >
          <span className="control-btn-text-secondary">
            {!event.eventId ? 'Create Event' : 'Next'}
          </span>
        </Button>
      </div>
      <Grid item={true} xs={12} sm={6}>
        <Grid container={true} spacing={24} alignItems="flex-end">
          <Grid item={true} md={12}>
            <EventInput
              onChange={setName}
              value={name}
              error={!name}
              autoFocus={true}
              errorLabel={'Enter playlist name'}
              placeholder={'Playlist Name'}
              label={'Set Playlist Name'}
            />

            <EventInput
              onChange={setDescription}
              value={description}
              placeholder={'Playlist Description'}
              label={'Set Playlist Description'}
            />

            <GenrePicker
              value={genre}
              onChange={(genre: string) => {
                setGenre(genre)
              }}
            />
          </Grid>
          <Grid item={true} md={12}>
            <PlaylistSelection
              playlistName={name}
              playlistDescription={description}
              onPlaylistDragDrop={onPlaylistDragDrop}
              onPlaylistSelected={(playlist: IPlaylist) => {
                setPlaylist(playlist)
              }}
              tryRemoveTrack={tryRemoveTrack}
              selectedPlaylist={playlist}
              playlists={playlists}
              fetchPlaylists={fetchPlaylists}
              deselectPlaylist={() => {
                setPlaylist({} as IPlaylist)
              }}
              user={user}
              getMoreUsersPlaylists={getMoreUsersPlaylists}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item={true} xs={12} sm={6}>
        {!_.isEmpty(playlist) && (
          <div>
            <span>Add tracks to playlist</span>
            <EventSearchTracks playlist={playlist} layout={'column'} />
          </div>
        )}
      </Grid>
    </Grid>
  )
}

export default CreateEventPlaylist
