import React, { FC } from 'react'
import { isEmpty, uniqBy } from 'lodash'
import {
  Event,
  User,
  DecoratedSuggestion,
  TrackList,
  Suggestion,
  TrackVoteStatus,
  getPlaylistTracks
} from '../'
import NoMaybeTracks from './NoMaybeTracks'
import './MaybeTracks.scss'

interface MaybeTracksProps {
  isHost: boolean
  user: User
  event: Event
  requests: DecoratedSuggestion[]
  showAll?: boolean
  newRequests?: string[]
  profileMode?: boolean
  votes?: Map<string, TrackVoteStatus>
  onAccept?(suggestion: Suggestion): void
  onReject?(suggestion: Suggestion): void
}

const MaybeTracks: FC<MaybeTracksProps> = ({
  user,
  requests,
  event,
  isHost,
  showAll,
  profileMode,
  newRequests = [],
  votes,
  onAccept = () => {},
  onReject = () => {}
}) => {
  const playlist = event.playlist
  const playlistTracks = getPlaylistTracks(playlist!).map((track) => track.uri)

  let maybeSuggestions =
    isHost || !isEmpty(user)
      ? requests.filter(
          (request) => playlistTracks.indexOf(request.track.uri) === -1
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
      options={{
        canRequest: isHost,
        canRemove: isHost,
        showProfile: isHost || profileMode,
        canVote: isHost
      }}
      votes={votes}
      tracksToHighlight={newRequests}
      onAccept={onAccept}
      onReject={onReject}
    />
  )
}

export default MaybeTracks
