import React, { FC } from 'react'
import { Typography } from '@material-ui/core'
import { Track, Recommendations, Action } from '../'

interface RecommendationsTabProps {
  recommendations: Track[]
  getRecommendations(): Action
  onSelected(track: Track): any
}

const RecommendationsTab: FC<RecommendationsTabProps> = ({
  recommendations,
  getRecommendations,
  onSelected
}) => {
  return (
    <Typography component="div" dir={'0'}>
      <Recommendations
        tracks={recommendations}
        getRecommendations={getRecommendations}
        onRecommendationSelected={onSelected}
      />
      <div className="Finder-stopper-block" />
    </Typography>
  )
}

export default RecommendationsTab
