import React, { useState, useEffect } from 'react'
import { Grid, Tabs, Tab, Badge } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import isEmpty from 'lodash/isEmpty'
import LoadingSpinner from 'loading/LoadingSpinner'
import IAction from 'IAction'
import IPlaylist from 'playlist/IPlaylist'
import TrackSearch from 'search/TrackSearch'
import ITrack from 'track/ITrack'
import TrackList from './TrackList'
import EventTracks from './EventTracks'

import './AddTracks.scss'

interface AddTracksProps {
  seedPlaylist?: IPlaylist
  recommendedTracks: ITrack[]
  getRecommendations(): IAction
}

const AddTracks = ({
  seedPlaylist,
  recommendedTracks,
  getRecommendations
}: AddTracksProps) => {
  const [tracks, setTracks] = useState<ITrack[]>(
    isEmpty(seedPlaylist)
      ? []
      : seedPlaylist!.tracks.items.map(item => item.track)
  )
  const [tabIndex, setTabIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [searchedTracks, setSearchedTracks] = useState([] as ITrack[])

  useEffect(() => {
    if (isEmpty(recommendedTracks)) {
      getRecommendations()
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
    // eslint-disable-next-line
  }, [recommendedTracks])

  const handleTabChange = (_: any, index: number) => {
    setTabIndex(index)
  }

  const handleAddTrack = (track: ITrack) => {
    setTracks([track, ...tracks])
  }

  const handleAddSearchedTrack = (track: ITrack) => {
    setTracks([track, ...tracks])
    setSearchedTracks([])
  }

  const CatalogueView = () => (
    <>
      <Grid item xs={12}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab
            label={
              !isEmpty(tracks) ? (
                <Badge
                  overlap="circle"
                  color="primary"
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  badgeContent={tracks.length}
                >
                  Current Playlist
                </Badge>
              ) : (
                'Current Playlist'
              )
            }
          />
          <Tab label="Recommendations" />
        </Tabs>
      </Grid>
      <Grid item xs={12}>
        {tabIndex === 0 && (
          <EventTracks tracks={tracks} onTracksChanged={setTracks} />
        )}
        {tabIndex === 1 && (
          <TrackList
            tracks={recommendedTracks}
            filterList={tracks}
            onTrackSelected={handleAddTrack}
          />
        )}
      </Grid>
    </>
  )

  return (
    <Grid container className="AddTracks-root" spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" align="center" gutterBottom>
          Add Tracks
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TrackSearch
          onSearchResult={(tracks: ITrack[]) => {
            setSearchedTracks(tracks)
            setIsLoading(false)
          }}
          onSearchStart={() => {
            setIsLoading(true)
            setTabIndex(1)
          }}
        />
      </Grid>
      {isLoading ? (
        <LoadingSpinner />
      ) : !isEmpty(searchedTracks) ? (
        <Grid item xs={12}>
          <TrackList
            tracks={searchedTracks}
            filterList={tracks}
            onTrackSelected={handleAddSearchedTrack}
          />
        </Grid>
      ) : (
        <CatalogueView />
      )}
    </Grid>
  )
}

export default AddTracks
