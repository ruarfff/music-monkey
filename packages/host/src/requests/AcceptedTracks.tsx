import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { isEmpty } from 'lodash'
import IDecoratedSuggestion from 'suggestion/IDecoratedSuggestion'
import SuggestionList from 'suggestion/SuggestionList'
import IUser from 'user/IUser'
import './AcceptedTracks.scss'

interface AcceptedTracksProps {
  user: IUser
  suggestions: IDecoratedSuggestion[]
}

const AcceptedTracks = ({ user, suggestions }: AcceptedTracksProps) => {
  const acceptedSuggestions =
    !isEmpty(suggestions) && !isEmpty(user)
      ? suggestions.filter(s => s.suggestion && s.suggestion.accepted)
      : []

  return (
    <List>
      {!isEmpty(acceptedSuggestions) && (
        <SuggestionList
          suggestions={acceptedSuggestions}
          disableRemoveTrack={true}
        />
      )}
      {isEmpty(acceptedSuggestions) && (
        <ListItem>
          <span className="noTracks">No accepted suggestions yet</span>
        </ListItem>
      )}
    </List>
  )
}

export default AcceptedTracks
