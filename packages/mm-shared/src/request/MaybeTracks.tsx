import React, { FC } from 'react'
import { isEmpty, uniqBy } from 'lodash'
import { Event, User, DecoratedSuggestion, TrackList } from 'mm-shared'
import { Typography } from '@material-ui/core'
import './MaybeTracks.scss'

interface MaybeTracksProps {
  isHost?: boolean
  user: User
  event: Event
  suggestions: DecoratedSuggestion[]
}

const MaybeTracks: FC<MaybeTracksProps> = ({
  user,
  suggestions,
  event,
  isHost = false
}) => {
  const playlistTracks =
    !isEmpty(event) && !isEmpty(event.playlist)
      ? event.playlist!.tracks.items.map(track => track.track.uri)
      : []
  let maybeSuggestions =
    !isEmpty(suggestions) && (isHost || !isEmpty(user))
      ? suggestions
          .filter(
            s =>
              s.suggestion && !s.suggestion.rejected && !s.suggestion.accepted
          )
          .filter(
            suggestion => playlistTracks.indexOf(suggestion.track.uri) === -1
          )
      : []

  if (!isHost) {
    maybeSuggestions = maybeSuggestions.filter(
      s => s.suggestion.userId === user.userId
    )
  }
  const maybeTracks = uniqBy(
    maybeSuggestions.map(s => s.track),
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
