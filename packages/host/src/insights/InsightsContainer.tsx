import { connect } from 'react-redux'
import IRootState from 'rootState'
import Insights from './Insights'

const mapStateToProps = (state: IRootState) => ({
  event: state.event.event,
  events: state.event.events
})

const mapDispatchToProps = {}

const insightsContainer = connect(mapStateToProps, mapDispatchToProps)(Insights)

export default insightsContainer
