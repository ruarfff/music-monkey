import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import IRootState from 'rootState'
import SaveEvent from './SaveEvent'
import { deleteEvent, getEventById } from 'event/eventView/eventViewActions'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  event: { ...state.eventView.event, playlist: state.eventPlaylist.playlist },
  loading: state.eventView.loading
})

const mapDispatchToProps = { deleteEvent, getEventById }

const SaveEventContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SaveEvent)
)

export default SaveEventContainer
