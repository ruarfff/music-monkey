import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { bindActionCreators, Dispatch } from 'redux'
import {
  closeCreatePlaylist,
  closeExistingPlaylist,
  createEventPlaylist,
  editEventClose,
  editEventFailure,
  editEventRequest,
  editEventSuccess,
  eventContentUpdated,
  eventImageUploaded,
  eventImageUploadError,
  eventSavingReset,
  locationChanged,
  locationSelected,
  selectCreatePlaylist,
  selectExistingPlaylist
} from '../event/eventActions'
import {
  deselectPlaylist,
  setEventPlaylist
} from '../eventPlaylist/eventPlaylistActions'
import {
  deleteEvent,
  getEventById,
  onEventDeleteClosed,
  onEventDeleteSelected
} from '../eventView/eventViewActions'
import { fetchPlaylists } from '../playlist/playlistActions'
import IRootState from '../rootState'
import EditEvent from './EditEvent'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  playlistInput: state.event.playlistInput,
  playlists: state.playlist.data,
  eventEdit: state.event.savingEvent,
  event: state.eventView.event,
  deleteSelected: state.eventView.deleteSelected,
  deleteSuccess: state.eventView.deleteSucceeded,
  deleteFailed: state.eventView.deleteFailed,
  editSuccess: state.eventView.editSuccess,
  editFailure: state.eventView.editFailure,
  isCreatingPlaylist: state.playlist.isCreating,
  searchResult: state.playlist.searchResult,
  selectedPlaylist: state.eventPlaylist.playlist,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onDeleteAcknowledged: () => {
    dispatch(push('/'))
  },
  ...bindActionCreators(
    {
      deselectPlaylist,
      getEventById,
      deleteEvent,
      onEventDeleteSelected,
      onEventDeleteClosed,
      locationSelected,
      locationChanged,
      selectExistingPlaylist,
      closeExistingPlaylist,
      selectCreatePlaylist,
      closeCreatePlaylist,
      createEventPlaylist,
      eventImageUploaded,
      eventImageUploadError,
      eventContentUpdated,
      fetchPlaylists,
      editEventRequest,
      editEventClose,
      editEventFailure,
      editEventSuccess,
      eventSavingReset,
      setEventPlaylist
    },
    dispatch
  )
})

const EditEventContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditEvent)
)

export default EditEventContainer
