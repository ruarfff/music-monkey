import { ListItemIcon } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid/Grid'
import List from '@material-ui/core/List/List'
import ListItem from '@material-ui/core/ListItem/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction'
import { WithStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import DoneAll from '@material-ui/icons/DoneAll'
import classNames from 'classnames'
import { isEmpty, uniqBy } from 'lodash'
import * as React from 'react'
import IAction from '../../../IAction'
import IPlaylist from '../../../playlist/IPlaylist'
import IDecoratedSuggestion from '../../../suggestion/IDecoratedSuggestion'
import ISuggestion from '../../../suggestion/ISuggestion'
import ITrack from '../../../track/ITrack'
import { formatDuration } from '../../../util/formatDuration'
import './Styles/EventSuggestions.scss'

const decorate = withStyles(() => ({
  reject: {
    background: '#EB5757',
    color: 'white'
  },
  accept: {
    background: '#27AE60',
    color: 'white'
  },
  trackBand: {
    padding: 0,
    fontWeight: 800
  },
  trackName: {
    padding: 0
  },
  listItem: {
    borderBottom: '1px solid #979797'
  },
  listItemContent: {
    maxWidth: '700px'
  }
}))

interface IEventSuggestionsProps {
  suggestions: IDecoratedSuggestion[]
  playlist: IPlaylist
  stageAllSuggestions(suggestions: IDecoratedSuggestion[]): IAction
  stageSuggestion(suggestion: ISuggestion): IAction
  rejectSuggestion(suggestion: ISuggestion): IAction
}

interface IEventSuggestionsState {
  tracksBeingRemoved: ITrack
}

class EventSuggestions extends React.Component<
  IEventSuggestionsProps & WithStyles,
  IEventSuggestionsState
> {
  constructor(props: IEventSuggestionsProps & WithStyles) {
    super(props)
    this.state = { tracksBeingRemoved: {} } as IEventSuggestionsState
  }

  public render() {
    const { suggestions, playlist } = this.props

    const playlistTracks = playlist.tracks.items.map((track) => track.track.uri)
    let filteredSuggestions = suggestions

    if(!isEmpty(suggestions)) {
      filteredSuggestions = uniqBy(suggestions
        .filter((suggestedTrack) => playlistTracks.indexOf(suggestedTrack.track.uri) === -1), 'track.uri')
    }

    if (!filteredSuggestions || filteredSuggestions.length < 1) {
      return (
        <Typography align="center" variant="subtitle1">
          Currently no Suggestions
        </Typography>
      )
    }


    return (
      <div className="EventSuggestions-root">
        <Grid container={true} spacing={24}>
          <Grid item={true} sm={12}>
            {filteredSuggestions.length > 0 &&
            this.renderAcceptButtons(filteredSuggestions)}
          </Grid>
          <Grid item={true} sm={12}>
            <List>
              {filteredSuggestions.map((decoratedSuggestion, index) =>
                this.renderSuggestion(decoratedSuggestion, index)
              )}
            </List>
          </Grid>
        </Grid>
      </div>
    )
  }

  private renderSuggestion = (
    decoratedSuggestion: IDecoratedSuggestion,
    index: number
  ) => {
    const { track, user } = decoratedSuggestion
    const { classes } = this.props
    let trackImage = <span />
    if (track.album && track.album.images && track.album.images.length > 0) {
      trackImage = (
        <ListItemIcon>
          <img
            className="EventSuggestions-trackImage"
            src={track.album.images[track.album.images.length - 1].url}
            alt={track.name}
          />
        </ListItemIcon>
      )
    }
    let userAccountIcon = (
      <AccountCircle className="EventSuggestions-avatar-small" />
    )
    if (user.image) {
      userAccountIcon = (
        <Avatar
          alt={user.displayName}
          src={user.image}
          className="EventSuggestions-avatar"
        />
      )
    }

    return (
      <Grid
        key={index}
        // in={track.uri !== this.state.tracksBeingRemoved.uri}
        // direction="right"
        // mountOnEnter={false}
        // unmountOnExit={true}
      >
        <ListItem className={classes.listItem} dense={true} button={true}>
          {trackImage}
          <div className={'listItemContent'}>
            <div className={'listItemTextBlock'}>
              <div className={'listItemArtist'}>
              <span className={classes.trackBand}>
                {track.album.artists[0].name}
              </span>
                <span>
                {track.name}
              </span>
              </div>
              <span className={'listItemDuration'}>
              {formatDuration(track.duration_ms)}
            </span>
            </div>
            {track.preview_url ? (
              <audio
                src={track.preview_url}
                controls={true}
                className="EventSuggestions-audio"
                preload="none"
              />
            ) : (
              <audio
                src={''}
                controls={true}
                className="EventSuggestions-audio"
                preload="none"
              />
            )}
          </div>

          {userAccountIcon}
          <ListItemSecondaryAction>
            <Button
              className={classes.reject}
              variant="contained"
              onClick={this.handleSuggestionRejected(decoratedSuggestion)}
            >
              REJECT
            </Button>
            <Button
              className={classes.accept}
              variant="contained"
              onClick={this.handleSuggestionAccepted(decoratedSuggestion)}
            >
              ACCEPT
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      </Grid>
    )
  }

  private handleSuggestionAccepted = (
    decoratedSuggestion: IDecoratedSuggestion
  ) => () => {
    const { track, suggestion } = decoratedSuggestion
    this.setState({ tracksBeingRemoved: track })
    setTimeout(() => {
      this.setState({ tracksBeingRemoved: {} as ITrack })
      this.props.stageSuggestion(suggestion)
    }, 700)
  }

  private handleSuggestionRejected = (
    decoratedSuggestion: IDecoratedSuggestion
  ) => () => {
    const { track, suggestion } = decoratedSuggestion
    this.setState({ tracksBeingRemoved: track })
    setTimeout(() => {
      this.setState({ tracksBeingRemoved: {} as ITrack })
      this.props.rejectSuggestion(suggestion)
    }, 700)
  }

  private handleAcceptAllClicked = (filteredSuggestions: IDecoratedSuggestion[]) => () => {
    this.props.stageAllSuggestions(filteredSuggestions)
  }

  private renderAcceptButtons = (filteredSuggestions: IDecoratedSuggestion[]) => {
    return (
      <div>
        <Button
          className="EventSuggestions-button"
          variant="contained"
          color="primary"
          onClick={this.handleAcceptAllClicked(filteredSuggestions)}
        >
          <DoneAll
            className={classNames(
              'EventSuggestions-leftIcon',
              'EventSuggestions-iconSmall'
            )}
          />
          Accept All{' '}
        </Button>
      </div>
    )
  }
}

export default decorate(EventSuggestions)
