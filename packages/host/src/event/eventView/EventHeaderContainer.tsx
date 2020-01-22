import { connect } from 'react-redux'
import IRootState from '../../rootState'
import { deselectEvent } from '../eventActions'
import { EventHeader } from 'mm-shared'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  event: state.event.event,
  isHost: true
})

const mapDispatchToProps = {
  deselectEvent
}

const EventHeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventHeader)

export default EventHeaderContainer
