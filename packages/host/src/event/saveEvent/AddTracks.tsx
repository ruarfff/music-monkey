import React from 'react'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import FormGroup from '@material-ui/core/FormGroup'
import Button from '@material-ui/core/Button'
import remove from 'lodash/remove'
import ITrack from 'track/ITrack'
import TrackList from 'track/TrackList'

interface AddTracksProps {
  seedTracks: ITrack[]
  setSeedTracks(seedTracks: ITrack[]): void
  handleNext(): void
  handleBack(): void
}

const AddTracks = ({
  seedTracks,
  setSeedTracks,
  handleNext,
  handleBack
}: AddTracksProps) => {
  console.log(seedTracks)
  return (
    <div>
      <div>
        <Typography>Add tracks!</Typography>
        <List>
          <TrackList
            onTrackRemoved={(track: ITrack) => {
              setSeedTracks(
                remove(seedTracks, seedTrack => {
                  return seedTrack.id !== track.id
                })
              )
            }}
            onDragEnd={() => {}}
            tracks={seedTracks}
          />
        </List>
      </div>

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
    </div>
  )
}

export default AddTracks
