import List from '@material-ui/core/List/List'
import ListItem from '@material-ui/core/ListItem/ListItem'
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

    return (
      <List>
        {maybeSuggestions.length > 0 && (
          <TrackList
            tracks={maybeSuggestions.map(s => s.track)}
            suggestions={maybeSuggestions}
            selectedEvent={selectedEvent}
          />
        )}
        {maybeSuggestions.length < 1 && (
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
