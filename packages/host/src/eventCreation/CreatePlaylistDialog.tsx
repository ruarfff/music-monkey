import Button from '@material-ui/core/Button/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField/TextField'
import * as React from 'react'
import IPlaylistDetails from '../playlist/IPlaylistDetails'
import IUser from '../user/IUser'

interface ICreatePlaylistDialogProps {
  user: IUser
  open: boolean
  onClose(): void
  onPlaylistCreation(details: IPlaylistDetails): void
}

interface ICreatPlaylistDialogState {
  description: string
  name: string
}

export default class CreatePlaylistDialog extends React.Component<
  ICreatePlaylistDialogProps,
  ICreatPlaylistDialogState
> {
  constructor(props: ICreatePlaylistDialogProps) {
    super(props)
    this.state = {
      description: '',
      name: ''
    }
  }

  public handleChange = (name: string) => (event: any) => {
    this.setState({
      ...this.state,
      [name]: event.target.value
    })
  }

  public handlePlaylistSave = (playlistDetails: IPlaylistDetails) => (
    event: any
  ) => {
    this.props.onPlaylistCreation(playlistDetails)
  }

  public render() {
    const { open, onClose } = this.props
    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="create-playlist-form-dialog-title"
      >
        <DialogContent>
          <DialogTitle id="create-playlist-form-dialog-title">
            Create Playlist
          </DialogTitle>
          <TextField
            autoFocus={true}
            required={true}
            margin="normal"
            label="Playlist Name"
            fullWidth={true}
            value={this.state.name}
            onChange={this.handleChange('name')}
          />
          <TextField
            margin="normal"
            label="Playlist Description"
            fullWidth={true}
            multiline={true}
            value={this.state.description}
            onChange={this.handleChange('description')}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            color="secondary"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            disabled={!this.state.name}
            onClick={this.handlePlaylistSave({
              ...this.state,
              userId: this.props.user.userId
            } as IPlaylistDetails)}
            color="primary"
            variant="contained"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
