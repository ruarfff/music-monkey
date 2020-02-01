import React, { FC } from 'react'
import { isEmpty, uniqBy } from 'lodash'
import { DecoratedSuggestion, TrackList } from 'mm-shared'
import { Typography } from '@material-ui/core'
import './AcceptedTracks.scss'

interface AcceptedTracksProps {
  suggestions: DecoratedSuggestion[]
}

const AcceptedTracks: FC<AcceptedTracksProps> = ({ suggestions }) => {
  const acceptedSuggestions = !isEmpty(suggestions)
    ? suggestions.filter(s => s.suggestion && s.suggestion.accepted)
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
