import Button from '@material-ui/core/Button'
import * as React from 'react'
import AvatarEditor from 'react-avatar-editor'
import './EditAvatar.scss'

interface IEditAvatarProps {
  url: string
  toggleEditAvatarModal(): void
}

class EditAvatar extends React.Component<IEditAvatarProps> {
  public state = {
    newUrl: this.props.url,
    zoom: 1
  }

  public editorRef: any

  public render() {
    return (
      <div className="EditAvatar-wrapper">
        <div className="EditAvatar-container">
          <AvatarEditor
            ref={this.setEditorRef}
            width={110}
            height={110}
            border={50}
            borderRadius={110}
            scale={parseFloat(this.state.zoom + '')}
            rotate={0}
            image={this.state.newUrl}
          />
          <div className="EditAvatar-controls">
            <input type="file" onChange={this.setFile} />

            <div>
              <span>zoom</span>
              <input
                name="zoom"
                type="range"
                min="0.1"
                max="2"
                step="0.1"
                onChange={this.setZoom}
              />
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={this.onClickSave}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.onClickCancel}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  private onClickCancel = () => {
    this.props.toggleEditAvatarModal()
  }

  private onClickSave = () => {
    if (this.props.url !== this.state.newUrl) {
      this.editorRef.getImage().toBlob((blob: any) => {
        // this.props.uploadAvatar(blob)
        this.props.toggleEditAvatarModal()
      })
    }
  }

  private setFile = (event: any) => {
    const fr = new FileReader()
    fr.onload = (e: any) => {
      this.setState({ newUrl: e.target.result })
    }
    fr.readAsDataURL(event.target.files[0])
  }

  private setZoom = (e: any) => {
    this.setState({ zoom: e.target.value })
  }

  private setEditorRef = (editorRef: any) => (this.editorRef = editorRef)
}

export default EditAvatar
