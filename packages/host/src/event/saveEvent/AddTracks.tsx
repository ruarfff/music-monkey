import React, { useState, useEffect } from 'react'
import { Grid, Tabs, Tab, Fab, Button, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
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

import './AddTracks.scss'

interface AddTracksProps {
  seedPlaylist?: IPlaylist
  recommendedTracks: ITrack[]
  getRecommendations(): IAction
}

interface CatalogueViewProps {
  open: boolean
  tracks: ITrack[]
  handleAddTrack(track: ITrack): void
  handleClose(): void
}

interface CurrentPlaylistProps {
  tracks: ITrack[]
  handleTracksChanges(tracks: ITrack[]): void
}

const AddTracks = ({
  seedPlaylist,
  recommendedTracks,
  getRecommendations
}: AddTracksProps) => {
  const [showAddTracks, setShowAddTracks] = useState(false)

  useEffect(() => {
    if (isEmpty(recommendedTracks)) {
      getRecommendations()
    }
    // eslint-disable-next-line
  }, [recommendedTracks])

  const CatalogueView = ({
    tracks,
    handleAddTrack,
    open,
    handleClose
  }: CatalogueViewProps) => {
    const [tabIndex, setTabIndex] = useState(0)
    const [searchedTracks, setSearchedTracks] = useState([] as ITrack[])
    const [isLoading, setIsLoading] = useState(false)

    const handleTabChange = (_: any, index: number) => {
      setTabIndex(index)
    }

    return (
      <Dialog
        className="AddTracks-dialog"
        fullScreen
        open={open}
        onClose={handleClose}
        aria-labelledby="add-tracks-dialog-title"
      >
        <DialogTitle
          id="add-tracks-dialog-title"
          className="AddTracks-dialog-title"
        >
          Add Tracks
        </DialogTitle>
        <DialogContent>
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
                  setTabIndex(0)
                }}
              />
            </Grid>
            {isLoading ? (
              <div className="AddTracks-search-loading">
                <LoadingSpinner />
              </div>
            ) : (
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
                        isEmpty(searchedTracks) ? 'Suggested' : 'Search Results'
                      }
                    />
                    <Tab label="My Playlists" />
                  </Tabs>
                </Grid>
                <Grid item xs={12}>
                  {tabIndex === 0 && (
                    <TrackList
                      tracks={
                        !isEmpty(searchedTracks)
                          ? searchedTracks
                          : recommendedTracks
                      }
                      filterList={tracks}
                      onTrackSelected={handleAddTrack}
                    />
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
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  const CurrentPlaylist = ({
    tracks,
    handleTracksChanges
  }: CurrentPlaylistProps) => {
    return (
      <>
        <Grid item xs={12}>
          <Typography align="center" gutterBottom variant="h5">
            Current Playlist
          </Typography>
        </Grid>
        <Grid item xs={12} className="AddTracks-action">
          <Fab
            className="AddTracks-action-button"
            variant="extended"
            color="secondary"
            aria-label="Add tracks"
            onClick={() => {
              setShowAddTracks(true)
            }}
          >
            Add Tracks
            <AddIcon />
          </Fab>
        </Grid>
        <Grid item xs={12}>
          <EventTracks tracks={tracks} onTracksChanged={handleTracksChanges} />
        </Grid>
      </>
    )
  }

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
            <>
              <CatalogueView
                open={showAddTracks}
                tracks={value}
                handleAddTrack={handleAddTrack}
                handleClose={() => {
                  setShowAddTracks(false)
                }}
              />

              <CurrentPlaylist
                tracks={value}
                handleTracksChanges={handleTracksChanges}
              />
            </>
          )
        }}
      </Field>
    </Grid>
  )
}

export default AddTracks
