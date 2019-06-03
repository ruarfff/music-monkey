import { connect } from 'react-redux'
import IRootState from '../../rootState'
import PlaylistListView from './PlaylistListView'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  eventPlaylists: state.playlist.eventPlaylists,
  events: state.event.events,
  eventsLoading: state.event.eventsLoading
})

const mapDispatchToProps = {}

const PlaylistViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistListView)

export default PlaylistViewContainer
