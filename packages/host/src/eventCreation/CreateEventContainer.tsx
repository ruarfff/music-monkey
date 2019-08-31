import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  clearSavingEvent,
  editEventRequest,
  eventImageUploaded,
  eventImageUploadError,
  eventSavingReset,
  initializeCreateForm,
  locationChanged,
  locationSelected,
  saveEvent
} from '../event/eventActions'
import {
  deselectPlaylist,
  moveItemInEventPlaylist,
  sortPlaylistByVotesDescending
} from '../eventPlaylist/eventPlaylistActions'
import {
  acknowledgeEventInviteCopied,
  copyEventInvite,
  deleteEvent,
  getEventById
} from '../eventView/eventViewActions'
import {
  clearJustCreatedPlaylists,
  fetchPlaylists,
  getMoreUsersPlaylists,
  tryRemoveTrack
} from '../playlist/playlistActions'
import IRootState from '../rootState'
import { fetchEventVotes } from '../vote/voteActions'
import CreateEvent from './CreateEvent'

const mapStateToProps = (state: IRootState) => ({
  errors: state.event.errors,
  event: state.event.savingEvent,
  isCreatingPlaylist: state.playlist.isCreating,
  playlists: state.playlist.data,
  searchResult: state.playlist.searchResult,
  selectedPlaylist: state.eventPlaylist.playlist,
  user: state.user.data,
  votes: state.vote.votes
})

const mapDispatchToProps = (dispatch: any) => ({
  cancel: () => {
    dispatch(eventSavingReset())
    dispatch(push('/'))
  },
  ...bindActionCreators(
    {
      acknowledgeEventInviteCopied,
      clearJustCreatedPlaylists,
      clearSavingEvent,
      copyEventInvite,
      deleteEvent,
      deselectPlaylist,
      editEventRequest,
      eventImageUploadError,
      eventImageUploaded,
      eventSavingReset,
      fetchEventVotes,
      fetchPlaylists,
      getEventById,
      getMoreUsersPlaylists,
      initializeCreateForm,
      locationChanged,
      locationSelected,
      onPlaylistDragDrop: moveItemInEventPlaylist,
      saveEvent,
      sortPlaylistByVotesDescending,
      tryRemoveTrack
    },
    dispatch
  )
})

const CreateEventContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEvent)

export default CreateEventContainer
