import { connect } from 'react-redux'
import IRootState from 'rootState'
import { sortPlaylistByVotesDescending } from 'event/eventPlaylist/eventPlaylistActions'
import { editPlaylist } from 'playlist/playlistActions'
import {
  toggleAutoAcceptSuggestions,
  toggleDynamicVoting,
  toggleSuggestingPlaylists
} from 'event/eventActions'
import EventSummaryPlaylist from './EventSummaryPlaylist'

const mapStateToProps = (state: IRootState) => ({
  playlist: state.eventPlaylist.playlist,
  suggestion: state.suggestion.acceptedSuggestions,
  genre: state.event.event.genre,
  eventImg: state.event.event.imageUrl,
  event: state.event.event,
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
