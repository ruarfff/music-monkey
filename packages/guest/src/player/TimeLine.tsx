import LinearProgress from '@material-ui/core/LinearProgress'
import * as React from 'react'
import './TimeLine.scss'

interface ITimeLineProps {
  trackUrl: string
  isPlay: boolean
  handleTogglePlayer(): void
}

class TimeLine extends React.PureComponent<ITimeLineProps> {
  public state = {
    time: 0,
    touch: false
  }

  public audio: HTMLAudioElement = new Audio()

  public componentDidMount() {
    const { trackUrl } = this.props

    this.audio = new Audio(trackUrl)

    this.audio.onloadstart = () => {
      if (trackUrl) {
        this.startPlay()
        requestAnimationFrame(() => this.progress())
      }
    }
  }

  public componentWillReceiveProps(newProps: ITimeLineProps) {
    const { trackUrl } = this.props
    if (trackUrl !== newProps.trackUrl && newProps.trackUrl) {
      this.stopPlay()
      this.setState({ time: 0 })
      this.audio.src = newProps.trackUrl
      this.startPlay()
      if (!this.props.isPlay) {
        this.props.handleTogglePlayer()
      }
    }

    if (newProps.isPlay && this.state.time === 100) {
      this.setState({ time: 0 })
      this.startPlay()
    }

    if (!newProps.trackUrl) {
      this.stopPlay()
      this.setState({ time: 0 })
      this.audio.src = ''
    }

    if (
      !trackUrl &&
      newProps.trackUrl &&
      trackUrl !== newProps.trackUrl &&
      this.props.isPlay
    ) {
      this.props.handleTogglePlayer()
    }

    if (newProps.isPlay) {
      this.startPlay()
    } else {
      this.stopPlay()
    }
  }

  public componentWillUnmount() {
    this.stopPlay()
    delete this.audio
  }

  public render() {
    const { time } = this.state

    return (
      <LinearProgress
        className={'TimeLine-progress'}
        variant="determinate"
        value={time}
        onClick={this.onProgressClicked}
        onTouchStart={this.onProgressTouched}
        onTouchMove={this.onTouchStart}
        onTouchEnd={this.onTouchEnd}
      />
    )
  }

  private playToTime = (elem: any) => {
    const time =
      ((elem.clientX - elem.currentTarget.offsetLeft) * 100) /
      elem.currentTarget.offsetWidth
    const audio = this.audio
    if (!!audio) {
      audio.currentTime = (audio.duration * time) / 100
      this.startPlay()
      this.setState({ play: true, time })
    }
  }

  private progress = () => {
    if (this.props.isPlay && !this.state.touch) {
      const { time } = this.state

      const { isPlay } = this.props
      const audio = this.audio
      if (!!audio && time !== 100) {
        if (time !== (audio.currentTime * 100) / audio.duration) {
          const timer = (audio.currentTime * 100) / audio.duration
          this.setState({ time: +timer.toFixed(2) })
        }

        requestAnimationFrame(() => this.progress())
      }
      if (time === 100 && isPlay) {
        this.stopPlay()
        this.props.handleTogglePlayer()
      }
    }
  }

  private onTouchStart = (elem: any) => {
    const time =
      ((elem.touches[0].clientX - elem.currentTarget.offsetLeft) * 100) /
      elem.currentTarget.offsetWidth
    this.setState({ time })
  }

  private onTouchEnd = (elem: any) => {
    const audio = this.audio
    if (!!audio) {
      audio.currentTime = (audio.duration * this.state.time) / 100
      this.startPlay()
      this.setState({ touch: false })
    }
    if (!this.props.isPlay) {
      this.props.handleTogglePlayer()
    }
  }

  private onProgressTouched = () => {
    this.setState({ touch: true })
  }

  private onProgressClicked = (elem: any) => {
    this.playToTime(elem)
    if (!this.props.isPlay) {
      this.props.handleTogglePlayer()
    }
  }

  private stopPlay = () => {
    this.audio.pause()
  }

  private startPlay = () => {
    if (this.props.trackUrl && !!this.audio) {
      this.audio.play()
    }
    requestAnimationFrame(() => this.progress())
  }
}

export default TimeLine
