import React, { FC } from 'react'
import { isEmpty, uniqBy } from 'lodash'
import { Event, User, DecoratedSuggestion, TrackList, Suggestion } from '../'
import NoMaybeTracks from './NoMaybeTracks'
import './MaybeTracks.scss'

interface MaybeTracksProps {
  isHost: boolean
  user: User
  event: Event
  requests: DecoratedSuggestion[]
  showAll?: boolean
  newRequests?: string[]
  onAccept?(suggestion: Suggestion): void
  onReject?(suggestion: Suggestion): void
}

const MaybeTracks: FC<MaybeTracksProps> = ({
  user,
  requests,
  event,
  isHost,
  showAll,
  newRequests = [],
  onAccept = () => {},
  onReject = () => {}
}) => {
  const playlistTracks =
    !isEmpty(event) && !isEmpty(event.playlist)
      ? event.playlist!.tracks.items.map((track) => track.track.uri)
      : []
  let maybeSuggestions =
    !isEmpty(requests) && (isHost || !isEmpty(user))
      ? requests.filter(
          (suggestion) => playlistTracks.indexOf(suggestion.track.uri) === -1
        )
      : []

  if (!isHost && !showAll) {
    maybeSuggestions = maybeSuggestions.filter(
      (s) => s.suggestion.userId === user.userId
    )
  }
  const maybeTracks = uniqBy(
    maybeSuggestions.map((s) => s.track),
    'id'
  )

  if (isEmpty(maybeTracks)) {
    return <NoMaybeTracks isHost={isHost} />
  }
  return (
    <TrackList
      isHost={isHost}
      tracks={maybeTracks}
      suggestions={maybeSuggestions}
      options={{ canRequest: isHost, canRemove: isHost }}
      tracksToHighlight={newRequests}
      onAccept={onAccept}
      onReject={onReject}
    />
  )
}

export default MaybeTracks
