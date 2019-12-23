import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import IRootState from 'rootState'
import Requests from './Requests'

const mapStateToProps = (state: IRootState) => ({
  selectedEvent: state.eventView.event
})

const mapDispatchToProps = {}

const RequestsContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Requests)
)

export default RequestsContainer
