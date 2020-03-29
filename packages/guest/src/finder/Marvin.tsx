import React, { FC } from 'react'
import isEmpty from 'lodash/isEmpty'
import EventSelect from 'event/select/EventSelectContainer'
import Finder from './FinderContainer'
import {
  useSnackbarAlert,
  TrackRequest,
  PlaylistRequest,
  Playlist,
  User,
  Event,
  Track,
  getPlaylistTracks,
  MarvinLoader
} from 'mm-shared'

interface MarvinProps {
  user: User
  event: Event
  saveTrackRequest(request: TrackRequest): any
  savePlaylistRequest(request: PlaylistRequest): any
}

const Marvin: FC<MarvinProps> = ({
  event,
  user,
  saveTrackRequest,
  savePlaylistRequest
}) => {
  const { showSuccess } = useSnackbarAlert()
  const onTrackSelected = (track: Track) => {
    saveTrackRequest({
      eventId: event.eventId,
      userId: user.userId,
      type: 'track',
      trackUri: track.uri
    } as TrackRequest)
    showSuccess('Track requested')
  }

  const onPlaylistSelected = (playlist: Playlist) => {
    savePlaylistRequest({
      eventId: event.eventId,
      userId: user.userId,
      playlistUri: playlist.uri,
      trackUris: playlist.tracks.items.map(t => t.track.uri)
    } as PlaylistRequest)
    showSuccess('Playlist requested')
  }

  const tracks = getPlaylistTracks(event.playlist!)

  return (
    <div>
      <EventSelect />
      {!isEmpty(event) ? (
        <Finder
          eventTracks={tracks}
          allowSuggestPlaylist={event.settings.suggestingPlaylistsEnabled}
          onPlaylistSelected={onPlaylistSelected}
          onTrackSelected={onTrackSelected}
        />
      ) : (
        <MarvinLoader />
      )}
    </div>
  )
}
export default Marvin
