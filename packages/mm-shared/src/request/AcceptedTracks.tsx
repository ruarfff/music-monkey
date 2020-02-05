import React, { FC } from 'react'
import { isEmpty, uniqBy } from 'lodash'
import { User, DecoratedSuggestion, TrackList } from 'mm-shared'
import { Typography } from '@material-ui/core'
import './AcceptedTracks.scss'

interface AcceptedTracksProps {
  isHost?: boolean
  user: User
  suggestions: DecoratedSuggestion[]
}

const AcceptedTracks: FC<AcceptedTracksProps> = ({
  user,
  suggestions,
  isHost = false
}) => {
  let acceptedSuggestions =
    !isEmpty(suggestions) && (isHost || !isEmpty(user))
      ? suggestions.filter(s => s.suggestion && s.suggestion.accepted)
      : []

  if (!isHost) {
    acceptedSuggestions = acceptedSuggestions.filter(
      s => s.suggestion.userId === user.userId
    )
  }

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
