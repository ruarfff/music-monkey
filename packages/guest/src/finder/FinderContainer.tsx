import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { deselectEvent, setEventId } from 'event/eventActions'
import { fetchMorePlaylists, fetchPlaylists } from 'playlist/playlistActions'
import IRootState from 'rootState'
import {
  savePlaylistSuggestion,
  saveTrackSuggestion
} from 'requests/suggestionActions'
import Finder from './Finder'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  events: state.event.events,
  userPlaylists: state.playlist.data,
  event: state.event.event,
  searchResults: state.search.tracks,
  searching: state.search.searching
})

const mapDispatchToProps = {
  saveTrackSuggestion,
  fetchPlaylists,
  savePlaylistSuggestion,
  deselectEvent,
  fetchMorePlaylists,
  setEventId
}

const FinderContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Finder)
)

export default FinderContainer
