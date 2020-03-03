import React, { FunctionComponent } from 'react'
import { isEmpty } from 'lodash'
import {
  Action,
  DecoratedSuggestion,
  Event,
  Track,
  User,
  TrackVoteStatus,
  TrackList,
  Vote
} from 'mm-shared'
import NoEventTracks from './NoEventTracks'
import './EventTracks.scss'

interface IEventTracksProps {
  event: Event
  user: User
  votes: Map<string, TrackVoteStatus>
  suggestions: DecoratedSuggestion[]
  acceptedTracks: string[]
  createVote(vote: Vote): Action
  deleteVote(voteId: string): Action
}

const EventTracks: FunctionComponent<IEventTracksProps> = ({
  event,
  user,
  votes,
  suggestions,
  acceptedTracks,
  createVote,
  deleteVote
}) => {
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

  if (isEmpty(event.playlist) || isEmpty(event.playlist!.tracks.items)) {
    return <NoEventTracks />
  }

  return (
    <div className="EventTracks-root">
      <TrackList
        isHost={false}
        event={event}
        showSettings={true}
        tracks={event.playlist!.tracks.items.map(item => item.track)}
        suggestions={suggestions}
        options={{ showSummary: true, canVote: true }}
        tracksToHighlight={acceptedTracks}
        votes={votes}
        onVote={handleTrackVote}
      />
    </div>
  )
}

export default EventTracks
