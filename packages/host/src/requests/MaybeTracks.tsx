import List from '@material-ui/core/List/List'
import ListItem from '@material-ui/core/ListItem/ListItem'
import { isEmpty, uniqBy } from 'lodash'
import React from 'react'
import IDecoratedSuggestion from '../suggestion/IDecoratedSuggestion'
import TrackList from '../track/TrackList'
import IUser from '../user/IUser'
import './MaybeTracks.scss'
import IEvent from '../event/IEvent'

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
  const maybeSuggestions =
    !isEmpty(suggestions) && !isEmpty(user)
      ? suggestions.filter(
          s => s.suggestion && !s.suggestion.rejected && !s.suggestion.accepted
        )
      : []
  const playlistTracks =
    !isEmpty(selectedEvent) && !isEmpty(selectedEvent.playlist)
      ? selectedEvent!.playlist!.tracks.items.map(track => track.track.uri)
      : []
  const maybeTracks = uniqBy(
    maybeSuggestions
      .map(s => s.track)
      .filter(track => playlistTracks.indexOf(track.uri) === -1),
    'id'
  )

  return (
    <List>
      {!isEmpty(maybeTracks) && (
        <TrackList tracks={maybeTracks} disableRemoveTrack={true} />
      )}
      {isEmpty(maybeTracks) && (
        <ListItem>
          <span className="noTracks">No suggestions yet</span>
        </ListItem>
      )}
    </List>
  )
}

export default MaybeTracks
