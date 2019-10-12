import React from 'react'
import IEvent from 'event/IEvent'
import PlaylistCard from 'event/playlistsView/PlaylistCard'

interface IMyPlaylistsProps {
  events: IEvent[]
}

const MyPlaylists = ({ events }: IMyPlaylistsProps) => (
  <>
    {events.map(
      (event: IEvent, key) =>
        event.playlist &&
        event.eventId && (
          <PlaylistCard
            eventId={event.eventId}
            playlist={event.playlist}
            key={key}
          />
        )
    )}
  </>
)

export default MyPlaylists
