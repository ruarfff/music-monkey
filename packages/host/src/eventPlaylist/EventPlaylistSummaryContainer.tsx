import { connect } from 'react-redux'
import {
  toggleAutoAcceptSuggestions,
  toggleDynamicVoting,
  toggleSuggestingPlaylists
} from '../eventView/eventViewActions'
import IRootState from '../rootState'
import { sortPlaylistByVotesDescending } from './eventPlaylistActions'
import EventPlaylistSummary from './EventPlaylistSummary'

const mapStateToProps = (state: IRootState) => ({
  event: state.eventView.event,
  playlist: state.eventPlaylist.playlist,
  votes: state.vote.votes
})

const mapDispatchToProps = {
  toggleDynamicVoting,
  toggleAutoAcceptSuggestions,
  toggleSuggestingPlaylists,
  sortPlaylistByVotesDescending
}

const EventPlaylistSummaryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPlaylistSummary)

export default EventPlaylistSummaryContainer
