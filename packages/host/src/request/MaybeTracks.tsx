import React, { FC } from 'react'
import { isEmpty, uniqBy } from 'lodash'
import { Event, DecoratedSuggestion, TrackList } from 'mm-shared'
import { Typography } from '@material-ui/core'
import './MaybeTracks.scss'

interface MaybeTracksProps {
  event: Event
  suggestions: DecoratedSuggestion[]
}

const MaybeTracks: FC<MaybeTracksProps> = ({ suggestions, event }) => {
  const playlistTracks =
    !isEmpty(event) && !isEmpty(event.playlist)
      ? event.playlist!.tracks.items.map(track => track.track.uri)
      : []
  const maybeSuggestions = !isEmpty(suggestions)
    ? suggestions
        .filter(
          s => s.suggestion && !s.suggestion.rejected && !s.suggestion.accepted
        )
        .filter(
          suggestion => playlistTracks.indexOf(suggestion.track.uri) === -1
        )
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
          No suggestions yet
        </Typography>
      )}
    </>
  )
}

export default MaybeTracks
