import { connect } from 'react-redux'
import IRootState from 'rootState'
import { fetchPlaylists } from 'playlist/playlistActions'
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
  fetchPlaylists
}

const FinderContainer = connect(mapStateToProps, mapDispatchToProps)(Finder)

export default FinderContainer
