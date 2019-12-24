import { connect } from 'react-redux'
import IRootState from 'rootState'
import {
  sortPlaylistByVotesDescending,
  toggleAutoAcceptSuggestions,
  toggleDynamicVoting,
  toggleSuggestingPlaylists
} from 'event/eventActions'
import EventPlaylistSummary from './EventPlaylistSummary'

const mapStateToProps = (state: IRootState) => ({
  event: state.event.event,
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
