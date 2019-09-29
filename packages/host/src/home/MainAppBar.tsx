import React from 'react'
import AppBar from '@material-ui/core/AppBar/AppBar'
import Avatar from '@material-ui/core/Avatar/Avatar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton/IconButton'
import Menu from '@material-ui/core/Menu/Menu'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import { withStyles, WithStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import Typography from '@material-ui/core/Typography/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { Link } from 'react-router-dom'
import IAction from 'IAction'
import eventIcon from 'assets/monkey_logo.png'
import IEvent from 'event/IEvent'
import IUser from 'user/IUser'

const decorate = withStyles(({ transitions, zIndex }) => ({
  root: {},
  appBar: {
    transition: transitions.create(['width', 'margin'], {
      duration: transitions.duration.leavingScreen,
      easing: transitions.easing.sharp
    }),
    zIndex: zIndex.drawer + 1,
    position: 'relative',
    boxShadow: 'none',
    backgroundColor: 'white',
    color: 'black'
  },
  hide: {
    display: 'none'
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  profile: {
    marginRight: 12,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  title: {
    flex: 1,
    cursor: 'pointer',
    fontSize: '34px',
    lineHeight: '40px',
    padding: '16px'
  },
  addEventBtn: {
    textTransform: 'uppercase',
    padding: '8px 18px'
  },
  notification: {
    color: '#979797'
  },
  userName: {
    color: '#979797'
  },
  imageInButton: {
    marginRight: '5px',
    height: '20px'
  }
}))

interface IMainAppBarProps {
  user: IUser
  location: string
  event: IEvent
  logout(): IAction
  handleTitleClicked(): void
}

class MainAppBar extends React.Component<IMainAppBarProps & WithStyles> {
  public state = {
    anchorEl: undefined
  }

  public handleMenu = (event: any) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  public handleClose = () => {
    this.setState({ anchorEl: undefined })
  }

  public menuName = (history: string) => {
    const { event } = this.props

    switch (history) {
      case '/':
        return 'Dashboard'
      case '/create-event':
        return 'Create Event'
      case '/all-events':
        return 'Events'
      case '/upcoming-events':
        return 'Events'
      case '/past-events':
        return 'Events'
      case `/events/${event && event.eventId}`:
        return event.name
      case '/account':
        return 'Account Settings'
      case '/insights':
        return 'Insights'
      default:
        return 'Dashboard'
    }
  }

  public render() {
    const { classes, user, location, handleTitleClicked } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)
    const userHasProfileImage = !!user && !!user.image
    const userHasName = !!user && !!user.displayName

    const profilePic = (
      <div className={classes.profile}>
        {location !== '/create-event' && location !== '/' && (
          <Link to="/create-event" className="Home-create-event-link">
            <Button
              variant="contained"
              size="small"
              color="secondary"
              className={classes.addEventBtn}
            >
              <img className={classes.imageInButton} src={eventIcon} alt="" />
              Create new event
            </Button>
          </Link>
        )}

        <IconButton
          aria-owns={open ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          {userHasProfileImage ? (
            <Avatar alt="user profile" src={user.image} />
          ) : (
            <AccountCircle />
          )}
        </IconButton>
        {userHasName ? (
          <Typography className={classes.userName} onClick={handleTitleClicked}>
            {user.displayName}
          </Typography>
        ) : (
          <Typography className={classes.userName} onClick={handleTitleClicked}>
            Name
          </Typography>
        )}
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'top'
          }}
          transformOrigin={{
            horizontal: 'right',
            vertical: 'top'
          }}
          open={open}
          onClose={this.handleClose}
        >
          <Link to={'/account'}>
            <MenuItem onClick={this.handleClose}>My Account</MenuItem>
          </Link>
          <MenuItem onClick={this.props.logout}>Logout</MenuItem>
        </Menu>
      </div>
    )

    return (
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.title}
            onClick={handleTitleClicked}
          >
            {this.menuName(location)}
          </Typography>
          {profilePic}
        </Toolbar>
      </AppBar>
    )
  }
}

export default decorate(MainAppBar)
