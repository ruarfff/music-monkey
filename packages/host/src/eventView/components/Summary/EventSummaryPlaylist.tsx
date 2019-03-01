import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import { WithStyles } from '@material-ui/core/es'
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup/FormGroup'
import Grid from '@material-ui/core/Grid'
import withStyle from '@material-ui/core/styles/withStyles'
import Switch from '@material-ui/core/Switch/Switch'
import Typography from '@material-ui/core/Typography'
import { cloneDeep } from 'lodash'
import * as React from 'react'
import IEvent from '../../../event/IEvent'
import IAction from '../../../IAction'
import IPlaylist from '../../../playlist/IPlaylist'
import IDecoratedSuggestion from '../../../suggestion/IDecoratedSuggestion'
import { formatDuration } from '../../../util/formatDuration'
import ITrackVoteStatus from '../../../vote/ITrackVoteStatus'
import './Styles/EventSummaryPlaylist.scss'

const decorated = withStyle(() => ({
  playlistWrapper: {
    padding: '15px 30px 30px 30px',
    height: '100%'
  },
  playlistView: {
    marginBottom: '50px',
  },
  spotifyLink: {
    color: '#FFB000'
  },
  playlistContainer: {},
  suggestionRow: {
    display: 'flex',
    marginBottom: '15px'
  },
  suggestionImg: {
    height: '40px',
    width: '40px',
    borderRadius: '8px',
    marginRight: '10px'
  },
  recentlyTitle: {
    fontSize: '20px',
    lineHeight: '23px',
    marginBottom: '10px'
  }
}))

interface IEventSummaryPlaylistProps {
  event: IEvent
  genre?: string
  eventImg?: string
  playlist: IPlaylist
  suggestion: IDecoratedSuggestion[]
  votes: Map<string, ITrackVoteStatus>
  sortPlaylistByVotesDescending(
    playlist: IPlaylist,
    votes: Map<string, ITrackVoteStatus>
  ): IAction
  toggleDynamicVoting(event: IEvent): IAction
  toggleAutoAcceptSuggestions(event: IEvent): IAction
  toggleSuggestingPlaylists(event: IEvent): IAction
}

class EventSummaryPlaylist extends React.PureComponent<
  IEventSummaryPlaylistProps & WithStyles
> {
  public render() {
    const {
      playlist,
      classes,
      suggestion,
      genre,
      eventImg,
      event
    } = this.props

    if (!playlist) {
      return <span />
    }

    const size = suggestion.length > 2 ? 3 : 1

    const openUrl = playlist.external_urls && playlist.external_urls.spotify

    const numTracks =
      playlist.tracks && playlist.tracks.items
        ? playlist.tracks.items.length
        : 0

    const durationSeconds =
      numTracks > 0
        ? playlist.tracks.items
            .map(item => item.track.duration_ms)
            .reduce((acc, dur) => acc + dur)
        : 0

    const formattedDuration = formatDuration(durationSeconds)

    let image = eventImg && eventImg


    if (!eventImg) {
      image = playlist.images && playlist.images.length ? playlist.images[0].url : ''
    }

    return (
      <Grid className={classes.playlistWrapper} container={true} spacing={16}>
        <Grid item={true} xs={12} className={classes.playlistView}>
          <Grid container={true} alignItems={'center'}>
            <Grid item={true} xs={12}>
              <Typography gutterBottom={true} variant="subtitle1">
                Playlist{' '}
                <a
                  className={classes.spotifyLink}
                  href={openUrl}
                  target="_blank"
                >
                  <Button color="secondary">
                    Open in Spotify
                  </Button>
                </a>
              </Typography>
            </Grid>
            <Grid item={true} xs={12} container={true}>
              <Grid item={true} xs={6}>
                <Grid
                  container={true}
                  direction={'column'}
                  justify={'space-between'}
                  className={classes.playlistContainer}
                >
                  <div>
                    <Typography gutterBottom={true}>{playlist.name}</Typography>
                    <Typography color="textSecondary">
                      {numTracks} Tracks
                    </Typography>
                    <Typography color="textSecondary">
                      {formattedDuration}
                    </Typography>
                  </div>
                  <div>
                    {/*<Typography color="textSecondary">*/}
                      {/*Mode: Play to Play*/}
                    {/*</Typography>*/}
                    <Typography color="textSecondary">Genre: {genre ? genre : 'All'}</Typography>
                  </div>
                </Grid>
              </Grid>
              <Grid item={true} xs={6}>
                {image && (
                  <ButtonBase>
                    <img
                      className="EventSummaryPlaylist-image"
                      alt="complex"
                      src={image}
                    />
                  </ButtonBase>
                )}
              </Grid>
            </Grid>
            <Grid item={true} xs={12}>
              <span>
                Party modes
              </span>
              <FormGroup row={true}>
                <FormControlLabel
                  control={
                    <Switch
                      value={'suggesting Playlists Enabled'}
                      checked={event.settings.suggestingPlaylistsEnabled}
                      onChange={this.suggestingPlaylistsToggled}
                    />
                  }
                  label="Allow Playlist Suggestions"
                />
                <FormControlLabel
                  control={
                    <Switch
                      value={'auto Accept Suggestions Enabled'}
                      checked={event.settings.autoAcceptSuggestionsEnabled}
                      onChange={this.autoAcceptSuggestionsToggled}
                    />
                  }
                  label="Auto Accept Suggestions"
                />
                <FormControlLabel
                  control={
                    <Switch
                      value={'dynamic Voting Enabled'}
                      checked={event.settings.dynamicVotingEnabled}
                      onChange={this.handleDynamicVotingToggled}
                    />
                  }
                  label="Dynamic Voting"
                />
              </FormGroup>
            </Grid>
          </Grid>
        </Grid>
        <Grid item={true} xs={12}>
          <Typography className={classes.recentlyTitle} variant="caption">
            Recently Requested Tracks
          </Typography>
          {suggestion &&
              cloneDeep(suggestion)
              .reverse()
              .slice(0, size)
              .map((suggest, i) => (
                <div className={classes.suggestionRow} key={i}>
                  <img
                    className={classes.suggestionImg}
                    src={suggest.track.album.images[0].url}
                  />
                  <div>
                    <Typography>
                      {suggest.track.album.artists[0].name}
                    </Typography>
                    <Typography>{suggest.track.name}</Typography>
                  </div>
                </div>
              ))}
        </Grid>
      </Grid>
    )
  }

  private handleDynamicVotingToggled = () => {
    const {
      event,
      toggleDynamicVoting,
      votes,
      playlist,
      sortPlaylistByVotesDescending
    } = this.props
    toggleDynamicVoting(event)
    sortPlaylistByVotesDescending(playlist, votes)
  }

  private autoAcceptSuggestionsToggled = () => {
    const { event, toggleAutoAcceptSuggestions } = this.props
    toggleAutoAcceptSuggestions(event)
  }

  private suggestingPlaylistsToggled = () => {
    const { event, toggleSuggestingPlaylists } = this.props
    toggleSuggestingPlaylists(event)
  }
}

export default decorated(EventSummaryPlaylist)
