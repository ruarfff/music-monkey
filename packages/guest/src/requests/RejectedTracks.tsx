import List from '@material-ui/core/List/List'
import ListItem from '@material-ui/core/ListItem/ListItem'
import { isEmpty, uniqBy } from 'lodash'
import React from 'react'
import IDecoratedSuggestion from './IDecoratedSuggestion'
import TrackList from '../track/TrackList'
import './RejectedTracks.scss'
import { User } from 'mm-shared'

interface IRejectedTracksProps {
  user: User
  suggestions: IDecoratedSuggestion[]
}

const RejectedTracks = ({ user, suggestions }: IRejectedTracksProps) => {
  const rejectedSuggestions =
    !isEmpty(suggestions) && !isEmpty(user)
      ? suggestions
          .filter(s => s.suggestion.userId === user.userId)
          .filter(s => s.suggestion && s.suggestion.rejected)
      : []
  const rejectedTracks = uniqBy(
    rejectedSuggestions.map(s => s.track),
    'id'
  )

  return (
    <List>
      {!isEmpty(rejectedTracks) && <TrackList tracks={rejectedTracks} />}
      {isEmpty(rejectedTracks) && (
        <ListItem>
          <span className="noTracks">No rejected suggestions yet</span>
        </ListItem>
      )}
    </List>
  )
}

export default RejectedTracks
