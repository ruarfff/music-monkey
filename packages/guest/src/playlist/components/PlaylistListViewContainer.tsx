import { connect } from 'react-redux'
import IRootState from '../../rootState'
import PlaylistListView from './PlaylistListView'

const mapStateToProps = (state: IRootState) => ({
  events: state.event.events,
  eventsLoading: state.event.eventsLoading
})

const mapDispatchToProps = {}

const PlaylistViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistListView)

export default PlaylistViewContainer
