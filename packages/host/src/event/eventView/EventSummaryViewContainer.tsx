import { connect } from 'react-redux'
import IRootState from 'rootState'
import EventSummaryView from './EventSummaryView'

const mapStateToProps = (state: IRootState) => ({
  event: state.event.event
})

const mapDispatchToProps = {}

const EventSummaryViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventSummaryView)

export default EventSummaryViewContainer