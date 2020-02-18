import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import EventSettingsView from './EventSettings'

interface EventSettingsDialogProps {
  open: boolean
  handleClose(): void
}

const EventSettingsDialog = ({
  open,
  handleClose
}: EventSettingsDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="event-settings-dialog-title"
    >
      <DialogTitle id="event-settings-dialog-title">Event Settings</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Control how your guests suggest tracks.
        </DialogContentText>
        <EventSettingsView />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EventSettingsDialog
