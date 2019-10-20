import React from 'react'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import LinkButton from 'components/LinkButton'

interface SummaryProps {
  backPath: string
}

const Summary = ({ backPath }: SummaryProps) => {
  return (
    <div>
      <Typography>Summary!</Typography>
      <FormGroup className="SaveEvent-form-actions">
        <LinkButton to={backPath} variant="contained" color="secondary">
          Back
        </LinkButton>
      </FormGroup>
    </div>
  )
}

export default Summary
