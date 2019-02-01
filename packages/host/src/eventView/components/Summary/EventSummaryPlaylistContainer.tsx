import { connect } from 'react-redux'
import IRootState from '../../../rootState'
import {
  toggleAutoAcceptSuggestions,
  toggleDynamicVoting,
  toggleSuggestingPlaylists
} from '../../eventViewActions'
import EventSummaryPlaylist from './EventSummaryPlaylist'

const mapStateToProps = (state: IRootState) => ({
  playlist: state.eventPlaylist.playlist,
  suggestion: state.suggestion.acceptedSuggestions,
  genre: state.eventView.event.genre,
  eventImg: state.eventView.event.imageUrl,
  event: state.eventView.event
})

const mapDispatchToProps = {
  toggleDynamicVoting,
  toggleAutoAcceptSuggestions,
  toggleSuggestingPlaylists
}

const EventSummaryPlaylistContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventSummaryPlaylist)

export default EventSummaryPlaylistContainer