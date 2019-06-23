import { connect } from 'react-redux'
import IRootState from '../../rootState'
import PlaylistListView from './PlaylistListView'
import { deselectEvent } from '../../event/eventActions'

const mapStateToProps = (state: IRootState) => ({
  selectedEvent: state.event.selectedEvent,
  pastEvents: state.event.pastEvents,
  upcomingEvents: state.event.upcomingEvents,
  liveEvents: state.event.liveEvents,
  eventsLoading: state.event.eventsLoading
})

const mapDispatchToProps = { deselectEvent }

const PlaylistViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistListView)

export default PlaylistViewContainer
