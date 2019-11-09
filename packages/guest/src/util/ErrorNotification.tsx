import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import CloseIcon from '@material-ui/icons/Close'
import { Icon } from '@material-ui/core'
import './ErrorNotification.scss'

interface IErrorNotificationProps {
  message: string
  onClose?(): void
}

const ErrorNotification = ({ message, onClose }: IErrorNotificationProps) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      open={true}
      autoHideDuration={4000}
    >
      <SnackbarContent
        className="ErrorNotification-root"
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className="ErrorNotification-message">
            <Icon className="ErrorNotification-icon" />
            {message}
          </span>
        }
        action={
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon className="ErrorNotification-icon" />
          </IconButton>
        }
      />
    </Snackbar>
  )
}

export default ErrorNotification
