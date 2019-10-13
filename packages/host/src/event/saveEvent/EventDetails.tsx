import React from 'react'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import Button from '@material-ui/core/Button'

interface EventDetailsProps {
  handleNext(): void
  handleBack(): void
}

const EventDetails = ({ handleNext, handleBack }: EventDetailsProps) => {
  return (
    <div>
      <Typography>Event details!</Typography>

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

export default EventDetails
