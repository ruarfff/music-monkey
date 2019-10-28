import React from 'react'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import LinkButton from 'components/LinkButton'
import IEvent from 'event/IEvent'

interface SummaryProps {
  backPath: string
  status: string
  event: IEvent
}

const Summary = ({ backPath, status, event }: SummaryProps) => {
  if (status === 'failure') {
    return <div>Oh shit</div>
  }
  return (
    <div>
      <Typography>Summary!</Typography>
      <Typography>You created an event called {event.name}</Typography>
      <FormGroup className="SaveEvent-form-actions">
        <LinkButton
          to={'/events/' + event.eventId}
          variant="contained"
          color="primary"
        >
          Got to Event
        </LinkButton>
        <LinkButton to={backPath} variant="contained" color="secondary">
          Back
        </LinkButton>
      </FormGroup>
    </div>
  )
}

export default Summary
