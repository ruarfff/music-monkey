// import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid/Grid'
import TextField from '@material-ui/core/TextField/TextField'
import OpenInNew from '@material-ui/icons/OpenInNew'
import * as React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import EventInput from '../components/EventInput/EventInput'
import GenrePicker from '../components/GenrePicker/GenrePicker'
import PlaylistCard from '../event/PlaylistCardSmall'
import IAction from '../IAction'
import IPlaylist from '../playlist/IPlaylist'
import IUser from '../user/IUser'
// import CreatePlaylistDialog from './CreatePlaylistDialog'
// import ExistingPlaylistDialog from './ExistingPlaylistDialog'
import './PlaylistSelection.scss'

interface IPlaylistSelectionProps {
  user: IUser
  value: string
  playlistInput: any
  playlists: IPlaylist[]
  isCreatingPlaylist: boolean
  closeCreatePlaylist(): any
  closeExistingPlaylist(): any
  createEventPlaylist(playlistDetails: any): any
  onPlaylistAdded(playlistUrl: string): any
  selectCreatePlaylist(): any
  selectExistingPlaylist(): any
  fetchPlaylists(user: IUser): IAction
  handlePickGenre(content: string): void
  setEventPlaylist?(playlist: IPlaylist): void
}

const SweetAlert = withReactContent(Swal) as any

class PlaylistSelection extends React.Component<IPlaylistSelectionProps> {
  public state = {
    name: '',
    description: '',
    showFillPlaylistErrorDialog: true,
    selected: {
      label: '',
      value: ''
    }
  }

  public showFillPlaylistErrorDialog = () => {
    this.setState({ showFillPlaylistErrorDialog: false })
    SweetAlert.fire({
      confirmButtonColor: '#8f0a00',
      title: 'Set playlist name',
      type: 'error'
    }).then()
  }

  public componentDidMount() {
    this.props.fetchPlaylists(this.props.user)
  }

  public handleClose = () => {
    this.setState({ anchorEl: null })
  }

  public handlePlaylistSelected = (playlist: IPlaylist) => () => {
    this.props.onPlaylistAdded(playlist.external_urls.spotify)
    if (this.props.setEventPlaylist) {
      this.props.setEventPlaylist(playlist)
    }

    this.setState({
      name: playlist.name,
      description: playlist.description
    })
  }

  public handlePlaylistCreation = () => {
    const { name, description } = this.state
    if (!this.props.isCreatingPlaylist) {
      if (name) {
        this.props.createEventPlaylist({
          user: this.props.user,
          name,
          description
        })
      } else {
        this.showFillPlaylistErrorDialog()
      }
    }
  }

  public selectExistingSelected = () => {
    this.handleClose()
    this.props.selectExistingPlaylist()
  }

  public handlePlaylistNameChange = (name: string) => {
    this.setState({ name })
  }

  public handlePlaylistDescriptionChange = (description: string) => {
    this.setState({ description })
  }

  public render() {
    const {
      value,
      playlists,
      handlePickGenre,
    } = this.props

    const {
      name,
      description
    } = this.state

    return (
      <Grid container={true} spacing={24} alignItems="flex-end">
        <Grid item={true} md={12}>
          <span>Add or pick a playlist</span>
          <EventInput
            onChange={this.handlePlaylistNameChange}
            value={name}
            error={!name}
            errorLabel={'Enter playlist name'}
            placeholder={'Playlist Name'}
            label={'Set Playlist Name'}
          />

          <EventInput
            onChange={this.handlePlaylistDescriptionChange}
            value={description}
            placeholder={'Playlist Description'}
            label={'Set Playlist Description'}
          />

          <GenrePicker onChange={handlePickGenre} />
        </Grid>
        <div className="PlaylistCardsContainer">
          <div
            className='Plus'
            onClick={this.handlePlaylistCreation}
          >
            +
          </div>
          {playlists.map((playlist: IPlaylist, index: number) => (
            <div
              onClick={this.handlePlaylistSelected(playlist)}
            >
              <PlaylistCard
                playlist={playlist}
                key={index}
                disableLink={true}
              />
            </div>

          ))}
        </div>

        <Grid item={true} md={12}>
          <TextField
            label="SELECT FROM SPOTIFY"
            required={true}
            disabled={false}
            fullWidth={true}
            margin="normal"
            value={value}
            onClick={this.selectExistingSelected}
          />
          <div className="PlaylistSelection-menu-icon">
            {value && (
              <a href={value} target="_blank">
                <OpenInNew fill="#FFB000" />
              </a>
            )}
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default PlaylistSelection
