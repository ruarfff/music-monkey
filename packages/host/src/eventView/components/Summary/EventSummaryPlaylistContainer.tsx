import { connect } from 'react-redux'
import { sortPlaylistByVotesDescending } from '../../../eventPlaylist/eventPlaylistActions'
import { editPlaylist } from '../../../playlist/playlistActions'
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