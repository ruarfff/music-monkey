import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import IRootState from 'rootState'
import SaveEvent from './SaveEvent'
import { deleteEvent } from 'event/eventView/eventViewActions'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data
})

const mapDispatchToProps = { deleteEvent }

const SaveEventContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SaveEvent)
)

export default SaveEventContainer
