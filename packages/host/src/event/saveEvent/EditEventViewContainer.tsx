import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import RootState from 'rootState'
import EditEventView from './EditEventView'
import { getEventById } from 'event/eventActions'

const mapStateToProps = (state: RootState) => ({
  user: state.user.data,
  event: { ...state.event.event }
})

const mapDispatchToProps = { getEventById }

const EditEventViewContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditEventView)
)

export default EditEventViewContainer
