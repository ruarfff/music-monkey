import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { isEmpty } from 'lodash'
import IDecoratedSuggestion from 'suggestion/IDecoratedSuggestion'
import SuggestionList from 'suggestion/SuggestionList'
import IUser from 'user/IUser'
import IEvent from 'event/IEvent'
import IPlaylistItem from 'playlist/IPlaylistItem'
import './MaybeTracks.scss'

interface IMaybeTracksProps {
  user: IUser
  selectedEvent: IEvent
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
          (track: IPlaylistItem) => track.track.uri
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
