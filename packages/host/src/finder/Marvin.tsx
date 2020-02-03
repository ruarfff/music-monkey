import React, { FC } from 'react'
import EventSelect from 'event/select/EventSelectContainer'
import Finder from './FinderContainer'
import {
  useSnackbarAlert,
  getPlaylistTracks,
  Playlist,
  User,
  Event,
  Track
} from 'mm-shared'

interface MarvinProps {
  user: User
  event: Event
}

const Marvin: FC<MarvinProps> = ({ event, user }) => {
  const { showSuccess } = useSnackbarAlert()
  const onTrackSelected = (track: Track) => {
    showSuccess('Track added (not really yet)')
  }

  const onPlaylistSelected = (playlist: Playlist) => () => {
    showSuccess('Playlist added (not really yet)')
  }

  const onTrackMoved = () => {
    showSuccess('Track moved (not really yet)')
  }

  const onTrackRemoved = () => {
    showSuccess('Track removed (not really yet)')
  }

  const tracks = getPlaylistTracks(event.playlist!)

  return (
    <div>
      <EventSelect />
      <Finder
        isHost={true}
        eventTracks={tracks}
        onPlaylistSelected={onPlaylistSelected}
        onTrackSelected={onTrackSelected}
        onTrackMoved={onTrackMoved}
        onTrackRemoved={onTrackRemoved}
      />
    </div>
  )
}
export default Marvin
