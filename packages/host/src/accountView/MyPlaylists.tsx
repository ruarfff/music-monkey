import React from 'react'
import { Event } from 'mm-shared'
import PlaylistCard from 'catalogue/PlaylistCard'

interface IMyPlaylistsProps {
  events: Event[]
}

const MyPlaylists = ({ events }: IMyPlaylistsProps) => (
  <>
    {events.map(
      (event: Event) =>
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
