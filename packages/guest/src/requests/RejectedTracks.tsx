import List from '@material-ui/core/List/List'
import ListItem from '@material-ui/core/ListItem/ListItem'
import { isEmpty } from 'lodash'
import * as React from 'react'
import IEvent from '../event/IEvent'
import IDecoratedSuggestion from '../suggestion/IDecoratedSuggestion'
import TrackList from '../track/TrackList'
import './RejectedTracks.scss'

interface IRejectedTracksProps {
  suggestions: IDecoratedSuggestion[]
  selectedEvent: IEvent
}

export default class RejectedTracks extends React.PureComponent<
  IRejectedTracksProps
> {
  public render() {
    const { suggestions, selectedEvent } = this.props

    const rejectedSuggestions = !isEmpty(suggestions) && !isEmpty(selectedEvent)
      ? suggestions.filter((s) => s.suggestion.eventId === selectedEvent.eventId)
        .filter(s => s.suggestion && s.suggestion.rejected)
      : []

    return (
      <List>
        {rejectedSuggestions.length > 0 && (
          <TrackList
            tracks={rejectedSuggestions.map(s => s.track)}
            suggestions={rejectedSuggestions}
            selectedEvent={selectedEvent}
          />
        )}
        {rejectedSuggestions.length < 1 && (
          <ListItem>
            <span className='noTracks'>
              No rejected suggestions yet
            </span>
          </ListItem>
        )}
      </List>
    )
  }
}
