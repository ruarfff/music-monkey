import React from 'react'
import { ListItemIcon } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid/Grid'
import List from '@material-ui/core/List/List'
import ListItem from '@material-ui/core/ListItem/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction'
import Typography from '@material-ui/core/Typography/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import DoneAll from '@material-ui/icons/DoneAll'
import { isEmpty, uniqBy } from 'lodash'
import { RouteComponentProps, withRouter } from 'react-router'
import IAction from 'IAction'
import IPlaylist from 'playlist/IPlaylist'
import IDecoratedSuggestion from 'suggestion/IDecoratedSuggestion'
import ISuggestion from 'suggestion/ISuggestion'
import ITrack from 'track/ITrack'
import formatDuration from 'util/formatDuration'
import './EventSuggestions.scss'

interface IEventSuggestionsProps extends RouteComponentProps<any> {
  suggestions: IDecoratedSuggestion[]
  playlist: IPlaylist
  saveEventPlaylist(
    eventId: string,
    playlist: IPlaylist,
    suggestions: Map<string, IDecoratedSuggestion>
  ): IAction
  stageAllSuggestions(suggestions: IDecoratedSuggestion[]): IAction
  stageSuggestion(suggestion: ISuggestion): IAction
  rejectSuggestion(suggestion: ISuggestion): IAction
}

interface IEventSuggestionsState {
  tracksBeingRemoved: ITrack
}

class EventSuggestions extends React.Component<
  IEventSuggestionsProps,
  IEventSuggestionsState
> {
  constructor(props: IEventSuggestionsProps) {
    super(props)
    this.state = { tracksBeingRemoved: {} } as IEventSuggestionsState
  }

  public render() {
    const { suggestions, playlist } = this.props

    const playlistTracks = playlist.tracks.items.map(track => track.track.uri)
    let filteredSuggestions = suggestions

    if (!isEmpty(suggestions)) {
      filteredSuggestions = uniqBy(
        suggestions.filter(
          suggestedTrack =>
            playlistTracks.indexOf(suggestedTrack.track.uri) === -1
        ),
        'track.uri'
      )
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

  private handleSavePlaylist = (
    decoratedSuggestions: IDecoratedSuggestion[]
  ) => () => {
    const { playlist, saveEventPlaylist } = this.props
    const eventId = this.props.match.params.eventId
    const suggestionMap = new Map()
    decoratedSuggestions.forEach(ds => {
      suggestionMap.set(ds.track.uri, ds)
    })

    saveEventPlaylist(eventId, playlist, suggestionMap)
  }

  private renderSuggestion = (
    decoratedSuggestion: IDecoratedSuggestion,
    index: number
  ) => {
    const { track, user } = decoratedSuggestion
    let trackImage = <span />
    if (track.album && track.album.images && track.album.images.length > 0) {
      trackImage = (
        <ListItemIcon>
          <img
            className="track-image"
            src={track.album.images[track.album.images.length - 1].url}
            alt={track.name}
          />
        </ListItemIcon>
      )
    }
    let userAccountIcon = <AccountCircle className="avatar-small" />
    if (user.image) {
      userAccountIcon = (
        <Avatar alt={user.displayName} src={user.image} className="avatar" />
      )
    }

    return (
      <Grid key={index}>
        <ListItem className="list-item" dense={true} button={true}>
          {trackImage}
          <div className="list-item-content">
            <div className="list-item-text-block">
              <div className="list-item-track-info">
                <span className="track-artist">
                  {track.album.artists[0].name}
                </span>
                <span className="track-name">{track.name}</span>
              </div>
              <span className="track-duration">
                {formatDuration(track.duration_ms)}
              </span>
            </div>
            {track.preview_url ? (
              <audio src={track.preview_url} controls={true} preload="none" />
            ) : (
              <audio src={''} controls={true} preload="none" />
            )}
          </div>

          {userAccountIcon}
          <ListItemSecondaryAction>
            <Button
              className="reject"
              variant="contained"
              onClick={this.handleSuggestionRejected(decoratedSuggestion)}
            >
              REJECT
            </Button>
            <Button
              className="accept"
              variant="contained"
              onClick={this.handleSavePlaylist([decoratedSuggestion])}
            >
              ACCEPT
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      </Grid>
    )
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

  private renderAcceptButtons = (
    filteredSuggestions: IDecoratedSuggestion[]
  ) => {
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleSavePlaylist(filteredSuggestions)}
        >
          <DoneAll className="left-icon icon-small" />
          Accept All{' '}
        </Button>
      </div>
    )
  }
}

export default withRouter(EventSuggestions)
