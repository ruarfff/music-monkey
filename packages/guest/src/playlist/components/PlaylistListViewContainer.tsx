import { connect } from 'react-redux'
import IRootState from '../../rootState'
import PlaylistListView from './PlaylistListView'

const mapStateToProps = (state: IRootState) => ({
  pastEvents: state.event.pastEvents,
  upcomingEvents: state.event.upcomingEvents,
  liveEvents: state.event.liveEvents,
  eventsLoading: state.event.eventsLoading
})

const mapDispatchToProps = {}

const PlaylistViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistListView)

export default PlaylistViewContainer
