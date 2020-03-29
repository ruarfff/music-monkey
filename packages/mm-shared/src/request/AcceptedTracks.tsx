import React, { FC } from 'react'
import { isEmpty, uniqBy } from 'lodash'
import { User, DecoratedSuggestion, TrackList, Suggestion } from '../'
import { Typography } from '@material-ui/core'
import './AcceptedTracks.scss'

interface AcceptedTracksProps {
  isHost: boolean
  user: User
  requests: DecoratedSuggestion[]
  onReject(suggestion: Suggestion): void
}

const AcceptedTracks: FC<AcceptedTracksProps> = ({
  user,
  requests,
  isHost,
  onReject
}) => {
  let acceptedSuggestions =
    !isEmpty(requests) && (isHost || !isEmpty(user))
      ? requests.filter(s => s.suggestion && s.suggestion.accepted)
      : []

  if (!isHost) {
    acceptedSuggestions = acceptedSuggestions.filter(
      s => s.suggestion.userId === user.userId
    )
  }

  const tracks = uniqBy(
    acceptedSuggestions.map(s => s.track),
    'id'
  )
  return (
    <>
      {!isEmpty(tracks) && (
        <TrackList
          tracks={tracks}
          suggestions={acceptedSuggestions}
          options={{ canRemove: isHost }}
          onReject={onReject}
        />
      )}
      {isEmpty(tracks) && (
        <Typography className="noTracks" variant="h6" gutterBottom>
          No accepted requests yet
        </Typography>
      )}
    </>
  )
}

export default AcceptedTracks
