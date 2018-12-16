import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid/Grid'
import Hidden from '@material-ui/core/Hidden/Hidden'
import { WithStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography/Typography'
import { History } from 'history'
import { map, sortBy } from 'lodash'
import _ from 'lodash'
import moment from 'moment'
import * as React from 'react'
import { Link } from 'react-router-dom'
import IEventState from '../event/IEventState'
import NoEvents from '../event/NoEvents'
import IAction from '../IAction'
import LoadingSpinner from '../loading/LoadingSpinner'
import IPlaylist from '../playlist/IPlaylist'
import IUser from '../user/IUser'
import IUserState from '../user/IUserState'
import PlaylistCard from './PlaylistCard'

const decorate = withStyles(() => ({
  buttonGray: {
    color: '#979797'
  },
  buttonOrange: {
    color: '#FFB000'
  }
}))

interface IEventsProps {
  events: IEventState
  user: IUserState
  history: History
  playlists: IPlaylist[]
  getEvents(): IAction
  fetchPlaylists(user: IUser): IAction
}

class PlatlistsView extends React.Component<IEventsProps & WithStyles> {
  public componentDidMount() {
    if (this.props.user.data) {
      this.props.getEvents()
      this.props.fetchPlaylists(this.props.user.data)
    }
  }

  public renderPlayList = (playlists: IPlaylist[], noEventsMessage: string) => (
    <React.Fragment>
      {playlists.length < 1 && (
        <Typography
          className="eventsListCaption"
          align="center"
          variant="body2"
          gutterBottom={true}
        >
          {noEventsMessage}
        </Typography>
      )}

      <div className="eventsList">
        {map(
          sortBy(playlists, (playlist: IPlaylist) => playlist.followers),
          (playlist: IPlaylist, i) => (
            <PlaylistCard key={i} playlist={playlist} />
          )
        )}
      </div>
    </React.Fragment>
  )

  public render() {
    const { history, classes, playlists } = this.props
    const { events, eventsLoading } = this.props.events
    const currentPath = history.location.pathname

    const now = moment()

    const allPlaylists = playlists
    let pastPlaylists: any[] = []
    let upcomingPlaylists: any[] = []

    if (!!events) {
      pastPlaylists = _.uniqBy(
        events
          .filter(event => event.startDateTime.isBefore(now))
          .map(event => event.playlist),
        'id'
      )
      upcomingPlaylists = _.uniqBy(
        events
          .filter(event => event.startDateTime.isAfter(now))
          .map(event => event.playlist),
        'id'
      )
    }

    return (
      <div className="events">
        {eventsLoading && <LoadingSpinner />}

        {!eventsLoading && (!events || events.length < 1) && <NoEvents />}

        {!eventsLoading &&
          !!events &&
          playlists &&
          playlists.length > 0 && (
            <React.Fragment>
              <Grid container={true} spacing={24} direction="row">
                <Hidden xsDown={true}>
                  <Grid item={true} sm={12}>
                    <Link to="/all-playlists">
                      <Button
                        variant="text"
                        className={
                          currentPath === '/all-playlists'
                            ? classes.buttonOrange
                            : classes.button
                        }
                      >
                        ALL
                      </Button>
                    </Link>
                    <Link to="/past-playlists">
                      <Button
                        variant="text"
                        className={
                          currentPath === '/past-playlists'
                            ? classes.buttonOrange
                            : classes.button
                        }
                      >
                        PAST PLAYLISTS
                      </Button>
                    </Link>
                    <Link to="/upcoming-playlists">
                      <Button
                        variant="text"
                        className={
                          currentPath === '/upcoming-playlists'
                            ? classes.buttonOrange
                            : classes.button
                        }
                      >
                        UPCOMING PLAYLISTS
                      </Button>
                    </Link>
                  </Grid>
                </Hidden>
                <Grid item={true} md={12}>
                  {currentPath === '/all-playlists' &&
                    this.renderPlayList(allPlaylists, 'no playlists')}
                  {currentPath === '/past-playlists' &&
                    this.renderPlayList(pastPlaylists, 'no playlists')}
                  {currentPath === '/upcoming-playlists' &&
                    this.renderPlayList(upcomingPlaylists, 'no playlists')}
                </Grid>
              </Grid>
            </React.Fragment>
          )}
      </div>
    )
  }
}

export default decorate(PlatlistsView)
