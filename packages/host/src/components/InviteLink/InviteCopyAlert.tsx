import IconButton from '@material-ui/core/IconButton/IconButton'
import Snackbar from '@material-ui/core/Snackbar/Snackbar'
import CloseIcon from '@material-ui/icons/Close'
import * as React from 'react'

interface IInviteCopyAlertProps {
  message: string
  onClose(): void
}

const InviteCopyAlert = ({ message, onClose }: IInviteCopyAlertProps) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    open={true}
    onClose={onClose}
    autoHideDuration={1200}
    ContentProps={{
      'aria-describedby': 'message-id'
    }}
    message={<span id="message-id">{message}</span>}
    action={[
      <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
    ]}
  />
)

export default InviteCopyAlert
