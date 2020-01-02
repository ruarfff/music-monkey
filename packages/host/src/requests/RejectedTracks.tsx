import React from 'react'
import List from '@material-ui/core/List/List'
import ListItem from '@material-ui/core/ListItem/ListItem'
import { isEmpty } from 'lodash'
import IDecoratedSuggestion from 'suggestion/IDecoratedSuggestion'
import SuggestionList from 'suggestion/SuggestionList'
import { User } from 'mm-shared'
import './RejectedTracks.scss'

interface IRejectedTracksProps {
  user: User
  suggestions: IDecoratedSuggestion[]
}

const RejectedTracks = ({ user, suggestions }: IRejectedTracksProps) => {
  const rejectedSuggestions =
    !isEmpty(suggestions) && !isEmpty(user)
      ? suggestions.filter(s => s.suggestion && s.suggestion.rejected)
      : []

  return (
    <List>
      {!isEmpty(rejectedSuggestions) && (
        <SuggestionList
          suggestions={rejectedSuggestions}
          disableRemoveTrack={true}
        />
      )}
      {isEmpty(rejectedSuggestions) && (
        <ListItem>
          <span className="noTracks">No rejected suggestions yet</span>
        </ListItem>
      )}
    </List>
  )
}

export default RejectedTracks
