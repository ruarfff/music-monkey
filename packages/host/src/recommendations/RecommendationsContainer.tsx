import { connect } from 'react-redux'
import IRootState from '../rootState'
import { getRecommendations } from './recommendationActions'
import Recommendations from './Recommendations'

const mapStateToProps = (state: IRootState) => ({
  recommendedTracks: state.recommendation.tracks
})

const mapDispatchToProps = {
  getRecommendations
}

const RecommendationsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Recommendations)

export default RecommendationsContainer
