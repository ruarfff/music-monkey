import React from 'react'
import { Avatar } from '@material-ui/core'
import { WithStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid/Grid'
import IconButton from '@material-ui/core/IconButton/IconButton'
import Snackbar from '@material-ui/core/Snackbar/Snackbar'
import withStyle from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import CloseIcon from '@material-ui/icons/Close'
import { Action, Event, EventGuest } from 'mm-shared'
import SharePopup from 'components/ShareEvent/SharePopup'

const decorated = withStyle(() => ({
  noAvatar: {
    fontSize: '40px'
  },
  inviteLink: {
    marginTop: '20px'
  },
  guestListTitle: {
    fontSize: '20px',
    marginBottom: '20px'
  },
  guestName: {
    width: '100%'
  },
  guestWrapper: {
    width: '70px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))

interface IEventGuestsRightSideViewProps {
  message: string
  event: Event
  copyEventInvite(): Action
  clearMessage(): Action
}

class EventGuestsRightSideView extends React.PureComponent<
  IEventGuestsRightSideViewProps & WithStyles
> {
  public render() {
    const { event, copyEventInvite, classes } = this.props

    const inviteId = event && event.invites ? event.invites[0] : ''

    if (!event || !event.guests || event.guests.length < 1) {
      return (
        <Grid container={true} justify={'center'} spacing={3}>
          <Grid className={classes.inviteLink} item={true}>
            <SharePopup
              event={event}
              clearMessage={this.props.clearMessage}
              message={this.props.message}
              inviteId={inviteId}
              onCopyEventInvite={copyEventInvite}
            />
          </Grid>
          <Typography align="center" variant="subtitle1">
            No guests have opened their invite yet.
          </Typography>
        </Grid>
      )
    }

    return (
      <div className="EventSuggestions-root">
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={!!this.props.message}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id="message-id">{this.props.message}</span>}
          action={
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          }
        />
        <Grid container={true} justify={'center'} spacing={3}>
          <Grid className={classes.inviteLink} item={true}>
            <SharePopup
              event={event}
              clearMessage={this.props.clearMessage}
              message={this.props.message}
              inviteId={inviteId}
              onCopyEventInvite={copyEventInvite}
            />
          </Grid>
          <Grid item={true} sm={12}>
            <Typography
              className={classes.guestListTitle}
              align="center"
              variant="subtitle1"
            >
              Guest List
            </Typography>
            <Grid
              container={true}
              justify={'space-evenly'}
              alignItems={'flex-start'}
            >
              {event.guests.map((eventGuest, index) =>
                this.renderEventGuest(eventGuest, classes, index)
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }

  private handleClose = () => {
    this.props.clearMessage()
  }

  private renderEventGuest = (
    eventGuest: EventGuest,
    classes: any,
    index: number
  ) => {
    const { user } = eventGuest
    const name = !user.displayName
      ? user.isGuest
        ? 'Logged in as guest'
        : 'Anonymous'
      : user.displayName
    return (
      <Grid
        item={true}
        container={true}
        className={classes.guestWrapper}
        key={index}
        direction={'column'}
      >
        {user.image ? (
          <Avatar alt={user.displayName} src={user.image} />
        ) : (
          <AccountCircle className={classes.noAvatar} />
        )}
        <Typography className={classes.guestName} align={'center'}>
          {name}
        </Typography>
      </Grid>
    )
  }
}

export default decorated(EventGuestsRightSideView)
