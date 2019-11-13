import React, { useState, useEffect } from 'react'
import { Grid, Tabs, Tab, Badge } from '@material-ui/core'
import { FieldProps, Field } from 'formik'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import LoadingSpinner from 'loading/LoadingSpinner'
import IAction from 'IAction'
import IPlaylist from 'playlist/IPlaylist'
import TrackSearch from 'search/TrackSearch'
import ITrack from 'track/ITrack'
import isUndefined from 'lodash/isUndefined'
import TrackList from './TrackList'
import EventTracks from './EventTracks'
import Playlists from './PlaylistsContainer'

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
  const [tabIndex, setTabIndex] = useState(0)
  const [searchedTracks, setSearchedTracks] = useState([] as ITrack[])
  const [isLoading, setIsLoading] = useState(false)

  const handleTabChange = (_: any, index: number) => {
    setTabIndex(index)
  }

  useEffect(() => {
    if (isEmpty(recommendedTracks)) {
      getRecommendations()
    }
    // eslint-disable-next-line
  }, [recommendedTracks])

  return (
    <Grid container className="AddTracks-root" spacing={2}>
      <Field name="tracks">
        {({ field: { value }, form: { setFieldValue } }: FieldProps) => {
          if (isUndefined(value)) {
            setFieldValue(
              'tracks',
              seedPlaylist!.tracks.items.map(item => item.track)
            )
          }

          const handleAddTrack = (track: ITrack) => {
            setFieldValue('tracks', [track, ...value])
          }

          const handleTracksChanges = (tracks: ITrack[]) => {
            setFieldValue('tracks', tracks)
          }
          return (
            <Grid container>
              <Grid item xs={12}>
                <TrackSearch
                  onSearchResult={(results: ITrack[]) => {
                    if (!isEqual(searchedTracks, results))
                      setSearchedTracks(results)
                    setIsLoading(false)
                  }}
                  onSearchStart={() => {
                    setIsLoading(true)
                  }}
                  onFocus={() => {
                    setTabIndex(1)
                  }}
                />
              </Grid>

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
                      !isEmpty(value) ? (
                        <Badge
                          className="AddTracks-playlist-count"
                          overlap="circle"
                          color={'secondary'}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                          }}
                          badgeContent={value.length}
                        >
                          Current Playlist
                        </Badge>
                      ) : (
                        'Current Playlist'
                      )
                    }
                  />
                  <Tab
                    label={
                      isEmpty(searchedTracks) ? 'Suggested' : 'Search Results'
                    }
                  />
                  <Tab label="My Playlists" />
                </Tabs>
              </Grid>
              <Grid item xs={12}>
                {isLoading ? (
                  <div className="AddTracks-search-loading">
                    <LoadingSpinner />
                  </div>
                ) : (
                  <>
                    {tabIndex === 0 && (
                      <EventTracks
                        tracks={value}
                        onTracksChanged={handleTracksChanges}
                      />
                    )}
                    {tabIndex === 1 && (
                      <TrackList
                        tracks={
                          !isEmpty(searchedTracks)
                            ? searchedTracks
                            : recommendedTracks
                        }
                        filterList={value}
                        onTrackSelected={handleAddTrack}
                      />
                    )}
                    {tabIndex === 2 && <Playlists />}
                  </>
                )}
              </Grid>
            </Grid>
          )
        }}
      </Field>
    </Grid>
  )
}

export default AddTracks
