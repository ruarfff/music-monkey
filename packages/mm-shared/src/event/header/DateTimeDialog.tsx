import React, { FC } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import { Event } from '../../event'
import Transition from './Transition'
import DialogTitle from './DialogTitle'

interface DateTimeDialogProps {
  event: Event
  open: boolean
  onClose(): void
}

const DateTimeDialog: FC<DateTimeDialogProps> = ({ event, open, onClose }) => (
  <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={onClose}
    fullWidth={true}
    aria-labelledby="date-time-dialog-title"
    aria-describedby="date-time-dialog-description"
  >
    <DialogTitle id="date-time-dialog-title" onClose={onClose}>
      {'Date & Time'}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="date-time-dialog-description" align="center">
        {event.startDateTime.format(' Do MMMM, YYYY')} to{' '}
        {event.endDateTime.format(' Do MMMM, YYYY')}
      </DialogContentText>
    </DialogContent>
  </Dialog>
)

export default DateTimeDialog
