import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import EventTextInput from './EventTextInput'

interface EventInitializeDialogProps {
  isValid: boolean
  open: boolean
  onCancel(): void
  onContinue(): void
}

const EventInitializeDialog = ({
  isValid,
  open,
  onCancel,
  onContinue
}: EventInitializeDialogProps) => {
  return (
    <div>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        aria-labelledby="event-init-dialog-title"
      >
        <DialogTitle id="event-init-title">Describe your Event</DialogTitle>
        <DialogContent>
          <EventTextInput name="eventName" label="Name" autoFocus />
          <EventTextInput
            name="eventDescription"
            multiline={true}
            label="Description"
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onCancel}>
            Cancel
          </Button>
          <Button color="primary" onClick={onContinue} disabled={!isValid}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default EventInitializeDialog
