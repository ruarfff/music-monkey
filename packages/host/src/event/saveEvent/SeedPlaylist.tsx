import React, { useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import { Grid, Tabs, Tab, Badge } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import IUser from 'user/IUser'
import LoadingSpinner from 'loading/LoadingSpinner'
import TrackSearch from 'search/TrackSearch'
import ITrack from 'track/ITrack'
import Recommendations from './RecommendationsContainer'
import Playlists from './PlaylistsContainer'
import SearchResults from './SearchResults'
import EventTracks from './EventTracks'

import './SeedPlaylist.scss'

interface SeedPlaylistProps {
  user: IUser
}

const SeedPlaylist = ({ user }: SeedPlaylistProps) => {
  const [tracks, setTracks] = useState<ITrack[]>([])
  const [tabIndex, setTabIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [searchedTracks, setSearchedTracks] = useState([] as ITrack[])

  const handleTabChange = (_: any, index: number) => {
    setTabIndex(index)
  }

  const handleAddTrack = (track: ITrack) => {
    setTracks([track, ...tracks])
  }

  const handleAddManyTracks = (someTracks: ITrack[]) => {
    setTracks([...someTracks, ...tracks])
  }

  const CatalogueView = () => (
    <>
      <Grid item xs={12}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab
            label={
              !isEmpty(tracks) ? (
                <Badge color="primary" badgeContent={tracks.length}>
                  Tracks
                </Badge>
              ) : (
                'Tracks'
              )
            }
          />
          <Tab label="Recommendations" />
          <Tab label="Playlists" />
        </Tabs>
      </Grid>
      <Grid item xs={12}>
        {tabIndex === 0 && (
          <EventTracks
            tracks={tracks}
            onTrackOrderChanged={() => {}}
            onTrackRemoved={() => {}}
          />
        )}
        {tabIndex === 1 && (
          <Recommendations
            filterList={tracks}
            onTrackSelected={handleAddTrack}
          />
        )}
        {tabIndex === 2 && (
          <Playlists
            filterList={tracks}
            onTrackSelected={handleAddTrack}
            onAddAll={handleAddManyTracks}
          />
        )}
      </Grid>
    </>
  )

  return (
    <Grid container className="SeedPlaylist-root" spacing={2}>
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
          }}
        />
      </Grid>
      {isLoading ? (
        <LoadingSpinner />
      ) : !isEmpty(searchedTracks) ? (
        <Grid item xs={12}>
          <SearchResults
            searchedTracks={searchedTracks}
            filterList={tracks}
            onTrackSelected={handleAddTrack}
          />
        </Grid>
      ) : (
        <CatalogueView />
      )}
    </Grid>
  )
}

export default SeedPlaylist
