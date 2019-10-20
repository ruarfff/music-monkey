import React, { useState } from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { Typography, Hidden, List } from '@material-ui/core'
import FormGroup from '@material-ui/core/FormGroup'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import remove from 'lodash/remove'
import isEmpty from 'lodash/isEmpty'
import arrayMove from 'util/arrayMove'
import ITrack from 'track/ITrack'
import TrackList from 'track/TrackList'
import SelectTracks from './SelectTracksContainer'

interface AddTracksProps {
  isDesktop: boolean
  seedTracks: ITrack[]
  setSeedTracks(seedTracks: ITrack[]): void
  handleNext(): void
  handleBack(): void
}

const AddTracks = ({
  isDesktop,
  seedTracks = [],
  setSeedTracks,
  handleNext,
  handleBack
}: AddTracksProps) => {
  const [tabIndex, setTabIndex] = useState(0)

  const handleTabChange = (_: any, index: number) => {
    setTabIndex(index)
  }

  const Playlist = () => {
    return (isEmpty(seedTracks) ? (
    <Typography variant="h5" align="center">
      No tracks yet
    </Typography>
    ) : (
    <List>
      <TrackList
        onTrackRemoved={(track: ITrack) => {
          setSeedTracks(
            remove(seedTracks, seedTrack => {
              return seedTrack.id !== track.id
            })
          )
        }}
        onDragEnd={(result: DropResult) => {
          if (!result.destination) {
            return
          }
          const tracks = [...seedTracks]
          arrayMove(tracks, result.source.index, result.destination.index)

          setSeedTracks(tracks)
        }}
        tracks={seedTracks}
      />
    </List>
    ))
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormGroup className="SaveEvent-form-actions">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              handleBack()
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleNext()
            }}
          >
            Next
          </Button>
        </FormGroup>
      </Grid>

      <Hidden smUp>
        <Grid item xs={12}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Playlist" />
            <Tab label="Add Tracks" />
          </Tabs>
        </Grid>
      </Hidden>

      {(isDesktop || tabIndex === 0) && (
        <Grid item xs={isDesktop ? 6 : 12}>
          <Playlist />
        </Grid>
      )}
      {(isDesktop || tabIndex === 1) && (
        <Grid item xs={isDesktop ? 6 : 12}>
          <SelectTracks
            onTrackSelected={(track: ITrack) => {
              setSeedTracks([...seedTracks, track])
            }}
            filterList={seedTracks}
          />
        </Grid>
      )}
    </Grid>
  )
}

export default AddTracks
