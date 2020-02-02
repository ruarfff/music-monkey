import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import IRootState from 'rootState'
import SaveEvent from './SaveEvent'
import { getEventById } from 'event/eventActions'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  event: { ...state.event.event }
})

const mapDispatchToProps = { getEventById }

const SaveEventContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SaveEvent)
)

export default SaveEventContainer
