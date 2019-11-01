import React from 'react'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import isEmpty from 'lodash/isEmpty'
import LinkButton from 'components/LinkButton'
import IEvent from 'event/IEvent'

interface SummaryProps {
  status: string
  event: IEvent
}

const Summary = ({ status, event }: SummaryProps) => {
  if (status === 'failure') {
    return <div>Oh shit</div>
  }

  if (isEmpty(event)) {
    return <div>Test</div>
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
      </FormGroup>
    </div>
  )
}

export default Summary
