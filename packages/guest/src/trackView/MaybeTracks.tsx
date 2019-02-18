import List from '@material-ui/core/List/List'
import ListItem from '@material-ui/core/ListItem/ListItem'
import { isEmpty, uniqBy } from 'lodash'
import * as React from 'react'
import IEvent from '../event/IEvent'
import IDecoratedSuggestion from '../suggestion/IDecoratedSuggestion'
import TrackList from '../track/TrackList'
import './MaybeTracks.scss'

interface IMaybeTracksProps {
  suggestions: IDecoratedSuggestion[]
  selectedEvent: IEvent
}

export default class MaybeTracks extends React.PureComponent<
  IMaybeTracksProps
> {
  public render() {
    const { suggestions, selectedEvent } = this.props
    const maybeSuggestions = !!suggestions
      ? suggestions.filter(s => s.suggestion.eventId === selectedEvent.eventId)
        .filter(
          s => s.suggestion && !s.suggestion.rejected && !s.suggestion.accepted
        )
      : []

    const playlistTracks = selectedEvent.playlist.tracks.items.map((track) => track.track.uri)
    let filteredSuggestions = maybeSuggestions

    if(!isEmpty(suggestions)) {
      filteredSuggestions = uniqBy(maybeSuggestions
        .filter((suggestedTrack) => playlistTracks.indexOf(suggestedTrack.track.uri) === -1), 'track.uri')
    }

    return (
      <List>
        {filteredSuggestions.length > 0 && (
          <TrackList
            tracks={filteredSuggestions.map(s => s.track)}
            suggestions={filteredSuggestions}
            selectedEvent={selectedEvent}
          />
        )}
        {filteredSuggestions.length < 1 && (
          <ListItem>
            <span className='noTracks'>
              No suggestions yet
            </span>
          </ListItem>
        )}
      </List>
    )
  }
}
