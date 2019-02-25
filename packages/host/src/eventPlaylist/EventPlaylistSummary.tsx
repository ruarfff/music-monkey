import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup/FormGroup'
import Grid from '@material-ui/core/Grid/Grid'
import Switch from '@material-ui/core/Switch/Switch'
import * as React from 'react'
import IEvent from '../event/IEvent'
import IAction from '../IAction'
import IPlaylist from '../playlist/IPlaylist'
import { formatDuration } from '../util/formatDuration'
import ITrackVoteStatus from '../vote/ITrackVoteStatus'
import './EventPlaylistSummary.scss'

interface IEventPlaylistSummaryProps {
  event: IEvent
  playlist: IPlaylist
  votes: Map<string, ITrackVoteStatus>
  sortPlaylistByVotesDescending(
    playlist: IPlaylist,
    votes: Map<string, ITrackVoteStatus>
  ): IAction
  toggleDynamicVoting(event: IEvent): IAction
  toggleAutoAcceptSuggestions(event: IEvent): IAction
  toggleSuggestingPlaylists(event: IEvent): IAction
}

class EventPlaylistSummary extends React.PureComponent<
  IEventPlaylistSummaryProps
> {
  public render() {
    const playlist: IPlaylist = this.props.playlist || ({} as IPlaylist)
    const event: IEvent = this.props.event || ({} as IEvent)

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

    return (
      <Grid container={true} spacing={24}>
        <Grid item={true} sm={12} className="EventPlaylistSummary-card">
          <div className="EventPlaylistSummary-container">
            <div className="EventPlaylistSummary-item">
              <div>
                <span className="EventPlaylist-name">{playlist.name}</span>

                <span className="EventPlaylist-spotifyLink">
                  {playlist.external_urls && (
                    <a href={playlist.external_urls.spotify} target="_blank">
                      Open in Spotify
                    </a>
                  )}
                </span>
              </div>
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
            </div>

            <div className="EventPlaylistSummary-item">
              <div>
                <span className="EventPlaylistSummary-status">
                  Tracks: {playlist.tracks.items.length}
                </span>
                <span className="EventPlaylistSummary-status">
                  {formattedDuration}
                </span>
              </div>
              <div>
                <span className="EventPlaylistSummary-time">Live at:</span>
                <span className="EventPlaylistSummary-time">
                  {event.startDateTime &&
                    event.startDateTime.format('MMM Do, h:mm')}
                </span>
              </div>
            </div>
          </div>
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

export default EventPlaylistSummary
