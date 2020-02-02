import React, { FC } from 'react'
import { Typography } from '@material-ui/core'
import Recommendations from 'recommendations/RecommendationsContainer'
import { Track } from 'mm-shared'

interface RecommendationsTabProps {
  onSelected(track: Track): any
}

const RecommendationsTab: FC<RecommendationsTabProps> = ({ onSelected }) => {
  return (
    <Typography component="div" dir={'0'}>
      <Recommendations onRecommendationSelected={onSelected} />
      <div className="Finder-stopper-block" />
    </Typography>
  )
}

export default RecommendationsTab
