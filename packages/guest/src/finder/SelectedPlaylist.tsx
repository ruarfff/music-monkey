import { Button, Icon } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { Link } from 'react-router-dom'
import Images from '../img/ImportImg'
import IPlaylist from '../playlist/IPlaylist'
import ITrack from '../track/ITrack'
import TrackList from '../track/TrackList'

const React = require('react')

interface ISelectedPlaylistProps {
  playlist: IPlaylist
  onAddAll(): void
  onTrackSelected(track: ITrack): any
}

const SelectedPlaylist = ({
  playlist,
  onAddAll,
  onTrackSelected
}: ISelectedPlaylistProps) => {
  return (
    <div>
      <div className="finder-playlist-header">
        <div className="finder-playlist-img">
          <img src={Images.Playlist} />
        </div>
        <div className="finder-playlist-container">
          <div className="finder-playlist-container-top">
            <Link to="/finder">
              <Icon>keyboard_backspace</Icon>
            </Link>
          </div>
          <div className="finder-playlist-container-title">
            {playlist.name} <br />
            {playlist.tracks.total} {' Tracks'}
          </div>
          <div className="finder-playlist-container-button">
            <Button
              variant="fab"
              color="primary"
              className="finder-playlist-header-container-button"
              onClick={onAddAll}
            >
              <AddIcon />
            </Button>
            <span className="finder-playlist-header-container-button-label">
              Add All
            </span>
          </div>
        </div>
      </div>
      <TrackList
        tracks={playlist.tracks.items.map((item: any) => item.track)}
        withSuggestingEnabled={true}
        onTrackSelected={onTrackSelected}
      />
    </div>
  )
}

// function handleSelectPlaylist(
//   event: IEvent,
//   user: IUser,
//   selectedPlaylist: IPlaylist,
//   savePlaylistSuggestion: any
// ) {
//   const eventId = event.eventId || ''
//   const userId = user.userId || ''
//   const playlist: IPlaylist = selectedPlaylist

//   savePlaylistSuggestion({
//     eventId,
//     userId,
//     playlistUri: playlist.uri,
//     trackUris: playlist.tracks.items.map(
//       (item: IPlaylistItem) => item.track.uri
//     )
//   } as IPlaylistSuggestion)
// }

// const handleSelectTrack = () => {
//     const {
//       event,
//       user,
//       deselectTrack,
//       selectedTrack,
//       saveTrackSuggestion
//     } = this.props
//     const eventId = event.eventId || ''
//     const userId = user.userId || ''
//     saveTrackSuggestion({
//       eventId,
//       userId,
//       trackUri: selectedTrack.uri
//     } as ITrackSuggestion)
//     this.setState({
//       openSnackbar: true,
//       valueSnackbar: `Track ${selectedTrack.name} suggestion!`
//     })
//     this.props.getSuggestions(this.props.event.eventId)
//     deselectTrack()
//   }

export default SelectedPlaylist
