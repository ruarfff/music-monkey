import React, { FC } from 'react'
import { isEmpty, uniqBy } from 'lodash'
import { User, DecoratedSuggestion, TrackList } from 'mm-shared'
import { Typography } from '@material-ui/core'
import './AcceptedTracks.scss'

interface AcceptedTracksProps {
  user: User
  suggestions: DecoratedSuggestion[]
}

const AcceptedTracks: FC<AcceptedTracksProps> = ({ user, suggestions }) => {
  const acceptedSuggestions =
    !isEmpty(suggestions) && !isEmpty(user)
      ? suggestions
          .filter(s => s.suggestion.userId === user.userId)
          .filter(s => s.suggestion && s.suggestion.accepted)
      : []

  const acceptedTracks = uniqBy(
    acceptedSuggestions.map(s => s.track),
    'id'
  )

  return (
    <>
      {!isEmpty(acceptedTracks) && (
        <TrackList tracks={acceptedTracks} suggestions={acceptedSuggestions} />
      )}
      {isEmpty(acceptedTracks) && (
        <Typography className="noTracks" variant="h6" gutterBottom>
          No accepted suggestions yet
        </Typography>
      )}
    </>
  )
}

export default AcceptedTracks
