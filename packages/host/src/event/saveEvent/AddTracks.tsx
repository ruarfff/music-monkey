import React, { useState } from 'react'
import { Grid, Tabs, Tab, Badge } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import isEmpty from 'lodash/isEmpty'
import LoadingSpinner from 'loading/LoadingSpinner'
import IPlaylist from 'playlist/IPlaylist'
import TrackSearch from 'search/TrackSearch'
import ITrack from 'track/ITrack'
import Recommendations from './RecommendationsContainer'
import TrackList from './TrackList'
import EventTracks from './EventTracks'

import './AddTracks.scss'

interface AddTracksProps {
  seedPlaylist?: IPlaylist
}

const AddTracks = ({ seedPlaylist }: AddTracksProps) => {
  const [tracks, setTracks] = useState<ITrack[]>(
    isEmpty(seedPlaylist)
      ? []
      : seedPlaylist!.tracks.items.map(item => item.track)
  )
  const [tabIndex, setTabIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [searchedTracks, setSearchedTracks] = useState([] as ITrack[])

  const handleTabChange = (_: any, index: number) => {
    setTabIndex(index)
  }

  const handleAddTrack = (track: ITrack) => {
    setTracks([track, ...tracks])
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
                  color="primary"
                  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                  badgeContent={tracks.length}
                >
                  Current Playlist
                </Badge>
              ) : (
                'Current Playlist'
              )
            }
          />
          <Tab label="Suggested" />
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
      </Grid>
    </>
  )

  return (
    <Grid container className="AddTracks-root" spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" align="center" gutterBottom>
          Add Playlist
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
          <TrackList
            tracks={searchedTracks}
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

export default AddTracks
