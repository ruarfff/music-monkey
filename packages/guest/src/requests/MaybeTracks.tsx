import React from 'react'
import List from '@material-ui/core/List/List'
import ListItem from '@material-ui/core/ListItem/ListItem'
import { isEmpty, uniqBy } from 'lodash'
import IDecoratedSuggestion from './IDecoratedSuggestion'
import TrackList from 'track/TrackList'
import { Event, User } from 'mm-shared'
import './MaybeTracks.scss'

interface IMaybeTracksProps {
  user: User
  event: Event
  suggestions: IDecoratedSuggestion[]
}

const MaybeTracks = ({ user, suggestions, event }: IMaybeTracksProps) => {
  const maybeSuggestions =
    !isEmpty(suggestions) && !isEmpty(user)
      ? suggestions
          .filter(s => s.suggestion.userId === user.userId)
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
          <span className="noTracks">No suggestions yet</span>
        </ListItem>
      )}
    </List>
  )
}

export default MaybeTracks
