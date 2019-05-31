import {
  AppBar,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core'
import { isEmpty } from 'lodash'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import SwipeableViews from 'react-swipeable-views'
import IEvent from '../../event/IEvent'
import IAction from '../../IAction'
import PlayerContainer from '../../player/PlayerContainer'
import PlayerPlaylistContainer from '../../player/PlayerPlaylistContainer'
import IDecoratedSuggestion from '../../suggestion/IDecoratedSuggestion'
import ITrack from '../../track/ITrack'
import MaybeTracks from '../../trackView/MaybeTracksContainer'
import IUser from '../../user/IUser'
import ITrackVoteStatus from '../../vote/ITrackVoteStatus'
import IVote from '../../vote/IVote'
import IPlaylist from '../IPlaylist'
import './Playlist.scss'
import { setEventId } from '../../event/eventActions'
import ApprovedTracks from './ApprovedTracks';
import PlaylistWithPlayer from './PlaylistWithPlayer';

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
  setEventId(eventId: string): IAction
}

export default class PlaylistDetailed extends React.Component<IPlayListProps> {
  public state = {
    value: 0,
    showPlaylist: false,
    showPlayer: false,
    showPlayerPlaylist: false
  }

  public componentDidMount() {
    const { votes, getSuggestions, fetchEventVotes } = this.props

    const eventId = this.props.match.params.eventId
    if (eventId) setEventId(eventId)
    if (isEmpty(votes) && !this.props.fetchingVotes) {
      fetchEventVotes(eventId)
    }
    getSuggestions(eventId)
  }

  public render() {
    const { showPlayer, value, showPlayerPlaylist } = this.state
    const { selectedPlaylist } = this.props
    if(isEmpty(selectedPlaylist)) {
        return <div />
    }
      return[ (
        <div className="playlist-tabs">
          {showPlayerPlaylist ? (
            <PlayerPlaylistContainer
              handleTrackVote={this.handleTrackVote}
              showPlayerPlaylist={this.onShowPlayerPlaylist}
            />
          ) : (
            <PlaylistWithPlayer playlist={selectedPlaylist} onPlayerClicked={this.onPlayClicked} />
          )}
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={this.handleChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="fullWidth"
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
                  <ApprovedTracks playlist={selectedPlaylist} votes={this.props.votes} onTrackSelected={this.handleTrackSelected} onVote={this.handleTrackVote} />
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
      ), showPlayer ? <PlayerContainer /> : '']
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
