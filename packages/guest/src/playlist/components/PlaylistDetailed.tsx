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
  subscribeToSuggestionsAccepted,
  subscribeToVotesModified
} from '../../notification'
import PlayerContainer from '../../player/PlayerContainer'
import PlayerPlaylistContainer from '../../player/PlayerPlaylistContainer'
import IDecoratedSuggestion from '../../suggestion/IDecoratedSuggestion'
import ITrack from '../../track/ITrack'
import TrackList from '../../track/TrackList'
import MaybeTracks from '../../trackView/MaybeTracksContainer'
import IUser from '../../user/IUser'
import ITrackVoteStatus from '../../vote/ITrackVoteStatus'
import IVote from '../../vote/IVote'
import IPlaylist from '../IPlaylist'
import './Playlist.scss'

interface IPlayListProps extends RouteComponentProps<any> {
  user: IUser
  event: IEvent
  events: IEvent[]
  userPlaylists: IPlaylist[]
  selectedPlaylist: IPlaylist
  votes: Map<string, ITrackVoteStatus>
  selectedTrack?: ITrack
  suggestions: IDecoratedSuggestion[]
  fetchingSuggestions: boolean
  fetchingVotes: boolean
  showSpinner(value: boolean): IAction
  createVote(vote: IVote): IAction
  deleteVote(voteId: string): IAction
  selectTrack(track: ITrack): IAction
  fetchEventVotes(eventId: string): IAction
  onPlaylistSelected(playlist: IPlaylist): IAction
  deselectTrack(): IAction
  getSuggestions(eventId: string): IAction
  getEvent(eventId: string): IAction
  getUsersSuggestions(eventId: string): IAction
}

export default class PlaylistDetailed extends React.Component<IPlayListProps> {
  public state = {
    value: 0,
    showPlaylist: false,
    playlist: {},
    showPlayer: false,
    showPlayerPlaylist: false,
    loading: false
  }

  public componentDidMount() {
    const {
      event,
      votes,
      suggestions,
      fetchEventVotes,
      getEvent,
      getSuggestions,
      getUsersSuggestions
    } = this.props

    const eventId = this.props.match.params.eventId

    if (isEmpty(event)) {
      getEvent(eventId)
    }

    if (isEmpty(votes) && !this.props.fetchingVotes) {
      fetchEventVotes(eventId)
    }

    if (isEmpty(suggestions) && !this.props.fetchingSuggestions) {
      getSuggestions(eventId)
    }

    subscribeToVotesModified(eventId, () => fetchEventVotes(eventId))

    subscribeToSuggestionsAccepted(eventId, () => getUsersSuggestions(eventId))
  }

  public componentWillReceiveProps(newProps: IPlayListProps) {
    const { userPlaylists } = newProps
    let selectedPlaylist: any

    const eventId = this.props.match.params.eventId

    selectedPlaylist = !isEmpty(this.props.selectedPlaylist)
      ? this.props.selectedPlaylist
      : userPlaylists.length > 0
      ? userPlaylists.filter(playlist => playlist.eventId === eventId)[0] || {}
      : undefined

    if (isEmpty(this.props.selectedPlaylist)) {
      this.props.onPlaylistSelected(selectedPlaylist)
    }
  }

  public handleChange = (event: any, value: any) => {
    this.setState({ value })
  }

  public handleChangeIndex = (index: any) => {
    this.setState({ value: index })
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

  public render() {
    const { showPlayer, value, showPlayerPlaylist } = this.state
    const { showSpinner, selectedPlaylist } = this.props

    let PlaylistTabs = <div />
    if (!isEmpty(selectedPlaylist)) {
      showSpinner(false)
      PlaylistTabs = (
        <div className="playlist-tabs">
          {showPlayerPlaylist ? (
            <PlayerPlaylistContainer
              handleTrackVote={this.handleTrackVote}
              showPlayerPlaylist={this.onShowPlayerPlaylist}
            />
          ) : (
            <div className="playlist-header">
              <div className="playlist-header-top-menu">
                <Link to={'/playlists'}>
                  <Icon onClick={this.onGoBack}>chevron_left</Icon>
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
                    <span className="playlist-content-title-songs">
                      {selectedPlaylist.tracks && selectedPlaylist.tracks.total}{' '}
                      Songs
                    </span>
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
          )}
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
              {/*<Tab label="MY REQUESTS" disabled={true} />*/}
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={'x'}
            index={value}
            onChangeIndex={this.handleChangeIndex}
            style={
              showPlayerPlaylist ? { height: '200px', overflowX: 'scroll' } : {}
            }
          >
            {value === 0 ? (
              <Typography component="div" dir={'0'} style={{ padding: 10 }}>
                {this.renderApprovedTracks(selectedPlaylist)}
                <div className="stoper-block" />
                <div className="stoper-block" />
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
            {/*{value === 2 ? (*/}
            {/*<Typography component="div" dir={'2'}>*/}
            {/*test3*/}
            {/*</Typography>*/}
            {/*) : (*/}
            {/*<div />*/}
            {/*)}*/}
          </SwipeableViews>
        </div>
      )
    }

    return [PlaylistTabs, showPlayer ? <PlayerContainer /> : '']
  }

  private onPlayClicked = () => {
    this.setState({
      showPlayerPlaylist: !this.state.showPlayerPlaylist,
      showPlayer: false
    })
  }
  private onGoBack = () => ({})

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
        setTimeout(
          () =>
            this.props.event &&
            this.props.fetchEventVotes(this.props.event.eventId),
          500
        )
        return
      }
    }
    const vote = {
      eventId,
      trackId,
      userId: user.userId
    } as IVote
    this.props.createVote(vote)
    setTimeout(
      () =>
        this.props.event &&
        this.props.fetchEventVotes(this.props.event.eventId),
      500
    )
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
