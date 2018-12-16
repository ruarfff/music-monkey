import {
  Icon,
  IconButton,
  LinearProgress,
  ListItemText
} from '@material-ui/core'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import './Player.scss'

interface IPlayerProps extends RouteComponentProps<any> {
  track: any
}

interface IPlayerState {
  play: boolean
  time: number
  touch: boolean
}

export default class Player extends React.Component<
  IPlayerProps,
  IPlayerState
> {
  constructor(props: IPlayerProps) {
    super(props)

    this.state = {
      play: true,
      time: 0,
      touch: false
    }
  }

  public componentDidMount() {
    const audio = document.getElementById('player') as HTMLMediaElement
    if (!!audio) {
      audio.onloadstart = () => {
        audio.play()
        this.setState({ play: true })
      }
    }
  }

  public render() {
    const { play, time } = this.state
    const { track } = this.props
    setInterval(this.progress, 400)
    const audio = document.getElementById('player') as HTMLMediaElement
    if (!!audio) {
      audio.onloadstart = () => {
        audio.play()
        this.setState({ play: true })
      }
    }
    return (
      <div className="player-container">
        <div className="player-track-img">
          <img src={track.album.images[0].url} />
        </div>
        <div className="player-control-container">
          <div className="player-control-duration">
            {/* <Tooltip title="Add" placement="top"> */}
            <LinearProgress
              variant="determinate"
              value={time}
              onClick={this.onProgressClicked}
              onTouchStart={this.onProgressTouched}
              onTouchMove={this.onTouchStart}
              onTouchEnd={this.onTouchEnd}
            />
            {/* </Tooltip> */}
          </div>
          <div className="player-control">
            <div className="player-control-name">
              <ListItemText
                primary={track.artists[0].name}
                secondary={track.name}
              />
            </div>
            <div className="player-control-play">
              <IconButton
                color="primary"
                className="finder-playlist-header-container-button"
                component="span"
                onClick={this.onPlay}
              >
                <Icon>{play ? 'pause' : 'play_arrow'}</Icon>
              </IconButton>
            </div>
          </div>
        </div>
        <div style={{ display: 'none' }}>
          <audio
            src={track.preview_url}
            id="player"
            autoPlay={true}
            controls={true}
            className="EventSuggestions-audio"
            preload="none"
          />
        </div>
      </div>
    )
  }

  private onProgressTouched = () => {
    this.setState({ touch: true })
  }

  private onProgressClicked = (elem: any) => {
    this.playToTime(elem)
  }

  private progress = () => {
    if (this.state.play && !this.state.touch) {
      const { time, play } = this.state
      const audio = document.getElementById('player') as HTMLMediaElement
      if (!!audio && time !== 100) {
        if (time !== (audio.currentTime * 100) / audio.duration) {
          const timer = (audio.currentTime * 100) / audio.duration
          this.setState({ time: +timer.toFixed(2) })
        }
      }
      if (time === 100 && play) {
        this.setState({ play: false })
      }
    }
  }

  private playToTime = (elem: any) => {
    const time =
      ((elem.clientX - elem.currentTarget.offsetLeft) * 100) /
      elem.currentTarget.offsetWidth
    const audio = document.getElementById('player') as HTMLMediaElement
    if (!!audio) {
      audio.currentTime = (audio.duration * time) / 100
      audio.play()
      this.setState({ play: true, time })
    }
  }

  private onTouchStart = (elem: any) => {
    const time =
      ((elem.touches[0].clientX - elem.currentTarget.offsetLeft) * 100) /
      elem.currentTarget.offsetWidth
    this.setState({ time })
  }

  private onTouchEnd = (elem: any) => {
    const audio = document.getElementById('player') as HTMLMediaElement
    if (!!audio) {
      audio.currentTime = (audio.duration * this.state.time) / 100
      audio.play()
      this.setState({ play: true, touch: false })
    }
  }

  private onPlay = () => {
    const { play, time } = this.state

    const audio = document.getElementById('player') as HTMLMediaElement
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
