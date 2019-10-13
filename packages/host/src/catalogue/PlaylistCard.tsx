import React from 'react'
import IPlaylist from 'playlist/IPlaylist'
import formatDuration from 'util/formatDuration'
import CatalogueCard from './CatalogueCard'

interface PlaylistCardProps {
  eventId: string
  playlist: IPlaylist
}

const PlaylistCard = ({ playlist, eventId }: PlaylistCardProps) => {
  const durationSeconds =
    playlist.tracks.items.length > 0
      ? playlist.tracks.items
          .map(item => item.track.duration_ms)
          .reduce((acc, dur) => acc + dur)
      : 0

  const imageUrl =
    playlist.images && playlist.images.length
      ? playlist.images[0].url
      : '/img/partycover-sm.png'

  const descriptionLines = [
    {
      text: playlist.tracks.total + ' Tracks'
    },
    {
      text: formatDuration(durationSeconds)
    }
  ]

  const cardActions = [
    { link: '/events/' + eventId + '/edit', text: 'EDIT EVENT' }
  ]
  return (
    <CatalogueCard
      key={playlist.id}
      link={`/events/${eventId}`}
      imageUrl={imageUrl}
      title={playlist.name}
      descriptionLines={descriptionLines}
      cardActions={cardActions}
    />
  )
}

export default PlaylistCard
