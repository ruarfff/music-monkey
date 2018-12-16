import { Avatar } from '@material-ui/core'
import { WithStyles } from '@material-ui/core/es'
import Grid from '@material-ui/core/Grid/Grid'
import withStyle from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import * as React from 'react'
import SharePopup from '../../../components/ShareEvent/SharePopup'
import IEvent from '../../../event/IEvent'
import IEventGuest from '../../../event/IEventGuest'
import IAction from '../../../IAction'
import '../Playlist/Styles/EventSuggestions.scss'

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
    width: '100%',
  },
  guestWrapper: {
    width: '70px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}))

interface IEventGuestsRightSideViewProps {
  message: string
  event: IEvent
  copyEventInvite(): IAction
  clearMessage(): IAction
}

class EventGuestsRightSideView extends React.PureComponent<
  IEventGuestsRightSideViewProps & WithStyles
> {
  public render() {
    const { event, copyEventInvite, classes } = this.props

    const inviteId = event && event.invites ? event.invites[0] : ''

    if (!event || !event.guests || event.guests.length < 1) {
      return (
        <Grid container={true} justify={'center'} spacing={24}>
          <Typography align="center" variant="subtitle1">
            No guests have opened their invite yet.
          </Typography>
          <Grid className={classes.inviteLink} item={true}>
            <SharePopup
              clearMessage={this.props.clearMessage}
              message={this.props.message}
              inviteId={inviteId}
              onCopyEventInvite={copyEventInvite}
            />
          </Grid>
        </Grid>
      )
    }

    return (
      <div className="EventSuggestions-root">
        <Grid container={true} justify={'center'} spacing={24}>
          <Grid item={true} sm={12}>
            <Typography
              className={classes.guestListTitle}
              align="center"
              variant="subtitle1"
            >
              Guest List
            </Typography>
            <Grid container={true} justify={'space-evenly'}>
              {event.guests.map((eventGuest, index) =>
                this.renderEventGuest(eventGuest, classes, index)
              )}
            </Grid>
          </Grid>
          <Grid className={classes.inviteLink} item={true}>
            <SharePopup
              clearMessage={this.props.clearMessage}
              message={this.props.message}
              inviteId={inviteId}
              onCopyEventInvite={copyEventInvite}
            />
          </Grid>
        </Grid>
      </div>
    )
  }

  private renderEventGuest = (eventGuest: IEventGuest, classes: any, index: number) => {
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
        {user.image ?
          <Avatar alt={user.displayName} src={user.image} /> :
          <AccountCircle className={classes.noAvatar} />
        }
        <Typography className={classes.guestName} align={'center'}>{name}</Typography>
      </Grid>
    )
  }
}

export default decorated(EventGuestsRightSideView)
