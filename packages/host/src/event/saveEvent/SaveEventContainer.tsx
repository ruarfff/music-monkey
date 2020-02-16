import { connect } from 'react-redux'
import IRootState from 'rootState'
import { getEventById } from 'event/eventActions'
import SaveEvent from './SaveEvent'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  event: { ...state.event.event }
})

const mapDispatchToProps = { getEventById }

const SaveEventContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveEvent)

export default SaveEventContainer
