import { Typography } from '@material-ui/core'
import Recommendations from '../recommendation/RecommendationsContainer'
import ITrack from '../track/ITrack'
import React from 'react'

interface IRecommendationsTabProps {
  onTrackSelected(track: ITrack): any
}

const RecommendationsTab = ({ onTrackSelected }: IRecommendationsTabProps) => {
  return (
    <Typography component="div" dir={'0'}>
      <Recommendations onRecommendationSelected={onTrackSelected} />
      <div className="Finder-stopper-block" />
    </Typography>
  )
}

export default RecommendationsTab
