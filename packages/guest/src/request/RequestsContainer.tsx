import { connect } from 'react-redux'
import { setEventId } from 'event/eventActions'
import IRootState from 'rootState'
import RequestsView from './RequestView'

const mapStateToProps = (state: IRootState) => ({
  event: state.event.event
})

const mapDispatchToProps = {
  setEventId
}

const RequestsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestsView)

export default RequestsContainer
