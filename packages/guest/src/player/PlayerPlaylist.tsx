import {
  Avatar,
  Button,
  Icon,
  IconButton,
  ListItemText
} from '@material-ui/core'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import ITrack from '../track/ITrack'
import ITrackVoteStatus from '../vote/ITrackVoteStatus'
import './PlayerPlaylist.scss'

interface IPlayerPlaylistProps extends RouteComponentProps<any> {
  playlist: any
  selectedTrack: any
  votes: Map<string, ITrackVoteStatus>
  showPlayerPlaylist(): any
  handleTrackVote(track: any): any
  deselectTrack(): any
}

interface IPlayerState {
  play: boolean
  time: number
  touch: boolean
  track: any
  trackNum: number
  tracks: []
  random: boolean
  loop: boolean
}

export default class PlayerPlaylist extends React.Component<
  IPlayerPlaylistProps,
  IPlayerState
> {
  constructor(props: IPlayerPlaylistProps) {
    super(props)

    this.state = {
      play: true,
      time: 0,
      touch: false,
      track: this.props.playlist.tracks
        ? this.props.playlist.tracks.items[0].track
        : {},
      trackNum: 0,
      tracks: this.props.playlist.tracks
        ? this.props.playlist.tracks.items.map((s: any, index: number) => index)
        : [],
      random: false,
      loop: false
    }
  }

  public componentDidMount() {
    const audio = document.getElementById('PlayerPlaylist') as HTMLMediaElement
    const { loop } = this.state
    let { trackNum } = this.state
    this.props.deselectTrack()
    if (!!audio) {
      audio.onloadstart = () => {
        audio.play()
        this.setState({ play: true })
      }
      audio.onloadstart = () => {
        audio.play()
        this.setState({ play: true })
      }

      audio.onended = () => {
        if (!loop) {
          if (this.state.tracks.length - 1 === trackNum) {
            this.setState({ trackNum: 0 })
          } else {
            this.setState({ trackNum: ++trackNum })
          }
        }
      }

      audio.addEventListener('timeupdate', () => {
        const timer = (audio.currentTime * 100) / audio.duration
        this.setState({ time: +timer.toFixed(0) })
      })
    }
  }

  public componentWillReceiveProps(newProps: IPlayerPlaylistProps) {
    const { selectedTrack, playlist } = newProps
    if (!!selectedTrack) {
      playlist.tracks.items.forEach((tracks: any, index: number) => {
        if (tracks.track.id === selectedTrack.id) {
          this.setState({
            trackNum: index
          })
        }
      })
    }
  }

  public render() {
    const { play, time, loop, tracks, random } = this.state
    let { trackNum } = this.state
    const { playlist, showPlayerPlaylist, votes } = this.props

    const track = playlist.tracks.items[tracks[trackNum]].track
    const voteStatus: ITrackVoteStatus =
      votes.get(track.uri) || ({} as ITrackVoteStatus)

    const numberOfVotes = voteStatus.numberOfVotes || 0
    const userVoted = voteStatus.votedByCurrentUser

    if (!track.preview_url && playlist.tracks.items.length - 1 !== trackNum) {
      this.setState({ trackNum: ++trackNum })
    }

    if (time === 100) {
      this.setState({ time: 0 })
    }

    return (
      <div className="PlayerPlaylist-container">
        <div className="playlist-header-top-menu">
          <Icon onClick={showPlayerPlaylist}>chevron_left</Icon>
          {/* <Icon> search</Icon> */}
        </div>
        <div className="PlayerPlaylist-track-img">
          <div className="PlayerPlaylist-track-img-container">
            <Avatar
              src={track.album.images[0].url}
              className="PlayerPlaylist-track-avatar"
            />
            <div className="progress-circle" data-progress={time || 0} />
          </div>
          <ListItemText
            primary={track.artists[0].name}
            secondary={track.name}
            className="PlayerPlaylist-track-name"
          />
        </div>
        <div className="PlayerPlaylist-control-container">
          <div className="PlayerPlaylist-control-container-flex">
            <div
              className={`PlayerPlaylist-control-white ${loop ? 'active' : ''}`}
            >
              <IconButton
                color="primary"
                component="span"
                onClick={this.onLoopClicked}
                classes={{ disabled: 'disabled' }}
              >
                <Icon>repeat</Icon>
              </IconButton>
            </div>
            <div
              className={`PlayerPlaylist-control-white ${
                random ? 'active' : ''
              }`}
            >
              <IconButton
                color="primary"
                component="span"
                onClick={this.onRandomClicked}
                classes={{ disabled: 'disabled' }}
              >
                <Icon>shuffle</Icon>
              </IconButton>
            </div>
            <div className="PlayerPlaylist-control-white">
              <IconButton
                color="primary"
                component="span"
                onClick={this.onSkipPrevious}
                classes={{ disabled: 'disabled' }}
              >
                <Icon>skip_previous</Icon>
              </IconButton>
            </div>
          </div>
          <div className="PlayerPlaylist-control-play">
            <Button
              variant="fab"
              color="primary"
              className="finder-playlist-header-container-button"
              onClick={this.onPlay}
            >
              <Icon>{play ? 'pause' : 'play_arrow'}</Icon>
            </Button>
          </div>
          <div className="PlayerPlaylist-control-container-flex">
            <div className="PlayerPlaylist-control-white">
              <IconButton
                color="primary"
                component="span"
                onClick={this.onSkipNext}
                classes={{ disabled: 'disabled' }}
              >
                <Icon>skip_next</Icon>
              </IconButton>
            </div>
            <div className="PlayerPlaylist-control-white">
              <div
                className="playList-button-favorite"
                style={{ color: userVoted ? 'secondary' : 'primary' }}
              >
                <span className="playList-favorite-count black">
                  {' '}
                  {numberOfVotes}{' '}
                </span>
                <Icon
                  onClick={this.onTrackVote(track)}
                  className={`playList-favorite-icon ${
                    userVoted ? '' : 'primary'
                  }`}
                >
                  favorite
                </Icon>
              </div>
            </div>
            <div className="PlayerPlaylist-control-white">
              <IconButton
                color="primary"
                component="span"
                disabled={true}
                classes={{ disabled: 'disabled' }}
              >
                <Icon>more_vert</Icon>
              </IconButton>
            </div>
          </div>
        </div>
        <div style={{ display: 'none' }}>
          <audio
            src={track.preview_url}
            id="PlayerPlaylist"
            autoPlay={true}
            loop={loop}
            controls={true}
            className="EventSuggestions-audio"
            preload="none"
          />
        </div>
      </div>
    )
  }

  private onTrackVote = (track: ITrack) => () =>
    this.props.handleTrackVote(track)

  private onRandomClicked = () => this.setState({ random: !this.state.random })

  private onLoopClicked = () => this.setState({ loop: !this.state.loop })

  private onSkipPrevious = () => this.skip(false)

  private onSkipNext = () => this.skip(true)

  private skip = (next: boolean) => {
    let { trackNum } = this.state
    const { random } = this.state
    if (random) {
      let rand = 0 + Math.random() * this.props.playlist.tracks.items.length
      rand = Math.floor(rand)

      while (trackNum === rand) {
        rand = 0 + Math.random() * this.props.playlist.tracks.items.length
        rand = Math.floor(rand)
      }
      this.setState({ trackNum: rand })
    } else {
      this.setState({
        trackNum: next
          ? this.props.playlist.tracks.items.length - 1 === trackNum
            ? 0
            : ++trackNum
          : trackNum === 0
          ? this.props.playlist.tracks.items.length - 1
          : --trackNum
      })
    }
  }

  private onPlay = () => {
    const { play, time } = this.state

    const audio = document.getElementById('PlayerPlaylist') as HTMLMediaElement
    if (time === 100) {
      this.setState({ play: false, time: 0 })
    }
    if (!play) {
      audio.play()
    } else {
      audio.pause()
    }
    this.setState({ play: !play })
  }
}
