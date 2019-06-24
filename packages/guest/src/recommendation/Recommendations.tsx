import List from '@material-ui/core/List/List'
import React, { useEffect } from 'react'
import { isEmpty } from 'lodash'
import IAction from '../IAction'
import ITrack from '../track/ITrack'
import TrackList from '../track/TrackList'

interface IRecommendationsProps {
  tracks: ITrack[]
  getRecommendations(): IAction
  onRecommendationSelected?(track: ITrack): void
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
