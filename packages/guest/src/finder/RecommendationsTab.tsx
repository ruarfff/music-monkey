import React, { FC } from 'react'
import { Typography } from '@material-ui/core'
import Recommendations from '../recommendations/RecommendationsContainer'
import { Track } from 'mm-shared'

interface RecommendationsTabProps {
  onTrackSelected(track: Track): any
}

const RecommendationsTab: FC<RecommendationsTabProps> = ({
  onTrackSelected
}) => {
  return (
    <Typography component="div" dir={'0'}>
      <Recommendations onRecommendationSelected={onTrackSelected} />
      <div className="Finder-stopper-block" />
    </Typography>
  )
}

export default RecommendationsTab
