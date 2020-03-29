import React, { FC, useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import {
  Action,
  DecoratedSuggestion,
  Event,
  Track,
  User,
  TrackVoteStatus,
  TrackList,
  getPlaylistTracks,
  Vote
} from 'mm-shared'
import NoEventTracks from './NoEventTracks'
import './EventTracks.scss'

interface EventTracksProps {
  event: Event
  user: User
  votes: Map<string, TrackVoteStatus>
  suggestions: DecoratedSuggestion[]
  acceptedTracks: string[]
  createVote(vote: Vote): Action
  deleteVote(voteId: string): Action
}

const EventTracks: FC<EventTracksProps> = ({
  event,
  user,
  votes,
  suggestions,
  acceptedTracks,
  createVote,
  deleteVote
}) => {
  const playlist = event.playlist!
  const [tracks, setTracks] = useState([] as Track[])

  useEffect(() => {
    setTracks(getPlaylistTracks(playlist!))
  }, [event, playlist])

  const handleTrackVote = (track: Track) => {
    const trackId = track.uri
    const eventId = !!event ? event.eventId : ''

    if (votes && votes.has(trackId)) {
      const voteStatus = votes.get(trackId)
      if (voteStatus && voteStatus.votedByCurrentUser) {
        deleteVote(`${trackId}:${eventId}:${user.userId}`)
        return
      }
    }

    const vote = {
      eventId,
      trackId,
      userId: user.userId
    } as Vote
    createVote(vote)
  }

  if (isEmpty(tracks)) {
    return <NoEventTracks />
  }

  return (
    <div className="EventTracks-root">
      <TrackList
        isHost={false}
        event={event}
        tracks={tracks}
        showSettings={true}
        suggestions={suggestions}
        tracksToHighlight={acceptedTracks}
        votes={votes}
        options={{ showSummary: true, canVote: true }}
        onVote={handleTrackVote}
      />
    </div>
  )
}

export default EventTracks
