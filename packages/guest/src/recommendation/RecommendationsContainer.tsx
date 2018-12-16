import { connect } from 'react-redux'
import IRootState from '../rootState'
import Recommendations from './Recommendations'
import { getRecommendations } from './recommendationsActions'

const mapStateToProps = (state: IRootState) => ({
  tracks: state.recommendation.tracks
})

const mapDispatchToProps = {
  getRecommendations
}

const RecommendationsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Recommendations)

export default RecommendationsContainer
