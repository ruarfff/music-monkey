import List from '@material-ui/core/List/List'
import ListItem from '@material-ui/core/ListItem/ListItem'
import { isEmpty } from 'lodash'
import * as React from 'react'
import IEvent from '../event/IEvent'
import IDecoratedSuggestion from '../suggestion/IDecoratedSuggestion'
import TrackList from '../track/TrackList'
import './AcceptedTracks.scss'

interface IAcceptedTracksProps {
  suggestions: IDecoratedSuggestion[]
  selectedEvent: IEvent
}

export default class AcceptedTracks extends React.PureComponent<
  IAcceptedTracksProps
> {
  public render() {
    const { suggestions, selectedEvent } = this.props
    const acceptedSuggestions = !isEmpty(suggestions) && !isEmpty(selectedEvent)
      ? suggestions.filter(s => s.suggestion.eventId === selectedEvent.eventId)
        .filter(s => s.suggestion && s.suggestion.accepted)
      : []

    return (
      <List>
        {acceptedSuggestions.length > 0 && (
          <TrackList
            tracks={acceptedSuggestions.map(s => s.track)}
            suggestions={acceptedSuggestions}
            selectedEvent={selectedEvent}
          />
        )}
        {acceptedSuggestions.length < 1 && (
          <ListItem>
            <span className='noTracks'>
              No accepted suggestions yet
            </span>
          </ListItem>
        )}
      </List>
    )
  }
}
