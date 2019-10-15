import React, { useState } from 'react'
import List from '@material-ui/core/List'
import FormGroup from '@material-ui/core/FormGroup'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import remove from 'lodash/remove'
import ITrack from 'track/ITrack'
import TrackList from 'track/TrackList'
import SelectTracks from './SelectTracksContainer'

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
  const [tabIndex, setTabIndex] = useState(0)

  const handleTabChange = (event: any, index: number) => {
    setTabIndex(index)
  }

  return (
    <div>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Tracks" />
        <Tab label="Add Tracks" />
      </Tabs>
      {tabIndex === 0 && (
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
      )}
      {tabIndex === 1 && (
        <SelectTracks onTrackSelected={() => {}} filterList={seedTracks} />
      )}

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
