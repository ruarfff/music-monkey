import React from 'react'
import Button from '@material-ui/core/Button/Button'
import EventInput from 'components/EventInput/EventInput'
import { Action, Playlist } from 'mm-shared'
import './EditPlaylistPopup.scss'

interface IEditPlaylistPopupProps {
  playlist: Playlist
  togglePopup(): void
  editPlaylist(playlistId: string, name: string, description: string): Action
}

class EditPlaylistPopup extends React.PureComponent<IEditPlaylistPopupProps> {
  public state = {
    name: '',
    description: ''
  }

  public componentDidMount() {
    this.setState({
      name: this.props.playlist.name,
      description: this.props.playlist.description
    })
  }

  public handleInputChange = (key: string) => (content: any) => {
    this.setState({ [key]: content })
  }

  public handleCancel = () => {
    this.props.togglePopup()
  }

  public handleEditPlaylist = () => {
    const { editPlaylist, togglePopup, playlist } = this.props
    const { name, description } = this.state
    if (name !== '' && description !== '') {
      editPlaylist(playlist.id, name, description)
      togglePopup()
    }
  }

  public render() {
    const { name, description } = this.state
    return (
      <div className="EditPlaylistPopup-root">
        <EventInput
          label="Playlist name"
          error={!name}
          errorLabel="Name is required"
          value={name}
          onChange={this.handleInputChange('name')}
        />
        <EventInput
          label="Playlist description"
          value={description}
          errorLabel="Description is required"
          error={!description}
          onChange={this.handleInputChange('description')}
        />
        <Button color="default" variant="contained" onClick={this.handleCancel}>
          Cancel
        </Button>
        <Button
          onClick={this.handleEditPlaylist}
          color="secondary"
          variant="contained"
        >
          Edit
        </Button>
      </div>
    )
  }
}

export default EditPlaylistPopup
