import { Icon, IconButton, ListItemText } from '@material-ui/core'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './Player.scss'
import TimeLine from './TimeLine'

const SweetAlert = withReactContent(Swal) as any

interface IPlayerProps extends RouteComponentProps<any> {
  track: any
}

interface IPlayerState {
  play: boolean
  showErrorDialog: boolean
}

export default class Player extends React.Component<
  IPlayerProps,
  IPlayerState
> {
  constructor(props: IPlayerProps) {
    super(props)

    this.state = {
      play: true,
      showErrorDialog: true
    }
  }

  public componentDidMount() {
    if (!this.props.track.preview_url) {
      this.showErrorDialog('Sorry. This song don`t have a preview')
    }
  }

  public componentWillReceiveProps(newProps: IPlayerProps) {
    if (!newProps.track.preview_url) {
      this.showErrorDialog('Sorry. This song don`t have a preview')
    }
  }

  public render() {
    const { play } = this.state
    const { track } = this.props
    return (
      <div className="player-container">
        <div className="player-track-img">
          <img alt="track" src={track.album.images[0].url} />
        </div>
        <div className="player-control-container">
          <div className="player-control-duration">
            <TimeLine
              isPlay={play}
              trackUrl={track.preview_url}
              handleTogglePlayer={this.handleTogglePlayer}
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
                onClick={this.handleTogglePlayer}
              >
                <Icon>{play ? 'pause' : 'play_arrow'}</Icon>
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    )
  }

  private handleTogglePlayer = () => {
    this.setState({ play: !this.state.play })
  }

  private showErrorDialog = (message: string) => {
    if (this.state.play) {
      this.handleTogglePlayer()
    }
    this.setState({ showErrorDialog: false })
    SweetAlert.fire({
      confirmButtonColor: '#ffb000',
      title: message,
      type: 'error'
    }).then()
  }
}
