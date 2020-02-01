import React, { FC } from 'react'
import { isEmpty, uniqBy } from 'lodash'
import { Event, DecoratedSuggestion, TrackList } from 'mm-shared'
import { Typography } from '@material-ui/core'
import './MaybeTracks.scss'

interface MaybeTracksProps {
  suggestions: DecoratedSuggestion[]
  event: Event
}

const MaybeTracks: FC<MaybeTracksProps> = ({ suggestions, event }) => {
  const maybeSuggestions =
    !isEmpty(suggestions) && !isEmpty(event)
      ? suggestions
          .filter(s => s.suggestion.eventId === event.eventId)
          .filter(
            s =>
              s.suggestion && !s.suggestion.rejected && !s.suggestion.accepted
          )
      : []

  const playlistTracks =
    !isEmpty(event) && !isEmpty(event.playlist)
      ? event.playlist!.tracks.items.map(track => track.track.uri)
      : []

  const maybeTracks = uniqBy(
    maybeSuggestions
      .map(s => s.track)
      .filter(track => playlistTracks.indexOf(track.uri) === -1),
    'id'
  )

  return (
    <>
      {!isEmpty(maybeTracks) && (
        <TrackList tracks={maybeTracks} suggestions={maybeSuggestions} />
      )}
      {isEmpty(maybeTracks) && (
        <Typography className="noTracks" variant="h6" gutterBottom>
          No pending suggestions
        </Typography>
      )}
    </>
  )
}

export default MaybeTracks
