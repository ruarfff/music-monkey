import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import IRootState from 'rootState'
import {
  clearSavingEvent,
  closeExistingPlaylist,
  createEventPlaylist,
  editEventRequest,
  eventContentUpdated,
  eventImageUploaded,
  eventImageUploadError,
  eventSavingReset,
  initializeCreateForm,
  locationChanged,
  locationSelected,
  playlistInputChange,
  saveEvent,
  selectCreatePlaylist,
  selectExistingPlaylist,
  setStep
} from 'event/eventActions'
import {
  deselectPlaylist,
  moveItemInEventPlaylist,
  setEventPlaylist,
  sortPlaylistByVotesDescending
} from 'event/eventPlaylist/eventPlaylistActions'
import {
  acknowledgeEventInviteCopied,
  copyEventInvite,
  deleteEvent,
  getEventById,
  toggleAutoAcceptSuggestions,
  toggleDynamicVoting,
  toggleSuggestingPlaylists
} from 'event/eventView/eventViewActions'
import { clearMessage } from 'event/shareEvent/shareActions'
import {
  clearJustCreatedPlaylists,
  fetchPlaylists,
  getMoreUsersPlaylists,
  tryRemoveTrack
} from 'playlist/playlistActions'
import { fetchEventVotes } from 'vote/voteActions'
import CreateEvent from './CreateEvent'

const mapStateToProps = (state: IRootState) => ({
  votes: state.vote.votes,
  user: state.user.data,
  event: state.event.savingEvent,
  message: state.event.shareEventMessage,
  errors: state.event.errors,
  playlists: state.playlist.data,
  selectedPlaylist: state.eventPlaylist.playlist,
  isCreatingPlaylist: state.playlist.isCreating,
  copiedToClipboard: state.eventView.copiedToClipboard,
  searchResult: state.playlist.searchResult,
  currentStep: state.event.createEventStep
})

const mapDispatchToProps = (dispatch: any) => ({
  cancel: () => {
    dispatch(eventSavingReset())
    dispatch(push('/'))
  },
  ...bindActionCreators(
    {
      tryRemoveTrack,
      onPlaylistDragDrop: moveItemInEventPlaylist,
      setEventPlaylist,
      deselectPlaylist,
      closeExistingPlaylist,
      createEventPlaylist,
      eventContentUpdated,
      eventImageUploadError,
      eventImageUploaded,
      initializeCreateForm,
      locationChanged,
      locationSelected,
      saveEvent,
      selectCreatePlaylist,
      selectExistingPlaylist,
      fetchPlaylists,
      eventSavingReset,
      copyEventInvite,
      acknowledgeEventInviteCopied,
      editEventRequest,
      clearMessage,
      setStep,
      toggleDynamicVoting,
      toggleSuggestingPlaylists,
      toggleAutoAcceptSuggestions,
      getEventById,
      deleteEvent,
      sortPlaylistByVotesDescending,
      fetchEventVotes,
      getMoreUsersPlaylists,
      clearSavingEvent,
      playlistInputChange,
      clearJustCreatedPlaylists
    },
    dispatch
  )
})

const CreateEventContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEvent)

export default CreateEventContainer
