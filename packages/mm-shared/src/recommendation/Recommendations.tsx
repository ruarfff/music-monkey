import React, { FC, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { Action, Track, TrackList } from 'mm-shared'

interface RecommendationsProps {
  tracks: Track[]
  getRecommendations(): Action
  onRecommendationSelected?(track: Track): void
}

const Recommendations: FC<RecommendationsProps> = ({
  tracks,
  getRecommendations,
  onRecommendationSelected
}) => {
  useEffect(() => {
    if (isEmpty(tracks)) {
      getRecommendations()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracks])
  return (
    <TrackList
      tracks={tracks}
      onSelected={onRecommendationSelected}
      options={{ canRequest: true }}
    />
  )
}

export default Recommendations
