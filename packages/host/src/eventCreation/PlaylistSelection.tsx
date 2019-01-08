import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid/Grid'
import TextField from '@material-ui/core/TextField/TextField'
import OpenInNew from '@material-ui/icons/OpenInNew'
import * as React from 'react'
import IAction from '../IAction'
import IPlaylist from '../playlist/IPlaylist'
import IPlaylistDetails from '../playlist/IPlaylistDetails'
import IUser from '../user/IUser'
import CreatePlaylistDialog from './CreatePlaylistDialog'
import ExistingPlaylistDialog from './ExistingPlaylistDialog'
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
}

class PlaylistSelection extends React.Component<IPlaylistSelectionProps> {
  public state = {
    selected: {
      label: '',
      value: ''
    }
  }

  public handleClose = () => {
    this.setState({ anchorEl: null })
  }

  public handlePlaylistSelected = (playlist: IPlaylist) => {
    this.props.onPlaylistAdded(playlist.external_urls.spotify)
    this.props.closeExistingPlaylist()
  }

  public handlePlaylistCreation = (playlistDetals: IPlaylistDetails) => {
    if (!this.props.isCreatingPlaylist) {
      this.props.createEventPlaylist({
        ...playlistDetals,
        user: this.props.user,
      })
    }
    this.props.closeCreatePlaylist()
  }

  public selectExistingSelected = () => {
    this.handleClose()
    this.props.selectExistingPlaylist()
  }

  public createPlaylistSelected = () => {
    this.handleClose()
    this.props.selectCreatePlaylist()
  }

  public render() {
    const {
      user,
      value,
      playlists,
      playlistInput,
      closeExistingPlaylist,
      closeCreatePlaylist,
      fetchPlaylists
    } = this.props
    return (
      <Grid container={true} spacing={8} alignItems="flex-end">
        <Grid item={true} md={3}>
          <TextField
            label="SELECT FROM SPOTIFY"
            required={true}
            disabled={false}
            fullWidth={true}
            margin="normal"
            value={value}
            onClick={this.selectExistingSelected}
          />
        </Grid>
        <Grid item={true} className="PlaylistSelection-menu-icon" md={3}>
          {value && (
            <a href={value} target="_blank">
              <OpenInNew fill="#FFB000" />
            </a>
          )}
          <Button onClick={this.createPlaylistSelected}>
            <span className="PlaylistSelection-button">
              CREATE NEW PLAYLIST
            </span>
          </Button>

          <ExistingPlaylistDialog
            user={user}
            playlists={playlists}
            open={playlistInput.isSelectingExistingPlaylist}
            onClose={closeExistingPlaylist}
            onPlaylistSelected={this.handlePlaylistSelected}
            fetchPlaylists={fetchPlaylists}
          />
          <CreatePlaylistDialog
            user={user}
            open={playlistInput.isCreatingNewPlaylist}
            onClose={closeCreatePlaylist}
            onPlaylistCreation={this.handlePlaylistCreation}
          />
        </Grid>
      </Grid>
    )
  }
}

export default PlaylistSelection
