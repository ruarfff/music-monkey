import { connect } from 'react-redux'
import { searchTrack } from 'playlist/playlistActions'
import IRootState from 'rootState'
import SelectTracks from './SelectTracks'
import { getRecommendations } from 'recommendations/recommendationActions'

const mapStateToProps = (state: IRootState) => ({
  searchResult: state.playlist.searchResult,
  recommendedTracks: state.recommendation.tracks
})

const mapDispatchToProps = {
  searchTrack,
  getRecommendations
}

const SelectTracksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectTracks)

export default SelectTracksContainer
