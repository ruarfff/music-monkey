import React from 'react'
import { isEmpty, uniqBy } from 'lodash'
import { Typography } from '@material-ui/core'
import { DecoratedSuggestion, TrackList } from 'mm-shared'
import './RejectedTracks.scss'

interface RejectedTracksProps {
  suggestions: DecoratedSuggestion[]
}

const RejectedTracks = ({ suggestions }: RejectedTracksProps) => {
  const rejectedSuggestions = !isEmpty(suggestions)
    ? suggestions.filter(s => s.suggestion && s.suggestion.rejected)
    : []
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
