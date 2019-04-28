import {
  AppBar,
  Button,
  Icon,
  ListItemText,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core'
import { isEmpty } from 'lodash'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views'
import IEvent from '../../event/IEvent'
import IAction from '../../IAction'
import {
  subscribeToPlaylistModified,
  subscribeToSuggestionsModified,
  subscribeToVotesModified,
  unSubscribeToPlaylistModified,
  unSubscribeToSuggestionsModified,
  unSubscribeToVotesModified
} from '../../notification'
import PlayerContainer from '../../player/PlayerContainer'
import PlayerPlaylistContainer from '../../player/PlayerPlaylistContainer'
import IDecoratedSuggestion from '../../suggestion/IDecoratedSuggestion'
import ITrack from '../../track/ITrack'
import TrackList from '../../track/TrackList'
import MaybeTracks from '../../trackView/MaybeTracksContainer'
import IUser from '../../user/IUser'
import { formatDuration } from '../../util/formatDuration'
import ITrackVoteStatus from '../../vote/ITrackVoteStatus'
import IVote from '../../vote/IVote'
import IPlaylist from '../IPlaylist'
import './Playlist.scss'

interface IPlayListProps extends RouteComponentProps<any> {
  user: IUser
  event: IEvent
  userPlaylists: IPlaylist[]
  selectedPlaylist: IPlaylist
  votes: Map<string, ITrackVoteStatus>
  selectedTrack?: ITrack
  suggestions: IDecoratedSuggestion[]
  fetchingSuggestions: boolean
  fetchingVotes: boolean
  eventLoading: boolean
  createVote(vote: IVote): IAction
  deleteVote(voteId: string): IAction
  selectTrack(track: ITrack): IAction
  fetchEventVotes(eventId: string): IAction
  onPlaylistSelected(playlist: IPlaylist): IAction
  deselectTrack(): IAction
  getSuggestions(eventId: string): IAction
  getEvent(eventId: string): IAction
}

export default class PlaylistDetailed extends React.Component<IPlayListProps> {
  public state = {
    value: 0,
    showPlaylist: false,
    showPlayer: false,
    showPlayerPlaylist: false
  }

  public componentDidMount() {
    const {
      event,
      votes,
      getSuggestions,
      eventLoading,
      fetchEventVotes,
      getEvent,
    } = this.props

    const eventId = this.props.match.params.eventId

    if (isEmpty(event) && !eventLoading) {
      getEvent(eventId)
    }

    if (isEmpty(votes) && !this.props.fetchingVotes) {
      fetchEventVotes(eventId)
    }

    getSuggestions(eventId)
    subscribeToVotesModified(eventId, () => fetchEventVotes(eventId))
  }

  public componentWillReceiveProps(newProps: IPlayListProps) {
    const {
      getEvent,
      getSuggestions,
    } = this.props

    const eventId = this.props.match.params.eventId

    if (!isEmpty(newProps.event)) {
      subscribeToPlaylistModified(newProps.event.playlist.id, () => getEvent(eventId))
      subscribeToSuggestionsModified(
        newProps.event.eventId,
        () => getSuggestions(eventId)
      )
    }
  }

  public componentWillUnmount() {
    const eventId = this.props.match.params.eventId
    unSubscribeToSuggestionsModified(eventId)
    unSubscribeToVotesModified(eventId)
    unSubscribeToPlaylistModified(eventId)
  }

  public renderApprovedTracks = (selectedPlaylist: any) => {
    return (
      <TrackList
        tracks={
          selectedPlaylist.tracks &&
          selectedPlaylist.tracks.items.map((s: any) => s.track)
        }
        withSuggestingEnabled={false}
        onTrackSelected={this.handleTrackSelected}
        withVoting={true}
        votes={this.props.votes}
        onVote={this.handleTrackVote}
      />
    )
  }

  public renderPlaylistDetails = () => {
    const { selectedPlaylist } = this.props

    let durationSeconds = 0
    if (!isEmpty(selectedPlaylist) && selectedPlaylist.tracks.items.length > 0) {
      durationSeconds = selectedPlaylist.tracks.items
        .map(item => item.track.duration_ms)
        .reduce((acc, dur) => acc + dur)
    }

    return (
      <div className="playlist-header">
        <div className="playlist-header-top-menu">
          <Link to={'/playlists'}>
            <Icon>chevron_left</Icon>
          </Link>
        </div>
        <div className="playlist-content">
          <div className="playlist-content-img">
            <img
              src={
                (selectedPlaylist.images.length > 0 &&
                  selectedPlaylist.images[0].url) ||
                ''
              }
            />
          </div>
          <div className="playlist-content-title-block">
            <ListItemText
              className="playlist-content-title"
              primary={selectedPlaylist.name}
            />
            <div className="playlist-content-title-length">
              <div>
                      <span className="playlist-content-title-songs">
                        {`Total time: ${formatDuration(durationSeconds)}`}
                      </span><br/>
                <span className="playlist-content-title-songs">
                        {`${selectedPlaylist.tracks && selectedPlaylist.tracks.total} Songs`}
                      </span>
              </div>

              <Button
                variant="fab"
                color="primary"
                className="finder-playlist-header-container-button"
                onClick={this.onPlayClicked}
              >
                <Icon>{'play_arrow'}</Icon>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  public render() {
    const { showPlayer, value, showPlayerPlaylist } = this.state
    const { selectedPlaylist } = this.props

    let PlaylistTabs = <div />
    if (!isEmpty(selectedPlaylist)) {
      PlaylistTabs = (
        <div className="playlist-tabs">
          {showPlayerPlaylist ? (
            <PlayerPlaylistContainer
              handleTrackVote={this.handleTrackVote}
              showPlayerPlaylist={this.onShowPlayerPlaylist}
            />
          ) : this.renderPlaylistDetails()}
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={this.handleChange}
              indicatorColor="secondary"
              textColor="secondary"
              fullWidth={true}
              classes={{ indicator: 'indicator-color' }}
            >
              <Tab label="APPROVED" />
              <Tab label="MAYBE" />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={'x'}
            index={value}
            onChangeIndex={this.handleChangeIndex}
          >
            {value === 0 ? (
              <Typography component="div" dir={'0'} style={{ padding: 10 }}>
                {this.renderApprovedTracks(selectedPlaylist)}
              </Typography>
            ) : (
              <div />
            )}
            {value === 1 ? (
              <Typography component="div" dir={'1'}>
                <MaybeTracks />
              </Typography>
            ) : (
              <div />
            )}
          </SwipeableViews>
        </div>
      )
    }

    return [PlaylistTabs, showPlayer ? <PlayerContainer /> : '']
  }

  private handleChange = (event: any, value: any) => {
    this.setState({ value })
  }

  private handleChangeIndex = (index: any) => {
    this.setState({ value: index })
  }

  private onPlayClicked = () => {
    this.setState({
      showPlayerPlaylist: !this.state.showPlayerPlaylist,
      showPlayer: false
    })
  }

  private onShowPlayerPlaylist = () => {
    this.setState({ showPlayerPlaylist: !this.state.showPlayerPlaylist })
  }

  private handleTrackVote = (track: ITrack) => {
    const trackId = track.uri
    const { user, votes, event } = this.props
    const eventId = !!event ? event.eventId : ''

    if (votes && votes.has(trackId)) {
      const voteStatus = votes.get(trackId)
      if (voteStatus && voteStatus.votedByCurrentUser) {
        this.props.deleteVote(`${trackId}:${eventId}:${user.userId}`)
        return
      }
    }
    const vote = {
      eventId,
      trackId,
      userId: user.userId
    } as IVote
    this.props.createVote(vote)
  }

  private handleTrackSelected = (track: ITrack) => {
    const { showPlayerPlaylist, showPlayer } = this.state
    if (this.props.selectedTrack) {
      if (this.props.selectedTrack.id === track.id && showPlayer) {
        this.setState({ showPlayer: false })
        this.props.deselectTrack()
      } else {
        if (!showPlayerPlaylist) {
          this.setState({ showPlayer: true })
        }
      }
    } else {
      if (!showPlayerPlaylist) {
        this.setState({ showPlayer: true })
      }
    }

    this.props.selectTrack(track)
  }
}
