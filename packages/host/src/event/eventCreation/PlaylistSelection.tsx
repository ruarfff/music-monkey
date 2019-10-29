import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid/Grid'
import IconButton from '@material-ui/core/IconButton/IconButton'
import List from '@material-ui/core/List/List'
import Snackbar from '@material-ui/core/Snackbar/Snackbar'
import CachedIcon from '@material-ui/icons/Cached'
import CloseIcon from '@material-ui/icons/Close'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import { DropResult } from 'react-beautiful-dnd'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import IAction from 'IAction'
import partyImg from 'assets/partycover.jpg'
import EventInput from 'components/EventInput/EventInput'
import GenrePicker from 'event/eventCreation/GenrePicker'
import PlaylistCard from 'catalogue/SmallPlaylistCard'
import notification from 'notification/notificationReducer'
import IPlaylist from 'playlist/IPlaylist'
import ISearch from 'playlist/ISearch'
import TrackList from 'track/TrackList'
import IUser from 'user/IUser'
import formatDuration from 'util/formatDuration'
import './PlaylistSelection.scss'

interface IPlaylistSelectionProps {
  user: IUser
  playlists: IPlaylist[]
  isCreatingPlaylist: boolean
  searchResult: ISearch
  selectedPlaylist: IPlaylist
  deselectPlaylist(): IAction
  createEventPlaylist(playlistDetails: any): any
  onPlaylistAdded(playlistUrl: string): any
  handleEventName(name: string): any
  fetchPlaylists(user: IUser): IAction
  handlePickGenre(content: string): void
  setEventPlaylist(playlist: IPlaylist): void
  getMoreUsersPlaylists(user: IUser, offset: number): void
  onPlaylistDragDrop(
    playlist: IPlaylist,
    fromIndex: number,
    toIndex: number
  ): IAction
  tryRemoveTrack(playlistId: string, uri: string, position: number): IAction
}

const SweetAlert = withReactContent(Swal) as any

class PlaylistSelection extends React.Component<IPlaylistSelectionProps> {
  public state = {
    name: '',
    description: '',
    offset: 50,
    showFillPlaylistErrorDialog: true,
    isOpen: false,
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

  public handlePlaylistSelected = (playlist: IPlaylist) => () => {
    this.props.onPlaylistAdded(playlist.external_urls.spotify)
    this.props.setEventPlaylist(playlist)
  }

  public handleLoadMore = () => {
    this.props.getMoreUsersPlaylists(this.props.user, this.state.offset)
    this.setState({ offset: this.state.offset + 50 })
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

  public handlePlaylistNameChange = (name: string) => {
    this.setState({ name })
    this.props.handleEventName(name)
  }

  public handlePlaylistDescriptionChange = (description: string) => {
    this.setState({ description })
  }

  public handleCloseNotification = () => {
    this.setState({ isOpen: false })
  }

  public handlePlaylistDragDrop = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    this.props.onPlaylistDragDrop(
      this.props.selectedPlaylist,
      result.source.index,
      result.destination.index
    )
  }

  public handleRemoveTrack = (uri: string, position: number) => {
    this.props.tryRemoveTrack(this.props.selectedPlaylist.id, uri, position)
  }

  public render() {
    const {
      playlists,
      handlePickGenre,
      selectedPlaylist,
      deselectPlaylist
    } = this.props

    const { name, description, isOpen } = this.state

    const numTracks =
      !isEmpty(selectedPlaylist) &&
      selectedPlaylist.tracks &&
      selectedPlaylist.tracks.items
        ? selectedPlaylist.tracks.items.length
        : 0

    const durationSeconds =
      numTracks > 0
        ? selectedPlaylist.tracks.items
            .map(item => item.track.duration_ms)
            .reduce((acc, dur) => acc + dur)
        : 0

    const img =
      !isEmpty(selectedPlaylist) && selectedPlaylist.images[0]
        ? selectedPlaylist.images[0].url
        : partyImg

    const formattedDuration = formatDuration(durationSeconds)

    return (
      <Grid container={true} spacing={3} alignItems="flex-end">
        <Grid item={true} md={12}>
          <span>Add or pick a playlist</span>
          <EventInput
            onChange={this.handlePlaylistNameChange}
            value={name}
            error={!name}
            autoFocus={true}
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
          {!isEmpty(selectedPlaylist) && (
            <React.Fragment>
              <Snackbar
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center'
                }}
                autoHideDuration={4000}
                open={isOpen}
                onClose={this.handleCloseNotification}
                ContentProps={{
                  'aria-describedby': 'message-id'
                }}
                message={<span id="message-id">{notification}</span>}
                action={[
                  <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={this.handleCloseNotification}
                  >
                    <CloseIcon />
                  </IconButton>
                ]}
              />
              <div className="PlaylistSummary">
                <div className="PlaylistImg">
                  <img alt="playlist" src={img} />
                </div>
                <div className="PlaylistDescription">
                  <div>{selectedPlaylist.name}</div>
                  <div>{formattedDuration}</div>
                  <div>
                    {numTracks > 1
                      ? numTracks + ' Tracks'
                      : numTracks + ' Track'}
                  </div>
                  <Button
                    color={'secondary'}
                    variant={'contained'}
                    onClick={deselectPlaylist}
                  >
                    CHOOSE OTHER PLAYLIST
                  </Button>
                </div>
              </div>
              <List>
                <TrackList
                  onDragEnd={this.handlePlaylistDragDrop}
                  tracks={cloneDeep(selectedPlaylist.tracks.items).map(
                    i => i.track
                  )}
                />
              </List>
            </React.Fragment>
          )}
        </Grid>
        <div className="PlaylistCardsContainer">
          {isEmpty(selectedPlaylist) && (
            <React.Fragment>
              <div className="Plus" onClick={this.handlePlaylistCreation}>
                +
              </div>
              {playlists.map((playlist: IPlaylist, index: number) => (
                <div
                  key={index}
                  onClick={this.handlePlaylistSelected(playlist)}
                >
                  <PlaylistCard playlist={playlist} />
                </div>
              ))}
              <div className="Plus" onClick={this.handleLoadMore}>
                <CachedIcon fontSize={'inherit'} />
              </div>
            </React.Fragment>
          )}
        </div>
      </Grid>
    )
  }
}

export default PlaylistSelection
