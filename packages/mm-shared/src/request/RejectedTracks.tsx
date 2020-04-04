import React, { FC } from 'react'
import { isEmpty, uniqBy } from 'lodash'
import { Typography } from '@material-ui/core'
import { User, DecoratedSuggestion, TrackList, Suggestion } from '../'
import './RejectedTracks.scss'

interface RejectedTracksProps {
  isHost: boolean
  user: User
  requests: DecoratedSuggestion[]
  onAccept(suggestion: Suggestion): void
}

const RejectedTracks: FC<RejectedTracksProps> = ({
  user,
  requests,
  isHost,
  onAccept
}) => {
  let rejectedSuggestions =
    !isEmpty(requests) && (isHost || !isEmpty(user)) ? requests : []

  if (!isHost) {
    rejectedSuggestions = rejectedSuggestions.filter(
      (s) => s.suggestion.userId === user.userId
    )
  }
  const rejectedTracks = uniqBy(
    rejectedSuggestions.map((s) => s.track),
    'id'
  )

  return (
    <>
      {!isEmpty(rejectedTracks) && (
        <TrackList
          tracks={rejectedTracks}
          suggestions={rejectedSuggestions}
          options={{ canRequest: isHost, showProfile: isHost }}
          onAccept={onAccept}
        />
      )}
      {isEmpty(rejectedTracks) && (
        <Typography className="noTracks" variant="h6" gutterBottom>
          No rejected requests yet
        </Typography>
      )}
    </>
  )
}

export default RejectedTracks
