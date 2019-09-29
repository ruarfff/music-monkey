import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import { withStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import classNames from 'classnames'
import * as React from 'react'

import { createStyles, Icon, Theme, WithStyles } from '@material-ui/core'

const styles = (theme: Theme) =>
  createStyles({
    error: {
      backgroundColor: theme.palette.error.dark
    },
    icon: {
      fontSize: 20
    },
    iconVariant: {
      opacity: 0.9
    },
    message: {
      display: 'flex',
      alignItems: 'center'
    }
  })

interface IErrorNotificationProps extends WithStyles<typeof styles> {
  message: string
  onClose?(): void
}

const ErrorNotification = withStyles(styles)(
  ({ classes, message, onClose }: IErrorNotificationProps) => {
    const { error } = classes
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
          className={error}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <Icon className={classNames(classes.icon, classes.iconVariant)} />
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
              <CloseIcon className={classes.icon} />
            </IconButton>
          }
        />
      </Snackbar>
    )
  }
)

export default ErrorNotification
