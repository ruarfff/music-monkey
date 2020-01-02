import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { isEmpty } from 'lodash'
import IDecoratedSuggestion from 'suggestion/IDecoratedSuggestion'
import SuggestionList from 'suggestion/SuggestionList'
import { User } from 'mm-shared'
import { Event, PlaylistItem } from 'mm-shared'
import './MaybeTracks.scss'

interface IMaybeTracksProps {
  user: User
  selectedEvent: Event
  suggestions: IDecoratedSuggestion[]
}

const MaybeTracks = ({
  user,
  suggestions,
  selectedEvent
}: IMaybeTracksProps) => {
  const playlistTracks =
    !isEmpty(selectedEvent) && !isEmpty(selectedEvent.playlist)
      ? selectedEvent!.playlist!.tracks.items.map(
          (track: PlaylistItem) => track.track.uri
        )
      : []
  const maybeSuggestions =
    !isEmpty(suggestions) && !isEmpty(user)
      ? suggestions
          .filter(
            s =>
              s.suggestion && !s.suggestion.rejected && !s.suggestion.accepted
          )
          .filter(
            suggestion => playlistTracks.indexOf(suggestion.track.uri) === -1
          )
      : []

  return (
    <List>
      {!isEmpty(maybeSuggestions) && (
        <SuggestionList
          suggestions={maybeSuggestions}
          disableRemoveTrack={true}
        />
      )}
      {isEmpty(maybeSuggestions) && (
        <ListItem>
          <span className="noTracks">No suggestions yet</span>
        </ListItem>
      )}
    </List>
  )
}

export default MaybeTracks