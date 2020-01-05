import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Grid from '@material-ui/core/Grid'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import cloneDeep from 'lodash/cloneDeep'
import {
  Action,
  Playlist,
  Event,
  formatDuration,
  TrackVoteStatus
} from 'mm-shared'
import IDecoratedSuggestion from 'requests/IDecoratedSuggestion'
import EditPlaylistPopup from './EditPlaylistPopup'
import Img from 'react-image'
import backgroundImage from 'assets/music-monkey.jpg'
import getPlaylistImage from 'playlist/getPlaylistImage'
import getPlaylistDuration from 'playlist/getPlaylistDuration'

import './EventSummaryPlaylist.scss'

interface IEventSummaryPlaylistProps {
  event: Event
  genre?: string
  eventImg?: string
  suggestion: IDecoratedSuggestion[]
  votes: Map<string, TrackVoteStatus>
  sortPlaylistByVotesDescending(
    playlist: Playlist,
    votes: Map<string, TrackVoteStatus>
  ): Action
  toggleDynamicVoting(event: Event): Action
  toggleAutoAcceptSuggestions(event: Event): Action
  toggleSuggestingPlaylists(event: Event): Action
  editPlaylist(playlistId: string, name: string, description: string): Action
}

const EventSummaryPlaylist = ({
  event,
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
  const playlist = event.playlist!

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

  const durationSeconds = getPlaylistDuration(playlist)
  const formattedDuration = formatDuration(durationSeconds)

  let image = eventImg && eventImg

  if (!eventImg) {
    image = getPlaylistImage(playlist)
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
                  <Img
                    className="playlist-image"
                    src={[image, backgroundImage]}
                    alt="Playlist"
                  />
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
