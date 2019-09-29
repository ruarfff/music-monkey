import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import { WithStyles } from '@material-ui/core/es'
import Grid from '@material-ui/core/Grid/Grid'
import IconButton from '@material-ui/core/IconButton/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Snackbar from '@material-ui/core/Snackbar/Snackbar'
import withStyle from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import CloseIcon from '@material-ui/icons/Close'
import * as React from 'react'
import SharePopup from '../../../components/ShareEvent/SharePopup'
import IEvent from '../../../event/IEvent'
import IEventGuest from '../../../event/IEventGuest'
import IAction from '../../../IAction'

const decorated = withStyle(() => ({
  filter: {
    marginTop: '20px',
    padding: '0 30px'
  },
  guestsContainer: {
    padding: '30px'
  },
  guestWrapper: {
    width: '130px',
    height: '160px',
    borderRadius: '4px',
    border: '3px solid #ffb000',
    marginRight: '20px'
  },
  noAvatar: {
    fontSize: '40px'
  },
  pending: {
    width: '130px',
    height: '160px',
    borderRadius: '4px',
    border: '3px solid #3aabd1',
    marginRight: '20px'
  },
  guestName: {
    width: '100%',
  }
}))

interface IEventGuestsProps {
  event: IEvent
  message: string
  copyEventInvite(): IAction
  clearMessage(): IAction
}

class EventGuests extends React.PureComponent<IEventGuestsProps & WithStyles> {
  public state = {
    anchorEl: null,
    filter: 'all'
  }

  public handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  public handleClickMenuItem = (event: any) => {
    this.setState({ filter: event.target.textContent.toLowerCase() })

    this.setState({ anchorEl: event.currentTarget })

    this.handleClose()
  }

  public handleClose = () => {
    this.setState({ anchorEl: null })
  }

  public render() {
    const { anchorEl } = this.state
    const { event, classes, copyEventInvite } = this.props

    const inviteId = event && event.invites ? event.invites[0] : ''

    if (!event || !event.guests || event.guests.length < 1) {
      return (
        <Grid container={true} justify={'center'} direction={'column'}>
          <Grid container={true} justify={'center'}>
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

    const filteredGuests =
      this.state.filter !== 'all'
        ? event.guests.filter(
            guest => guest.rsvp.status.toLocaleLowerCase() === this.state.filter
          )
        : event.guests

    return (
      <div className="EventSuggestions-root">
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={!!this.props.message}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.message}</span>}
          action={
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleCloseMessage}
            >
              <CloseIcon />
            </IconButton>
          }
        />
        <Grid
          container={true}
          className={classes.filter}
          justify={'flex-end'}
          spacing={24}
        >
          <Button
            aria-owns={anchorEl ? 'simple-menu' : ''}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            filter
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClickMenuItem}>All</MenuItem>
            <MenuItem onClick={this.handleClickMenuItem}>Pending</MenuItem>
            <MenuItem onClick={this.handleClickMenuItem}>I'm Going</MenuItem>
            <MenuItem onClick={this.handleClickMenuItem}>I'm not going</MenuItem>
            <MenuItem onClick={this.handleClickMenuItem}>Maybe</MenuItem>
          </Menu>
          <SharePopup
            event={event}
            clearMessage={this.props.clearMessage}
            message={this.props.message}
            inviteId={inviteId}
            onCopyEventInvite={copyEventInvite}
          />
        </Grid>
        <Grid
          container={true}
          className={classes.guestsContainer}
          spacing={24}
        >
          {filteredGuests.map(eventGuest =>
            this.renderEventGuest(eventGuest, classes)
          )}
        </Grid>
      </div>
    )
  }

  private renderEventGuest = (eventGuest: IEventGuest, classes: any) => {
    const { user, rsvp } = eventGuest
    const name = !user.displayName
      ? user.isGuest
        ? 'Logged in as guest'
        : 'Anonymous'
      : user.displayName
    return (
      <Grid
        key={user.userId}
        className={
          rsvp.status === 'I\'m Going' ? classes.guestWrapper : classes.pending
        }
        item={true}
        container={true}
        justify={'center'}
      >
        {user.image && <Avatar alt={user.displayName} src={user.image} />}
        {!user.image && <AccountCircle className={classes.noAvatar} />}
        <Typography className={classes.guestName} align={'center'}>
          {name}
        </Typography>
        <Typography className={classes.guestName} align={'center'}>
          {eventGuest.rsvp.status}
          </Typography>
      </Grid>
    )
  }

  private handleCloseMessage = () => {
    this.props.clearMessage()
  }
}

export default decorated(EventGuests)
