import { connect } from 'react-redux'
import IRootState from '../../rootState'
import PlaylistListView from './PlaylistListView'
import { deselectEvent } from '../../event/eventActions'

const mapStateToProps = (state: IRootState) => ({
  selectedEvent: state.event.selectedEvent,
  eventsLoading: state.event.eventsLoading,
  events: state.event.events
})

const mapDispatchToProps = { deselectEvent }

const PlaylistViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistListView)

export default PlaylistViewContainer
