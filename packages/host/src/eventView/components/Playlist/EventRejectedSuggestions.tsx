import { ListItemIcon } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid/Grid'
import List from '@material-ui/core/List/List'
import ListItem from '@material-ui/core/ListItem/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import { WithStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import * as React from 'react'
import IAction from '../../../IAction'
import IDecoratedSuggestion from '../../../suggestion/IDecoratedSuggestion'
import ISuggestion from '../../../suggestion/ISuggestion'
import ITrack from '../../../track/ITrack'
import { formatDuration } from '../../../util/formatDuration'
import './Styles/EventSuggestions.scss'

const decorate = withStyles(() => ({
  accept: {
    background: '#27AE60',
    color: 'white'
  },
  trackBand: {
    fontWeight: 800
  },
  listItem: {
    borderBottom: '1px solid #979797',
    display: 'flex',
    justifyContent: 'space-between'
  },
}))

interface IEventRejectedSuggestionsProps {
  suggestions: IDecoratedSuggestion[]
  stageSuggestion(suggestion: ISuggestion): IAction
}

class EventRejectedSuggestions extends React.PureComponent<
  IEventRejectedSuggestionsProps & WithStyles
> {
  public state = {
    tracksBeingRemoved: {}
  }

  public render() {
    const { suggestions } = this.props
    const filteredSuggestions = suggestions.filter(
      suggest => !suggest.suggestion.accepted
    )
    if (!filteredSuggestions || filteredSuggestions.length < 1) {
      return (
        <Typography align="center" variant="subtitle1">
          Currently no Rejected Suggestions
        </Typography>
      )
    }
    return (
      <div className="EventSuggestions-root">
        <Grid container={true} spacing={24}>
          <Grid item={true} sm={12}>
            <List>
              {filteredSuggestions.map((decoratedSuggestion, i) =>
                this.renderSuggestion(decoratedSuggestion, i)
              )}
            </List>
          </Grid>
        </Grid>
      </div>
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

  private renderSuggestion = (decoratedSuggestion: IDecoratedSuggestion, index: number) => {

    const { classes } = this.props
    const { track, user } = decoratedSuggestion
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
      <ListItem
        key={index}
        className={classes.listItem}
        dense={true}
        button={true}
      >
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
            className={classes.accept}
            variant="contained"
            onClick={this.handleSuggestionAccepted(decoratedSuggestion)}
          >
            ACCEPT
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}

export default decorate(EventRejectedSuggestions)
