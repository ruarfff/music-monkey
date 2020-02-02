import React, { useState, useEffect } from 'react'
import { Grid, Tabs, Tab, Badge } from '@material-ui/core'
import { FieldProps, Field } from 'formik'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import { addTracksToPlaylist } from 'playlist/playlistClient'
import {
  useSnackbarAlert,
  Action,
  LoadingSpinner,
  Track,
  Playlist,
  TrackSearch
} from 'mm-shared'
import TrackList from './TrackList'
import EventTracks from './EventTracks'
import Playlists from './PlaylistsContainer'

import './AddTracks.scss'

interface AddTracksProps {
  playlist: Playlist
  recommendedTracks: Track[]
  getRecommendations(): Action
}

const AddTracks = ({
  playlist,
  recommendedTracks,
  getRecommendations
}: AddTracksProps) => {
  const [tabIndex, setTabIndex] = useState(0)
  const [searchedTracks, setSearchedTracks] = useState([] as Track[])
  const [isLoading, setIsLoading] = useState(false)
  const { showSuccess, showError } = useSnackbarAlert()

  useEffect(() => {
    if (isEmpty(recommendedTracks)) {
      getRecommendations()
    }
    // eslint-disable-next-line
  }, [recommendedTracks])

  const handleTabChange = (_: any, index: number) => {
    setTabIndex(index)
  }

  return (
    <Grid container className="AddTracks-root" spacing={2}>
      <Field name="tracks">
        {({ field: { value }, form: { setFieldValue } }: FieldProps) => {
          const handleAddTrack = async (track: Track) => {
            try {
              await addTracksToPlaylist(playlist.id, [track.uri])
              setFieldValue('tracks', [...value, track])
              showSuccess('Track Added')
            } catch (err) {
              console.error(err)
              showError('Failed to add track')
            }
          }

          const handleAddTracks = (tracks: Track[]) => {
            try {
              addTracksToPlaylist(
                playlist.id,
                tracks.map(track => track.uri)
              )
              setFieldValue('tracks', [...value, ...tracks])
              showSuccess('Track Added')
            } catch (err) {
              console.error(err)
              showError('Failed to add track')
            }
          }

          const handleTracksChanges = (tracks: Track[]) => {
            setFieldValue('tracks', tracks)
          }
          return (
            <Grid container>
              <Grid item xs={12}>
                <TrackSearch
                  onSearchResult={(results: Track[]) => {
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
                    className="AddTracks-tab"
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
                    className="AddTracks-tab"
                    label={
                      isEmpty(searchedTracks) ? 'Suggested' : 'Search Results'
                    }
                  />
                  <Tab label="My Playlists" className="AddTracks-tab" />
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
                        playlist={playlist}
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
                        onSelected={handleAddTrack}
                      />
                    )}
                    {tabIndex === 2 && (
                      <Playlists onAddTracks={handleAddTracks} />
                    )}
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
