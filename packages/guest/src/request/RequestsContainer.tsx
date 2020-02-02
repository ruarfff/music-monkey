import { connect } from 'react-redux'
import { setEventId } from '../event/eventActions'
import { withRouter } from 'react-router'
import IRootState from '../rootState'
import Requests from './Requests'

const mapStateToProps = (state: IRootState) => ({
  event: state.event.event
})

const mapDispatchToProps = {
  setEventId
}

const RequestsContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Requests)
)

export default RequestsContainer
