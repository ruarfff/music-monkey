import React, { FC } from 'react'
import EventSelect from 'event/select/EventSelectContainer'
import Finder from './FinderContainer'
import { useSnackbarAlert, Playlist, User, Event, Track } from 'mm-shared'

interface MarvinProps {
  user: User
  event: Event
}

const Marvin: FC<MarvinProps> = ({ event, user }) => {
  const { showSuccess } = useSnackbarAlert()
  const onTrackSelected = (track: Track) => {
    showSuccess('Track requested')
  }

  const onPlaylistSelected = (playlist: Playlist) => () => {
    showSuccess('Playlist requested')
  }

  return (
    <div>
      <EventSelect />
      <Finder
        onPlaylistSelected={onPlaylistSelected}
        onTrackSelected={onTrackSelected}
      />
    </div>
  )
}
export default Marvin
