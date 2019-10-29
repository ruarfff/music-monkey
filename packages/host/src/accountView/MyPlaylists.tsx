import React from 'react'
import IEvent from 'event/IEvent'
import PlaylistCard from 'catalogue/PlaylistCard'

interface IMyPlaylistsProps {
  events: IEvent[]
}

const MyPlaylists = ({ events }: IMyPlaylistsProps) => (
  <>
    {events.map(
      (event: IEvent) =>
        event.playlist &&
        event.eventId && (
          <PlaylistCard
            key={event.eventId}
            eventId={event.eventId}
            playlist={event.playlist}
          />
        )
    )}
  </>
)

export default MyPlaylists
