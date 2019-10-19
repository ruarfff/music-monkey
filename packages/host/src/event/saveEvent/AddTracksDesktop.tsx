import React from 'react'
import List from '@material-ui/core/List'
import FormGroup from '@material-ui/core/FormGroup'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import remove from 'lodash/remove'
import arrayMove from 'util/arrayMove'
import ITrack from 'track/ITrack'
import TrackList from 'track/TrackList'
import SelectTracks from './SelectTracksContainer'
import { DropResult } from 'react-beautiful-dnd'

interface AddTracksDesktopProps {
  seedTracks: ITrack[]
  setSeedTracks(seedTracks: ITrack[]): void
  handleNext(): void
  handleBack(): void
}

const AddTracksDesktop = ({
  seedTracks = [],
  setSeedTracks,
  handleNext,
  handleBack
}: AddTracksDesktopProps) => {
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
      <Grid item xs={6}>
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
      </Grid>
      <Grid item xs={6}>
        <SelectTracks
          onTrackSelected={(track: ITrack) => {
            setSeedTracks([...seedTracks, track])
          }}
          filterList={seedTracks}
        />
      </Grid>      
    </Grid>
  )
}

export default AddTracksDesktop
