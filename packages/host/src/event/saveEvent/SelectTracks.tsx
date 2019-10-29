import React, { useState, useEffect } from 'react'
import { List, Grid, Typography } from '@material-ui/core'
import isEmpty from 'lodash/isEmpty'
import IAction from 'IAction'
import ITrack from 'track/ITrack'
import TrackItem from './TrackItem'
import TrackSearch from 'search/TrackSearch'
import './SelectTracks.scss'
import LoadingSpinner from 'loading/LoadingSpinner'

interface SelectTracksProps {
  recommendedTracks: ITrack[]
  filterList: ITrack[]
  onTrackSelected(track: ITrack): void
  getRecommendations(): IAction
}

const SelectTracks = ({
  recommendedTracks = [],
  filterList = [],
  onTrackSelected,
  getRecommendations
}: SelectTracksProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [searchedTracks, setSearchedTracks] = useState([] as ITrack[])
  const existingTracks = filterList.map(track => track.uri)
  const showingSearchResult = !isEmpty(searchedTracks)

  useEffect(() => {
    if (isEmpty(recommendedTracks)) {
      getRecommendations()
    }
    // eslint-disable-next-line
  }, [])

  let tracks: ITrack[] = (showingSearchResult
    ? searchedTracks
    : recommendedTracks
  ).filter(track => existingTracks.indexOf(track.uri) === -1)

  return (
    <Grid container className="SelectTracks-root" spacing={2}>
      <Grid item xs={12} className="SelectTracks-playlist">
        <TrackSearch
          onSearchResult={(tracks: ITrack[]) => {
            setSearchedTracks(tracks)
            setIsLoading(false)
          }}
          onSearchStart={() => {
            setIsLoading(true)
          }}
        />
      </Grid>
      <Grid item xs={12} className="SelectTracks-tracks">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div>
            <Typography align="center">{showingSearchResult ? 'Search Results' : 'Recommendations'}</Typography>
            <List>
              {tracks.map(track => (
                <TrackItem
                  onSelected={onTrackSelected}
                  track={track}
                  key={track.uri}
                />
              ))}
            </List>
          </div>
        )}
      </Grid>
    </Grid>
  )
}

export default SelectTracks
