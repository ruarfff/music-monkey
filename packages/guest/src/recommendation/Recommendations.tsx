import List from '@material-ui/core/List/List'
import React, { useEffect } from 'react'
import { isEmpty } from 'lodash'
import { Action } from 'mm-shared'
import { Track }  from 'mm-shared'
import TrackList from '../track/TrackList'

interface IRecommendationsProps {
  tracks: Track[]
  getRecommendations(): Action
  onRecommendationSelected?(track: Track): void
}

const Recommendations = ({
  tracks,
  getRecommendations,
  onRecommendationSelected
}: IRecommendationsProps) => {
  useEffect(() => {
    if (isEmpty(tracks)) {
      getRecommendations()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracks])
  return (
    <List>
      <TrackList
        tracks={tracks}
        onTrackSelected={onRecommendationSelected}
        withSuggestingEnabled={true}
      />
    </List>
  )
}

export default Recommendations
