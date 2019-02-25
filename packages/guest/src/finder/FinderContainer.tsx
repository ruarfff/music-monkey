import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { deselectEvent, getEvent, selectEvent } from '../event/eventActions'
import { selectPlaylist } from '../navigation/activeActions'
import { fetchPlaylists } from '../playlist/playlistActions'
import IRootState from '../rootState'
import {
  savePlaylistSuggestion,
  saveTrackSuggestion,
} from '../suggestion/suggestionActions'
import Finder from './Finder'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  events: state.event.events,
  userPlaylists: state.playlist.data,
  selectedUserPlaylist: state.playlist.selectedPlaylist,
  selectedEvent: state.event.selectedEvent,
  searchResults: state.search.tracks,
  searching: state.search.searching
})

const mapDispatchToProps = {
  selectEvent,
  saveTrackSuggestion,
  fetchPlaylists,
  selectPlaylist,
  savePlaylistSuggestion,
  deselectEvent,
  getEvent
}

const FinderContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Finder)
)

export default FinderContainer
