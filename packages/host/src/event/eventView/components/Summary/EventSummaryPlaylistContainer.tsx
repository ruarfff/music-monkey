import { connect } from 'react-redux'
import IRootState from 'rootState'
import { sortPlaylistByVotesDescending } from 'event/eventPlaylist/eventPlaylistActions'
import { editPlaylist } from 'playlist/playlistActions'
import {
  toggleAutoAcceptSuggestions,
  toggleDynamicVoting,
  toggleSuggestingPlaylists
} from 'event/eventViewActions'
import EventSummaryPlaylist from './EventSummaryPlaylist'

const mapStateToProps = (state: IRootState) => ({
  playlist: state.eventPlaylist.playlist,
  suggestion: state.suggestion.acceptedSuggestions,
  genre: state.eventView.event.genre,
  eventImg: state.eventView.event.imageUrl,
  event: state.eventView.event,
  votes: state.vote.votes
})

const mapDispatchToProps = {
  toggleDynamicVoting,
  toggleAutoAcceptSuggestions,
  toggleSuggestingPlaylists,
  sortPlaylistByVotesDescending,
  editPlaylist
}

const EventSummaryPlaylistContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventSummaryPlaylist)

export default EventSummaryPlaylistContainer
