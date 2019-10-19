import React, { useState } from 'react'
import List from '@material-ui/core/List'
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
import { DropResult } from 'react-beautiful-dnd'
import { Typography } from '@material-ui/core'

interface AddTracksProps {
  seedTracks: ITrack[]
  setSeedTracks(seedTracks: ITrack[]): void
  handleNext(): void
  handleBack(): void
}

const AddTracks = ({
  seedTracks = [],
  setSeedTracks,
  handleNext,
  handleBack
}: AddTracksProps) => {
  const [tabIndex, setTabIndex] = useState(0)

  const handleTabChange = (event: any, index: number) => {
    setTabIndex(index)
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
      <Grid item xs={12}>
        {tabIndex === 0 && (isEmpty(seedTracks) ? (
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
        ))}
        {tabIndex === 1 && (
          <SelectTracks
            onTrackSelected={(track: ITrack) => {
              setSeedTracks([...seedTracks, track])
            }}
            filterList={seedTracks}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default AddTracks
