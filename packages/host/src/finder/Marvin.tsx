import React, { FC, useState, useEffect } from 'react'
import EventSelect from 'event/select/EventSelectContainer'
import Finder from './FinderContainer'
import {
  useSnackbarAlert,
  getPlaylistTracks,
  Playlist,
  User,
  Event,
  Track,
  arrayMove
} from 'mm-shared'
import {
  addTracksToPlaylist,
  reOrderPlaylist,
  removeTrackFromPlaylist
} from 'playlist/playlistClient'
import { isEmpty, remove } from 'lodash'

interface MarvinProps {
  user: User
  event: Event
}

const Marvin: FC<MarvinProps> = ({ event, user }) => {
  const { showSuccess, showError } = useSnackbarAlert()
  const playlist = event.playlist!
  const [tracks, setTracks] = useState([] as Track[])

  useEffect(() => {
    console.log('rrrrrrrrrr')
    setTracks(getPlaylistTracks(playlist!))
  }, [event, playlist])

  const handleAddTrack = async (track: Track) => {
    try {
      setTracks([...tracks, track])
      await addTracksToPlaylist(playlist.id, [track.uri])
      showSuccess('Track Added')
    } catch (err) {
      console.error(err)
      showError('Failed to add track')
    }
  }

  const handleAddTracks = (tracksToAdd: Track[]) => {
    const oldTracks = [...tracks]
    try {
      setTracks([...tracks, ...tracksToAdd])
      addTracksToPlaylist(
        playlist.id,
        tracks.map(track => track.uri)
      )
      showSuccess('Tracks Added')
    } catch (err) {
      setTracks(oldTracks)
      console.error(err)
      showError('Failed to add track')
    }
  }

  const handlePlaylistSelected = (playlist: Playlist) => {
    handleAddTracks(playlist.tracks.items.map(item => item.track))
  }

  const handleTrackMoved = (from: number, to: number) => {
    const oldTracks = [...tracks]
    try {
      let reorderedTracks = [...tracks]
      arrayMove(reorderedTracks, from, to)
      setTracks(reorderedTracks)
      reOrderPlaylist(playlist, from, to)
    } catch (err) {
      setTracks(oldTracks)
      showError('Error moving track')
    }
  }

  const handleTrackRemoved = (trackToRemove: Track) => {
    const oldTracks = [...tracks]
    try {
      setTracks(remove(tracks, (track: Track) => track.id !== trackToRemove.id))
      const position = tracks.indexOf(trackToRemove)
      removeTrackFromPlaylist(playlist.id, trackToRemove.uri, position)
      showSuccess('Track removed')
    } catch (err) {
      setTracks(oldTracks)
      showError('Error removing track')
    }
  }

  return (
    <div>
      <EventSelect />
      {!isEmpty(playlist) && (
        <Finder
          isHost={true}
          eventTracks={tracks}
          onTrackSelected={handleAddTrack}
          onPlaylistSelected={handlePlaylistSelected}
          onTrackRemoved={handleTrackRemoved}
          onTrackMoved={handleTrackMoved}
        />
      )}
    </div>
  )
}
export default Marvin
