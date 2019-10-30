import React from 'react'
import IPlaylist from 'playlist/IPlaylist'
import formatDuration from 'util/formatDuration'
import CatalogueCard from './CatalogueCard'
import getPlaylistImage from 'playlist/getPlaylistImage'
import getPlaylistDuration from 'playlist/getPlaylistDuration'

interface PlaylistCardProps {
  eventId: string
  playlist: IPlaylist
}

const PlaylistCard = ({ playlist, eventId }: PlaylistCardProps) => {
  const durationSeconds = getPlaylistDuration(playlist)

  const imageUrl = getPlaylistImage(playlist)

  const descriptionLines = [
    {
      text: playlist.tracks.total + ' Tracks'
    },
    {
      text: formatDuration(durationSeconds)
    }
  ]

  const cardActions = [
    {
      link: playlist.external_urls.spotify,
      text: 'GO TO PLAYLIST',
      isHref: true
    }
    // { link: '/events/' + eventId + '/edit', text: 'EDIT EVENT' }
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
