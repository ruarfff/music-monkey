import React, { useEffect, useState } from 'react'
import { List } from '@material-ui/core'
import isEmpty from 'lodash/isEmpty'
import IAction from 'IAction'
import ITrack from 'track/ITrack'
import TrackItem from './TrackItem'
import LoadingSpinner from 'loading/LoadingSpinner'

interface RecommendationsProps {
  recommendedTracks: ITrack[]
  filterList: ITrack[]
  onTrackSelected(track: ITrack): void
  getRecommendations(): IAction
}

const Recommendations = ({
  recommendedTracks = [],
  filterList = [],
  onTrackSelected,
  getRecommendations
}: RecommendationsProps) => {
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if (isEmpty(recommendedTracks)) {
      getRecommendations()
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
    // eslint-disable-next-line
  }, [recommendedTracks])

  const existingTracks = filterList.map(track => track.uri)
  let tracks: ITrack[] = recommendedTracks.filter(
    track => existingTracks.indexOf(track.uri) === -1
  )

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <List>
      {tracks.map(track => (
        <TrackItem onSelected={onTrackSelected} track={track} key={track.uri} />
      ))}
    </List>
  )
}

export default Recommendations
