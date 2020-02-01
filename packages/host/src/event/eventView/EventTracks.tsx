import React, { FC } from 'react'
import { isEmpty } from 'lodash'
import {
  Event,
  TrackVoteStatus,
  DecoratedSuggestion,
  TrackList
} from 'mm-shared'
import './EventTracks.scss'

interface EventTracksProps {
  event: Event
  votes: Map<string, TrackVoteStatus>
  suggestions: DecoratedSuggestion[]
}

const EventTracks: FC<EventTracksProps> = ({ event, votes, suggestions }) => (
  <div className="EventTracks-root">
    {!isEmpty(event.playlist) && (
      <TrackList
        event={event}
        tracks={event.playlist!.tracks.items.map(item => item.track)}
        suggestions={suggestions}
        votes={votes}
      />
    )}
  </div>
)

export default EventTracks
