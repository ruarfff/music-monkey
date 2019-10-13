import React from 'react'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import Button from '@material-ui/core/Button'

interface AddTracksProps {
  handleNext(): void
  handleBack(): void
}

const AddTracks = ({ handleNext, handleBack }: AddTracksProps) => {
  return (
    <div>
      <Typography>Add tracks!</Typography>

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
