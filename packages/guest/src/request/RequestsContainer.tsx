import { connect } from 'react-redux'
import IRootState from 'rootState'
import { Requests } from 'mm-shared'

const mapStateToProps = (state: IRootState) => ({
  isHost: false,
  user: state.user.data,
  event: state.event.event,
  acceptedRequests: state.suggestion.acceptedRequests,
  pendingRequests: state.suggestion.pendingRequests,
  rejectedRequests: state.suggestion.rejectedRequests
})

const mapDispatchToProps = {}

const RequestsContainer = connect(mapStateToProps, mapDispatchToProps)(Requests)

export default RequestsContainer
