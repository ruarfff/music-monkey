import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { fetchMorePlaylists, fetchPlaylists } from 'playlist/playlistActions'
import IRootState from 'rootState'
import {
  savePlaylistSuggestion,
  saveTrackSuggestion
} from 'request/requestActions'
import { getRecommendations } from 'recommendation/recommendationActions'
import { Finder } from 'mm-shared'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  event: state.event.event,
  events: state.event.events,
  userPlaylists: state.playlist.data,
  recommendations: state.recommendation.tracks
})

const mapDispatchToProps = {
  getRecommendations,
  saveTrackRequest: saveTrackSuggestion,
  fetchPlaylists,
  savePlaylistRequest: savePlaylistSuggestion,
  fetchMorePlaylists
}

const FinderContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Finder)
)

export default FinderContainer
