import React from 'react'
import List from '@material-ui/core/List/List'
import ListItem from '@material-ui/core/ListItem/ListItem'
import { isEmpty, uniqBy } from 'lodash'
import { Event } from 'mm-shared'
import IDecoratedSuggestion from 'suggestion/IDecoratedSuggestion'
import TrackList from 'track/TrackList'
import './MaybeTracks.scss'

interface IMaybeTracksProps {
  suggestions: IDecoratedSuggestion[]
  selectedEvent: Event
}

const MaybeTracks = ({ suggestions, selectedEvent }: IMaybeTracksProps) => {
  const maybeSuggestions =
    !isEmpty(suggestions) && !isEmpty(selectedEvent)
      ? suggestions
          .filter(s => s.suggestion.eventId === selectedEvent.eventId)
          .filter(
            s =>
              s.suggestion && !s.suggestion.rejected && !s.suggestion.accepted
          )
      : []

  const playlistTracks =
    !isEmpty(selectedEvent) && !isEmpty(selectedEvent.playlist)
      ? selectedEvent.playlist!.tracks.items.map(track => track.track.uri)
      : []

  const maybeTracks = uniqBy(
    maybeSuggestions
      .map(s => s.track)
      .filter(track => playlistTracks.indexOf(track.uri) === -1),
    'id'
  )

  return (
    <List>
      {!isEmpty(maybeTracks) && <TrackList tracks={maybeTracks} />}
      {isEmpty(maybeTracks) && (
        <ListItem>
          <span className="noTracks">No pending suggestions</span>
        </ListItem>
      )}
    </List>
  )
}

export default MaybeTracks
