import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { fetchMorePlaylists, fetchPlaylists } from 'playlist/playlistActions'
import IRootState from 'rootState'
import {
  savePlaylistSuggestion,
  saveTrackSuggestion
} from 'requests/suggestionActions'
import Finder from './Finder'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  event: state.event.event,
  events: state.event.events,
  userPlaylists: state.playlist.data,
  searchResults: state.search.tracks,
  searching: state.search.searching
})

const mapDispatchToProps = {
  saveTrackSuggestion,
  fetchPlaylists,
  savePlaylistSuggestion,
  fetchMorePlaylists
}

const FinderContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Finder)
)

export default FinderContainer
