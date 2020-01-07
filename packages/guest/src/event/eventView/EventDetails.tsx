import React, { FunctionComponent } from 'react'
import { isEmpty } from 'lodash'
import { Action, Event, Track, User, TrackVoteStatus, Vote } from 'mm-shared'
import TrackList from 'track/TrackList'
import IDecoratedSuggestion from 'requests/IDecoratedSuggestion'
import './EventDetails.scss'

interface IEventDetailsProps {
  event: Event
  user: User
  votes: Map<string, TrackVoteStatus>
  suggestions: IDecoratedSuggestion[]
  createVote(vote: Vote): Action
  deleteVote(voteId: string): Action
}

const EventDetails: FunctionComponent<IEventDetailsProps> = ({
  event,
  user,
  votes,
  suggestions,
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

  return (
    <div className="EventDetails-root">
      {!isEmpty(event.playlist) && (
        <TrackList
          event={event}
          tracks={event.playlist!.tracks.items.map(item => item.track)}
          suggestions={suggestions}
          withVoting={true}
          votes={votes}
          onVote={handleTrackVote}
        />
      )}
    </div>
  )
}

export default EventDetails
