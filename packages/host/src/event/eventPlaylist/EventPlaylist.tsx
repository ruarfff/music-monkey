import React from 'react'
import Button from '@material-ui/core/Button/Button'
import Grid from '@material-ui/core/Grid/Grid'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List/List'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Snackbar from '@material-ui/core/Snackbar'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import DoneAll from '@material-ui/icons/DoneAll'
import Undo from '@material-ui/icons/Undo'
import classNames from 'classnames'
import { DropResult } from 'react-beautiful-dnd'
import { Action } from 'mm-shared'
import IEvent from 'event/IEvent'
import LoadingSpinner from 'loading/LoadingSpinner'
import IPlaylist from 'playlist/IPlaylist'
import IPlaylistItem from 'playlist/IPlaylistItem'
import IDecoratedSuggestion from 'suggestion/IDecoratedSuggestion'
import { Track } from 'mm-shared'
import ITrackWithFeatures from 'track/ITrackWithFeatures'
import TrackList from 'track/TrackList'
import ITrackVoteStatus from 'vote/ITrackVoteStatus'
import './EventPlaylist.scss'

interface IEventPlaylistProps {
  event: IEvent
  tracksWithFeatures: ITrackWithFeatures[]
  notification: string
  stagedSuggestions: IDecoratedSuggestion[]
  saving: boolean
  votes: Map<string, ITrackVoteStatus>
  getTracksFeatures(trackIds: string[]): Action
  saveEventPlaylist(
    eventId: string,
    playlist: IPlaylist,
    suggestions: Map<string, IDecoratedSuggestion>
  ): Action
  resetStagedSuggestions(): Action
  onPlaylistDragDrop(
    playlist: IPlaylist,
    fromIndex: number,
    toIndex: number
  ): Action
  tryRemoveTrack(playlistId: string, uri: string, position: number): Action
  sortPlaylistByVotesDescending(
    playlist: IPlaylist,
    votes: Map<string, ITrackVoteStatus>
  ): Action
}

export default class EventPlaylist extends React.Component<
  IEventPlaylistProps
> {
  public state = {
    anchorEl: null,
    isOpen: false
  }

  public handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  public handleClose = (type: string) => () => {
    if (type === 'vote') {
      this.props.sortPlaylistByVotesDescending(
        this.props.event.playlist!,
        this.props.votes
      )
    }
    this.setState({ anchorEl: null })
  }

  public handleShowNotification = () => {
    this.setState({ isOpen: true })
  }

  public render() {
    const {
      event,
      stagedSuggestions,
      saving,
      votes,
      notification,
      tracksWithFeatures
    } = this.props
    let stagedTracks: Track[] = []

    if (!event.playlist) {
      return <span />
    }
    const playlist = event.playlist!

    if (stagedSuggestions && stagedSuggestions.length > 0) {
      stagedTracks = stagedSuggestions.map(s => s.track)
    }

    const hasStagedTrack = stagedTracks.length > 0
    const { anchorEl } = this.state
    return (
      <div className="EventPlaylist-root">
        {saving && <LoadingSpinner />}
        {!saving && (
          <Grid container={true} spacing={1}>
            <Snackbar
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}
              autoHideDuration={4000}
              open={this.state.isOpen}
              onClose={this.handleCloseNotification}
              ContentProps={{
                'aria-describedby': 'message-id'
              }}
              message={<span id="message-id">{notification}</span>}
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={this.handleCloseNotification}
                >
                  <CloseIcon />
                </IconButton>
              ]}
            />
            <Grid
              item={true}
              sm={12}
              container={true}
              justify={'space-between'}
              alignItems={'center'}
            >
              <Typography>Tracks</Typography>

              <div className="EventPlaylist-rightSideButtons">
                {hasStagedTrack && this.renderSaveButtons(hasStagedTrack)}
                <Button
                  aria-owns={anchorEl ? 'simple-menu' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                >
                  Sort
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose('root')}
                >
                  <MenuItem onClick={this.handleClose('vote')}>
                    By Vote
                  </MenuItem>
                </Menu>
              </div>
            </Grid>
            <Grid item={true} sm={12}>
              {hasStagedTrack && (
                <List className="EventPlaylist-stagedTracks">
                  <TrackList
                    tracks={stagedTracks}
                    onTrackRemoved={this.handleRemoveTrack}
                  />
                </List>
              )}

              {playlist && playlist.tracks.total > 0 && (
                <List>
                  <TrackList
                    tracksWithFeatures={tracksWithFeatures}
                    tracks={playlist.tracks.items.map(item => item.track)}
                    withVoting={true}
                    votes={votes}
                    onDragEnd={this.handlePlaylistDragDrop}
                    onTrackRemoved={this.handleRemoveTrack}
                  />
                </List>
              )}
              {playlist && playlist.tracks.total < 1 && <p>No tracks yet</p>}
            </Grid>
          </Grid>
        )}
      </div>
    )
  }

  private handleCloseNotification = () => {
    this.setState({ isOpen: false })
  }

  private renderSaveButtons = (hasStagedTrack: boolean) => {
    return (
      <div className="EventPlaylist-playlist-actions">
        <div className="EventPlaylist-playlist-action">
          <Button
            variant="contained"
            color="secondary"
            disabled={!hasStagedTrack}
            onClick={this.handleSavePlaylist}
          >
            <DoneAll
              className={classNames(
                'EventPlaylist-leftIcon',
                'EventPlaylist-iconSmall'
              )}
            />
            Save Changes{' '}
          </Button>
        </div>
        <div className="EventPlaylist-playlist-action">
          <Button
            variant="contained"
            color="secondary"
            disabled={!hasStagedTrack}
            onClick={this.props.resetStagedSuggestions}
          >
            <Undo
              className={classNames(
                'EventPlaylist-leftIcon',
                'EventPlaylist-iconSmall'
              )}
            />
            Reset{' '}
          </Button>
        </div>
      </div>
    )
  }

  private handleGetTrackFeatures = () => {
    const {
      event: { playlist }
    } = this.props
    const trackIds = [] as string[]
    if (playlist!.tracks.items.length > 0) {
      playlist!.tracks.items.forEach((track: IPlaylistItem) => {
        trackIds.push(track.track.id)
      })
      if (trackIds.length > 0) {
        this.props.getTracksFeatures(trackIds)
      }
    }
  }

  private handleSavePlaylist = () => {
    const { event, stagedSuggestions, saveEventPlaylist } = this.props
    if (stagedSuggestions && stagedSuggestions.length > 0) {
      const suggestionMap = new Map()
      stagedSuggestions.forEach((ds: IDecoratedSuggestion) => {
        suggestionMap.set(ds.track.uri, ds)
      })
      saveEventPlaylist(event.eventId || '', event.playlist!, suggestionMap)
    }
  }

  private handleRemoveTrack = (track: Track) => {
    const playlist = this.props.event.playlist!
    this.props.tryRemoveTrack(playlist.id, track.uri, track.track_number)

    this.handleShowNotification()
  }

  private handlePlaylistDragDrop = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }
    const playlist = this.props.event.playlist!

    this.props.onPlaylistDragDrop(
      playlist,
      result.source.index,
      result.destination.index
    )

    setTimeout(() => this.handleGetTrackFeatures(), 100)
  }
}
