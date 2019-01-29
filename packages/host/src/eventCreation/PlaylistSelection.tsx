import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid/Grid'
import List from '@material-ui/core/List/List'
import { cloneDeep, isEmpty } from 'lodash'
import * as React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import partyImg from '../assets/partycover.png'
import EventInput from '../components/EventInput/EventInput'
import GenrePicker from '../components/GenrePicker/GenrePicker'
import TrackItem from '../components/SearchTracks/TrackItemContainer'
import PlaylistCard from '../event/PlaylistCardSmall'
import IAction from '../IAction'
import IPlaylist from '../playlist/IPlaylist'
import ISearch from '../playlist/ISearch'
import IUser from '../user/IUser'
import { formatDuration } from '../util/formatDuration'
import './PlaylistSelection.scss'

interface IPlaylistSelectionProps {
  user: IUser
  playlistInput: any
  playlists: IPlaylist[]
  isCreatingPlaylist: boolean
  searchResult: ISearch
  selectedPlaylist: IPlaylist
  deselectPlaylist(): IAction
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
      playlists,
      handlePickGenre,
      selectedPlaylist,
      deselectPlaylist,
    } = this.props

    const {
      name,
      description
    } = this.state

    const numTracks = (!isEmpty(selectedPlaylist) &&
      selectedPlaylist.tracks &&
      selectedPlaylist.tracks.items
    ) ? selectedPlaylist.tracks.items.length : 0

    const durationSeconds =
      numTracks > 0
        ? selectedPlaylist.tracks.items
          .map(item => item.track.duration_ms)
          .reduce((acc, dur) => acc + dur)
        : 0

    const img = (!isEmpty(selectedPlaylist) && selectedPlaylist.images[0]) ?
      selectedPlaylist.images[0].url :
      partyImg

    const formattedDuration = formatDuration(durationSeconds)

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
          {!isEmpty(selectedPlaylist) && (
            <React.Fragment>
              <div className='PlaylistSummary'>
                <div className='PlaylistImg'>
                  <img src={img}/>
                </div>
                <div className='PlaylistDescription'>
                  <div>
                    {selectedPlaylist.name}
                  </div>
                  <div>
                    {formattedDuration}
                  </div>
                  <Button
                    color={'secondary'}
                    variant={'contained'}
                    onClick={deselectPlaylist}
                  >
                    Deselect Playlist
                  </Button>
                </div>
              </div>
              <List>
                {cloneDeep(selectedPlaylist.tracks.items)
                  .reverse().map((i: any, index: number) => (
                  <TrackItem
                    key={index}
                    track={i.track}
                    disableAddButton={true}
                    layout={'column'}
                    playlistId={selectedPlaylist.id}
                  />
                ))}
              </List>
            </React.Fragment>
          )}
        </Grid>
        <div className="PlaylistCardsContainer">

          {isEmpty(selectedPlaylist) && (
            <React.Fragment>
              <div
                className='Plus'
                onClick={this.handlePlaylistCreation}
              >
                +
              </div>
              {
                playlists.map((playlist: IPlaylist, index: number) => (
                  <div
                    key={index}
                    onClick={this.handlePlaylistSelected(playlist)}
                  >
                    <PlaylistCard
                      playlist={playlist}
                      disableLink={true}
                    />
                  </div>
                ))
              }
            </React.Fragment>

          )}

        </div>
      </Grid>
    )
  }
}

export default PlaylistSelection
