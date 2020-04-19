import React, { FC } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import { Event } from '../../event'
import { MapComponent } from '../../'
import Transition from './Transition'
import DialogTitle from './DialogTitle'
import './LocationDialog.scss'

interface LocationDialogProps {
  event: Event
  open: boolean
  onClose(): void
}

const LocationDialog: FC<LocationDialogProps> = ({ event, open, onClose }) => (
  <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={onClose}
    fullWidth={true}
    aria-labelledby="location-dialog-title"
    aria-describedby="location-dialog-description"
  >
    <DialogTitle id="location-dialog-title" onClose={onClose}>
      Location
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="location-dialog-description">
        {event.location.address}
      </DialogContentText>
      <MapComponent coords={event.location.latLng} />
    </DialogContent>
  </Dialog>
)

export default LocationDialog
