import React, { useState, useEffect } from 'react'
import { Grid, Tabs, Tab, Badge } from '@material-ui/core'
import { FieldProps, Field } from 'formik'
import Typography from '@material-ui/core/Typography'
import isEmpty from 'lodash/isEmpty'
import LoadingSpinner from 'loading/LoadingSpinner'
import IAction from 'IAction'
import IPlaylist from 'playlist/IPlaylist'
import TrackSearch from 'search/TrackSearch'
import ITrack from 'track/ITrack'
import isUndefined from 'lodash/isUndefined'
import TrackList from './TrackList'
import EventTracks from './EventTracks'

import './AddTracks.scss'

interface AddTracksProps {
  seedPlaylist?: IPlaylist
  recommendedTracks: ITrack[]
  getRecommendations(): IAction
}

interface CatalogueViewProps {
  searchedTracks: ITrack[]
}

const AddTracks = ({
  seedPlaylist,
  recommendedTracks,
  getRecommendations
}: AddTracksProps) => {
  const [tabIndex, setTabIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [searchedTracks, setSearchedTracks] = useState([] as ITrack[])

  useEffect(() => {
    if (isEmpty(recommendedTracks)) {
      getRecommendations()
    }
    // eslint-disable-next-line
  }, [recommendedTracks])

  const handleTabChange = (_: any, index: number) => {
    setTabIndex(index)
  }

  const CatalogueView = ({ searchedTracks }: CatalogueViewProps) => (
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

        const handleAddSearchedTrack = (track: ITrack) => {
          setFieldValue('tracks', [track, ...value])
          setSearchedTracks([])
        }

        const handleTracksChanges = (tracks: ITrack[]) => {
          setFieldValue('tracks', tracks)
        }

        if (!isEmpty(searchedTracks)) {
          return (
            <Grid item xs={12}>
              <TrackList
                tracks={searchedTracks}
                filterList={value}
                onTrackSelected={handleAddSearchedTrack}
              />
            </Grid>
          )
        }

        return (
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
                    !isEmpty(value) ? (
                      <Badge
                        overlap="circle"
                        color="primary"
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        badgeContent={value.length}
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
                <EventTracks
                  tracks={value}
                  onTracksChanged={handleTracksChanges}
                />
              )}
              {tabIndex === 1 && (
                <TrackList
                  tracks={recommendedTracks}
                  filterList={value}
                  onTrackSelected={handleAddTrack}
                />
              )}
            </Grid>
          </>
        )
      }}
    </Field>
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
      ) : (
        <CatalogueView searchedTracks={searchedTracks} />
      )}
    </Grid>
  )
}

export default AddTracks
