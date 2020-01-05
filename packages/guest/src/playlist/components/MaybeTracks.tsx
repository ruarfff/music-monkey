import React from 'react'
import List from '@material-ui/core/List/List'
import ListItem from '@material-ui/core/ListItem/ListItem'
import { isEmpty, uniqBy } from 'lodash'
import { Event } from 'mm-shared'
import IDecoratedSuggestion from 'requests/IDecoratedSuggestion'
import TrackList from 'track/TrackList'
import './MaybeTracks.scss'

interface IMaybeTracksProps {
  suggestions: IDecoratedSuggestion[]
  event: Event
}

const MaybeTracks = ({ suggestions, event }: IMaybeTracksProps) => {
  const maybeSuggestions =
    !isEmpty(suggestions) && !isEmpty(event)
      ? suggestions
          .filter(s => s.suggestion.eventId === event.eventId)
          .filter(
            s =>
              s.suggestion && !s.suggestion.rejected && !s.suggestion.accepted
          )
      : []

  const playlistTracks =
    !isEmpty(event) && !isEmpty(event.playlist)
      ? event.playlist!.tracks.items.map(track => track.track.uri)
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
