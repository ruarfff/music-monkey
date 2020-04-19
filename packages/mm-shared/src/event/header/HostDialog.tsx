import React, { FC } from 'react'
import Dialog from '@material-ui/core/Dialog'
import { Avatar } from '@material-ui/core'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import { Event } from '../../event'
import Transition from './Transition'
import DialogTitle from './DialogTitle'

interface HostDialogProps {
  event: Event
  open: boolean
  onClose(): void
}

const HostDialog: FC<HostDialogProps> = ({ event, open, onClose }) => (
  <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={onClose}
    fullWidth={true}
    aria-labelledby="host-dialog-title"
    aria-describedby="host-dialog-description"
  >
    <DialogTitle id="host-dialog-title" onClose={onClose}>
      Host
    </DialogTitle>
    <DialogContent>
      <Avatar
        key={event.hostData.userId}
        alt={event.hostData.displayName || 'H'}
        src={event.hostData.image}
      />
      <DialogContentText id="host-dialog-description">
        {event.hostData.displayName || 'The Party Host'}
      </DialogContentText>
    </DialogContent>
  </Dialog>
)

export default HostDialog
