import { connect } from 'react-redux'
import IRootState from 'rootState'
import { getRecommendations } from 'recommendation/recommendationActions'
import AddTracks from './AddTracks'

const mapStateToProps = (state: IRootState) => ({
  recommendedTracks: state.recommendation.tracks
})

const mapDispatchToProps = {
  getRecommendations
}

const AddTracksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTracks)

export default AddTracksContainer
