import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import IRootState from 'rootState'
import Requests from './RequestView'

const mapStateToProps = (state: IRootState) => ({
  event: state.event.event
})

const mapDispatchToProps = {}

const RequestsContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Requests)
)

export default RequestsContainer
