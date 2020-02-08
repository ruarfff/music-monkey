import React, { FC } from 'react'
import { Typography } from '@material-ui/core'
import { isEmpty, uniqBy } from 'lodash'
import { Event, User, DecoratedSuggestion, TrackList, Suggestion } from '../'
import './MaybeTracks.scss'

interface MaybeTracksProps {
  isHost: boolean
  user: User
  event: Event
  requests: DecoratedSuggestion[]
  onAccept(suggestion: Suggestion): void
  onReject(suggestion: Suggestion): void
}

const MaybeTracks: FC<MaybeTracksProps> = ({
  user,
  requests,
  event,
  isHost,
  onAccept,
  onReject
}) => {
  const playlistTracks =
    !isEmpty(event) && !isEmpty(event.playlist)
      ? event.playlist!.tracks.items.map(track => track.track.uri)
      : []
  let maybeSuggestions =
    !isEmpty(requests) && (isHost || !isEmpty(user))
      ? requests
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
        <TrackList
          tracks={maybeTracks}
          suggestions={maybeSuggestions}
          options={{ canRequest: isHost, canRemove: isHost }}
          onAccept={onAccept}
          onReject={onReject}
        />
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
