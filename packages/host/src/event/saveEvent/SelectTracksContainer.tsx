import { connect } from 'react-redux'
import IRootState from 'rootState'
import SelectTracks from './SelectTracks'
import { getRecommendations } from 'recommendations/recommendationActions'

const mapStateToProps = (state: IRootState) => ({  
  recommendedTracks: state.recommendation.tracks
})

const mapDispatchToProps = {  
  getRecommendations
}

const SelectTracksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectTracks)

export default SelectTracksContainer
