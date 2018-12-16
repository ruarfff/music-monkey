import Button from '@material-ui/core/Button/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import * as React from 'react'
import IAction from '../IAction'
import IPlaylist from '../playlist/IPlaylist'
import PlaylistsSimpleList from '../playlist/PlaylistsSimpleList'
import IUser from '../user/IUser'

interface IExistingPlaylistDialogProps {
  user: IUser
  open: boolean
  playlists: IPlaylist[]
  onClose(event: any): void
  onPlaylistSelected(playlist: IPlaylist): void
  fetchPlaylists(user: IUser): IAction
}

export default class ExistingPlaylistDialog extends React.PureComponent<
  IExistingPlaylistDialogProps
> {
  public componentDidMount() {
    this.props.fetchPlaylists(this.props.user)
  }

  public render() {
    const { open, user, playlists, onClose, onPlaylistSelected } = this.props
    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="select-playlist-form-dialog-title"
      >
        <DialogTitle id="select-playlist-form-dialog-title">
          Select a Playist
        </DialogTitle>
        <DialogContent>
          <PlaylistsSimpleList
            onPlaylistSelected={onPlaylistSelected}
            playlists={playlists}
            user={user}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
