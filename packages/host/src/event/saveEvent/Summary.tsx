import React from 'react'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import Button from '@material-ui/core/Button'

interface SummaryProps {
  handleNext(): void
  handleBack(): void
}

const Summary = ({ handleNext, handleBack }: SummaryProps) => {
  return (
    <div>
      <Typography>Summary!</Typography>

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
      </FormGroup>
    </div>
  )
}

export default Summary
