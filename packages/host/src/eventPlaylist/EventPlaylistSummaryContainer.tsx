import { connect } from 'react-redux'
import IRootState from '../rootState'
import EventPlaylistSummary from './EventPlaylistSummary'

const mapStateToProps = (state: IRootState) => ({
  event: state.eventView.event,
  playlist: state.eventPlaylist.playlist
})

const mapDispatchToProps = {}

const EventPlaylistSummaryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPlaylistSummary)

export default EventPlaylistSummaryContainer
