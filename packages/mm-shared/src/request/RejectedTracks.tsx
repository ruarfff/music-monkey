import React, { FC } from 'react'
import { isEmpty, uniqBy } from 'lodash'
import { Typography } from '@material-ui/core'
import { User, DecoratedSuggestion, TrackList } from 'mm-shared'
import './RejectedTracks.scss'

interface RejectedTracksProps {
  isHost?: boolean
  user: User
  suggestions: DecoratedSuggestion[]
}

const RejectedTracks: FC<RejectedTracksProps> = ({
  user,
  suggestions,
  isHost = false
}) => {
  let rejectedSuggestions =
    !isEmpty(suggestions) && (isHost || !isEmpty(user))
      ? suggestions.filter(s => s.suggestion && s.suggestion.rejected)
      : []

  if (!isHost) {
    rejectedSuggestions = rejectedSuggestions.filter(
      s => s.suggestion.userId === user.userId
    )
  }
  const rejectedTracks = uniqBy(
    rejectedSuggestions.map(s => s.track),
    'id'
  )

  return (
    <>
      {!isEmpty(rejectedTracks) && (
        <TrackList tracks={rejectedTracks} suggestions={rejectedSuggestions} />
      )}
      {isEmpty(rejectedTracks) && (
        <Typography className="noTracks" variant="h6" gutterBottom>
          No rejected request yet
        </Typography>
      )}
    </>
  )
}

export default RejectedTracks
