import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { getEvents } from 'event/eventActions'
import IRootState from 'rootState'
import PlaylistsView from './PlaylistsView'

const mapStateToProps = (state: IRootState) => ({
  events: state.event,
  user: state.user,
  playlists: state.playlist.data
})

const mapDispatchToProps = {
  getEvents
}

const PlaylistsContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistsView) as any)

export default PlaylistsContainer
