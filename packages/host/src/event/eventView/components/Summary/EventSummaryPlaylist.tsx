import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Grid from '@material-ui/core/Grid'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import cloneDeep from 'lodash/cloneDeep'
import IEvent from 'event/IEvent'
import IAction from 'IAction'
import IPlaylist from 'playlist/IPlaylist'
import IDecoratedSuggestion from 'suggestion/IDecoratedSuggestion'
import formatDuration from 'util/formatDuration'
import ITrackVoteStatus from 'vote/ITrackVoteStatus'
import EditPlaylistPopup from './EditPlaylistPopup'
import './EventSummaryPlaylist.scss'

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
  editPlaylist(playlistId: string, name: string, description: string): IAction
}

const EventSummaryPlaylist = ({
  event,
  playlist,
  suggestion,
  genre,
  eventImg,
  editPlaylist,
  toggleDynamicVoting,
  sortPlaylistByVotesDescending,
  toggleAutoAcceptSuggestions,
  toggleSuggestingPlaylists,
  votes
}: IEventSummaryPlaylistProps) => {
  const [showPopup, setShowPopup] = useState(false)

  const togglePopup = () => {
    setShowPopup(!showPopup)
  }

  const handleDynamicVotingToggled = () => {
    toggleDynamicVoting(event)
    sortPlaylistByVotesDescending(playlist, votes)
  }

  const autoAcceptSuggestionsToggled = () => {
    toggleAutoAcceptSuggestions(event)
  }

  const suggestingPlaylistsToggled = () => {
    toggleSuggestingPlaylists(event)
  }

  if (!playlist) {
    return <span />
  }

  const size = suggestion.length > 2 ? 3 : 1

  const openUrl = playlist.external_urls && playlist.external_urls.spotify

  const numTracks =
    playlist.tracks && playlist.tracks.items ? playlist.tracks.items.length : 0

  const durationSeconds =
    numTracks > 0
      ? playlist.tracks.items
          .map(item => item.track.duration_ms)
          .reduce((acc, dur) => acc + dur)
      : 0

  const formattedDuration = formatDuration(durationSeconds)

  let image = eventImg && eventImg

  if (!eventImg) {
    image =
      playlist.images && playlist.images.length ? playlist.images[0].url : ''
  }

  return (
    <Grid className="EventSummaryPlaylist-root" container={true} spacing={2}>
      {showPopup && (
        <EditPlaylistPopup
          playlist={playlist}
          togglePopup={togglePopup}
          editPlaylist={editPlaylist}
        />
      )}
      <Grid item={true} xs={12} className="playlist-view">
        <Grid container={true} alignItems="center">
          <Grid item={true} xs={12}>
            <Typography gutterBottom={true} variant="subtitle1">
              Playlist{' '}
              <a
                className="spotify-link"
                href={openUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button color="secondary">Open in Spotify</Button>
              </a>
            </Typography>
          </Grid>
          <Grid item={true} xs={12} container={true}>
            <Grid item={true} xs={6}>
              <Grid
                container={true}
                direction={'column'}
                justify={'space-between'}
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
                  <Typography color="textSecondary">
                    Genre: {genre ? genre : 'All'}
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <Grid item={true} xs={6}>
              {image && (
                <ButtonBase>
                  <img className="playlist-image" alt="complex" src={image} />
                </ButtonBase>
              )}
            </Grid>
          </Grid>
          <Grid item={true} xs={12}>
            <span>Party modes</span>
            <FormGroup row={true}>
              <FormControlLabel
                control={
                  <Switch
                    value="Suggesting Playlists Enabled"
                    checked={event.settings.suggestingPlaylistsEnabled}
                    onChange={suggestingPlaylistsToggled}
                  />
                }
                label="Allow Playlist Suggestions"
              />
              <FormControlLabel
                control={
                  <Switch
                    value="Auto Accept Suggestions Enabled"
                    checked={event.settings.autoAcceptSuggestionsEnabled}
                    onChange={autoAcceptSuggestionsToggled}
                  />
                }
                label="Auto Accept Suggestions"
              />
              <FormControlLabel
                control={
                  <Switch
                    value="Dynamic Voting Enabled"
                    checked={event.settings.dynamicVotingEnabled}
                    onChange={handleDynamicVotingToggled}
                  />
                }
                label="Dynamic Voting"
              />
            </FormGroup>
            <Button color="secondary" variant="contained" onClick={togglePopup}>
              Edit Playlist Details
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item={true} xs={12}>
        {suggestion.length > 0 && (
          <React.Fragment>
            <Typography className="recently-requested-title" variant="caption">
              Recently Requested Tracks
            </Typography>
            {cloneDeep(suggestion)
              .reverse()
              .slice(0, size)
              .map((suggest, i) => (
                <div className="suggestion-row" key={i}>
                  <img
                    alt="suggestion"
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
          </React.Fragment>
        )}
      </Grid>
    </Grid>
  )
}

export default EventSummaryPlaylist
