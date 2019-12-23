import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { isEmpty, uniqBy } from 'lodash'
import IDecoratedSuggestion from 'suggestion/IDecoratedSuggestion'
import TrackList from 'track/TrackList'
import IUser from 'user/IUser'
import './AcceptedTracks.scss'

interface IAcceptedTracksProps {
  user: IUser
  suggestions: IDecoratedSuggestion[]
}

const AcceptedTracks = ({ user, suggestions }: IAcceptedTracksProps) => {
  const acceptedSuggestions =
    !isEmpty(suggestions) && !isEmpty(user)
      ? suggestions.filter(s => s.suggestion && s.suggestion.accepted)
      : []

  const acceptedTracks = uniqBy(
    acceptedSuggestions.map(s => s.track),
    'id'
  )

  return (
    <List>
      {!isEmpty(acceptedTracks) && <TrackList tracks={acceptedTracks} />}
      {isEmpty(acceptedTracks) && (
        <ListItem>
          <span className="noTracks">No accepted suggestions yet</span>
        </ListItem>
      )}
    </List>
  )
}

export default AcceptedTracks
